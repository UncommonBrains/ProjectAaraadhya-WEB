import { useCallback, useEffect, useState } from 'react';
import { poojaService } from '../../services/poojaService';
import { useAuth } from '../../hooks/useAuth';
import { bookingService } from '../../services/bookingService';
import { Booking } from '../../models/entities/Booking';
import { templeService } from '../../services/templeService';
import { DocumentSnapshot } from 'firebase/firestore';
// import { StorageService } from '../../services/firebase/storage';
import { cartService } from '../../services/cartService';
// import { PaymentMethod } from '../../views/home/Checkout/types';
import { useCart } from '../../hooks/useCart';

export const useBookingViewModel = () => {
  const { firebaseUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { fetchCart } = useCart();

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
      setError('Failed to load more posts',);
    } finally {
      setLoadingMore(false);
    }
  };

  // const bookPooja = async (booking: Booking) => {
  //   if (!firebaseUser?.uid) {
  //     throw new Error('User not authenticated');
  //   }

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     let finalBooking = booking;

  //     if (booking.paymentDetails?.paymentMethod === PaymentMethod.RAZORPAY) {
  //       finalBooking = {
  //         ...booking,
  //         paymentDetails: {
  //           ...booking.paymentDetails,
  //           // screenshotUrl,
  //           screenshot: undefined, // Remove File object (can't save to Firestore)
  //         },
  //       };
  //     } else {
  //       throw new Error('Unsupported payment method');
  //     }

  //     // 2️⃣ Save to Firestore with proper data cleanup
  //     const cleanBooking = JSON.parse(JSON.stringify(finalBooking));
  //     await bookingService.create(cleanBooking);

  //     // 3️⃣ Clear cart after successful booking
  //     await cartService(firebaseUser.uid).deleteCollection();

  //     await fetchCart(firebaseUser.uid);

  //     return true;
  //   } catch (err) {
  //     console.error('Booking error details:', err);
  //     const errorMessage =
  //       err instanceof Error ? err.message : 'Failed to book pooja - unknown error';

  //     setError(errorMessage);
  //     throw err; // Rethrow to handle in component
  //   } finally {
  //     setLoading(false);
  //   }
  // };


// const bookPooja = async (booking: Booking) => {
//   if (!firebaseUser?.uid) {
//     throw new Error("User not authenticated");
//   }

//   setLoading(true);
//   setError(null);

//   try {
//     let finalBooking = booking;

//     // Only handle Razorpay for now
//     if (booking.paymentDetails.paymentMethod === PaymentMethod.RAZORPAY) {
//       const rp = booking.paymentDetails;

//       finalBooking = {
//         ...booking,
//         paymentDetails: {
//           ...rp,
//           screenshot: undefined, // Remove File object (can't save to Firestore)
//         },
//       };

//       // 1️⃣ Prepare payment order
//       const paymentOrder = {
//         amount: parseInt(booking.price, 10),
//         bookingId: booking.id,
//         createdAt: new Date().toISOString(),
//         currency: "INR",
//         events: [
//           {
//             ts: new Date().toISOString(),
//             type: "create",
//             orderId: rp.razorpay_order_id,
//           },
//         ],
//         razorpayResponse: {
//           amount: parseInt(booking.price, 10),
//           amount_due: 0,
//           amount_paid: parseInt(booking.price, 10),
//           attempts: 1,
//           created_at: Math.floor(Date.now() / 1000),
//           currency: "INR",
//           entity: "order",
//           id: rp.razorpay_order_id,
//         },
//         notes: {
//           device: "web",
//           templeId: booking.templeId,
//           receipt: booking.id,
//           status: "created",
//         },
//         status: "created",
//         updatedAt: new Date().toISOString(),
//         userId: `/users/${firebaseUser.uid}`,
//         userSnapshot: {
//           email: firebaseUser.email,
//           name: firebaseUser.displayName,
//           phone: firebaseUser.phoneNumber,
//         },
//       };

//       // 2️⃣ Save payment order
//       await fetch("https://us-central1-project-aaraadhya-v1.cloudfunctions.net/savePaymentOrder", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(paymentOrder),
//       });

//       // 3️⃣ Prepare payment log
//       const paymentLog = {
//         event: "payment.captured",
//         orderId: rp.razorpay_order_id,
//         payload: { receivedAt: new Date().toISOString() },
//       };

//       // 4️⃣ Save payment log
//       await fetch("https://us-central1-project-aaraadhya-v1.cloudfunctions.net/savePaymentLog", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(paymentLog),
//       });
//     } else {
//       throw new Error("Unsupported payment method");
//     }

//     // 5️⃣ Save booking
//     const cleanBooking = JSON.parse(JSON.stringify(finalBooking));
//     await bookingService.create(cleanBooking);

//     // 6️⃣ Clear cart
//     await cartService(firebaseUser.uid).deleteCollection();
//     await fetchCart(firebaseUser.uid);

//     return true;
//   } catch (err) {
//     console.error("Booking error details:", err);
//     const errorMessage =
//       err instanceof Error ? err.message : "Failed to book pooja - unknown error";
//     setError(errorMessage);
//     throw err;
//   } finally {
//     setLoading(false);
//   }
// };


// //grok
// const bookPooja = async (booking: Booking) => {
//   if (!firebaseUser?.uid) {
//     throw new Error("User not authenticated");
//   }

//   setLoading(true);
//   setError(null);

//   try {
//     let finalBooking = booking;

//     // Only handle Razorpay for now
//     if (booking.paymentDetails.paymentMethod === PaymentMethod.RAZORPAY) {
//       const rp = booking.paymentDetails;

//       finalBooking = {
//         ...booking,
//         paymentDetails: {
//           ...rp,
//           screenshot: undefined, // Remove File object (can't save to Firestore)
//         },
//       };

//       // 1️⃣ Prepare payment order
//       const amountRupees = parseInt(booking.price, 10);
//       const amountPaise = amountRupees * 100;
//       const paymentOrder = {
//         amount: amountRupees,
//         bookingId: booking.id,
//         createdAt: new Date().toISOString(),
//         currency: "INR",
//         events: [
//           {
//             ts: new Date().toISOString(),
//             type: "create",
//             orderId: rp.razorpay_order_id,
//           },
//         ],
//         razorpayResponse: {
//           amount: amountPaise,
//           amount_due: 0,
//           amount_paid: amountPaise,
//           attempts: 1,
//           created_at: Math.floor(Date.now() / 1000),
//           currency: "INR",
//           entity: "order",
//           id: rp.razorpay_order_id,
//         },
//         notes: {
//           device: "web",
//           templeId: booking.templeId,
//           receipt: booking.id,
//           status: "created",
//         },
//         status: "created",
//         updatedAt: new Date().toISOString(),
//         userId: `/users/${firebaseUser.uid}`,
//         userSnapshot: {
//           email: firebaseUser.email,
//           name: firebaseUser.displayName,
//           phone: firebaseUser.phoneNumber,
//         },
//       };

//       // 2️⃣ Save payment order
//       await fetch("https://us-central1-project-aaraadhya-v1.cloudfunctions.net/savePaymentOrder", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(paymentOrder),
//       });

//       // 3️⃣ Prepare payment log
//       const paymentLog = {
//         event: "payment.captured",
//         orderId: rp.razorpay_order_id,
//         payload: { receivedAt: new Date().toISOString() },
//       };

//       // 4️⃣ Save payment log
//       await fetch("https://us-central1-project-aaraadhya-v1.cloudfunctions.net/savePaymentLog", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(paymentLog),
//       });
//     } else {
//       throw new Error("Unsupported payment method");
//     }

//     // 5️⃣ Save booking
//     const cleanBooking = JSON.parse(JSON.stringify(finalBooking));
//     await bookingService.create(cleanBooking);

//     // 6️⃣ Clear cart
//     await cartService(firebaseUser.uid).deleteCollection();
//     await fetchCart(firebaseUser.uid);

//     return true;
//   } catch (err) {
//     console.error("Booking error details:", err);
//     const errorMessage =
//       err instanceof Error ? err.message : "Failed to book pooja - unknown error";
//     setError(errorMessage);
//     throw err;
//   } finally {
//     setLoading(false);
//   }
// };

//grok made relationship

const bookPooja = async (booking: Booking) => {
  if (!firebaseUser?.uid) {
    throw new Error("User not authenticated");
  }

  setLoading(true);
  setError(null);

  try {
    // 1️⃣ Save booking to Firestore
    const cleanBooking = JSON.parse(JSON.stringify(booking)); // Remove undefined fields
    await bookingService.create(cleanBooking);

    // 2️⃣ Clear cart
    await cartService(firebaseUser.uid).deleteCollection();
    await fetchCart(firebaseUser.uid);

    return true;
  } catch (err) {
    console.error("Booking error details:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Failed to book pooja - unknown error";
    setError(errorMessage);
    throw err;
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
