import { useCallback, useEffect, useState } from 'react';
import { poojaService } from '../../services/poojaService';
import { useAuth } from '../../hooks/useAuth';
import { bookingService } from '../../services/bookingService';
import { Booking } from '../../models/entities/Booking';
import { templeService } from '../../services/templeService';
import { DocumentSnapshot } from 'firebase/firestore';
// import { StorageService } from '../../services/firebase/storage';
import { cartService } from '../../services/cartService';
import { PaymentMethod } from '../../views/home/Checkout/types';

export const useBookingViewModel = () => {
  const { firebaseUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const PAGE_SIZE = 10;

  const loadBookings = useCallback(async (uid?: string) => {
    setLoading(true);
    setBookings([]);
    setLastVisible(null);
    setHasMore(true);
    try {
      const result = await bookingService.queryPaginated(
        PAGE_SIZE,
        null,
        [
          {
            field: 'userId',
            operator: '==',
            value: uid,
          },
        ],
        {
          field: 'createdAt',
          direction: 'desc',
        },
      );

      const bookings = await Promise.all(
        result.data.map(async (doc) => {
          const poojas = await Promise.all(
            doc.poojas.map(async (pooja) => {
              const poojaDetails = await poojaService.getById(pooja.poojaId);
              return { ...pooja, poojaDetails };
            }),
          );
          const templeDetails = await templeService.getById(doc.templeId);
          return { ...doc, poojas, templeDetails };
        }),
      );

      setBookings(bookings as Array<Booking>);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
      setError(null);
    } catch (err) {
      setError('Failed to fetch temple data');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreBookings = async (uid?: string) => {
    if (!hasMore || !lastVisible || loadingMore) return;

    try {
      setLoadingMore(true);

      const result = await bookingService.queryPaginated(PAGE_SIZE, lastVisible, [
        {
          field: 'userId',
          operator: '==',
          value: uid,
        },
      ]);

      const bookings = await Promise.all(
        result.data.map(async (doc) => {
          const poojas = await Promise.all(
            doc.poojas.map(async (pooja) => {
              const poojaDetails = await poojaService.getById(pooja.poojaId);
              return { ...pooja, poojaDetails };
            }),
          );
          const templeDetails = await templeService.getById(doc.templeId);
          return { ...doc, poojas, templeDetails };
        }),
      );

      setBookings((prevBookings) => [...prevBookings, ...(bookings as Array<Booking>)]);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
    } catch (err) {
      setError('Failed to load more posts');
    } finally {
      setLoadingMore(false);
    }
  };

  // const bookPooja = async (booking: Booking) => {
  //   if (!firebaseUser?.uid || !booking.paymentDetails?.screenshot) return;
  //   setLoading(true);
  //   setError(null);

  //   const storageService = new StorageService(`/booking/${booking.templeId}/${booking.userId}`);

  //   try {
  //     const screenshotUrl = await storageService.uploadFile(
  //       storageService.generateUniqueFilename(booking.paymentDetails.screenshot.name),
  //       booking.paymentDetails.screenshot,
  //     );
  //     delete booking.paymentDetails.screenshot;
  //     await bookingService.create({
  //       ...booking,
  //       paymentDetails: {
  //         ...booking.paymentDetails,
  //         screenshotUrl: screenshotUrl,
  //       },
  //     });
  //     return await cartService(firebaseUser.uid).deleteCollection();
  //   } catch (err) {
  //     setError('Failed to book pooja');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const bookPooja = async (booking: Booking) => {
    if (!firebaseUser?.uid) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      let finalBooking = booking;

      // 1️⃣ Handle different payment methods appropriately
      if (booking.paymentDetails?.paymentMethod === PaymentMethod.RAZORPAY) {
        // // MANUAL PAYMENT: Process screenshot upload
        // const storageService = new StorageService(`/booking/${booking.templeId}/${booking.userId}`);

        // const screenshotUrl = await storageService.uploadFile(
        //   storageService.generateUniqueFilename(booking.paymentDetails.screenshot.name),
        //   booking.paymentDetails.screenshot,
        // );

        finalBooking = {
          ...booking,
          paymentDetails: {
            ...booking.paymentDetails,
            // screenshotUrl,
            screenshot: undefined, // Remove File object (can't save to Firestore)
          },
        };
      }
      //  else if (
      //   booking.paymentDetails?.paymentMethod === 'Razorpay' ||
      //   booking.paymentDetails?.paymentMethod === 'Cashfree'
      // ) {
      //   // GATEWAY PAYMENT: Just clean up any potential File objects
      //   finalBooking = {
      //     ...booking,
      //     paymentDetails: {
      //       ...booking.paymentDetails,
      //       // Ensure no File objects are passed to Firestore
      //       screenshot: undefined,
      //     },
      //   };
      else {
        throw new Error('Unsupported payment method');
      }

      // 2️⃣ Save to Firestore with proper data cleanup
      const cleanBooking = JSON.parse(JSON.stringify(finalBooking));
      await bookingService.create(cleanBooking);

      // 3️⃣ Clear cart after successful booking
      await cartService(firebaseUser.uid).deleteCollection();

      return true;
    } catch (err) {
      console.error('Booking error details:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to book pooja - unknown error';

      setError(errorMessage);
      throw err; // Rethrow to handle in component
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firebaseUser?.uid) {
      loadBookings(firebaseUser.uid);
    }
  }, [loadBookings, firebaseUser]);

  return {
    bookings,
    loading,
    loadingMore,
    hasMore,
    error,
    loadBookings,
    loadMoreBookings,
    bookPooja,
  };
};
