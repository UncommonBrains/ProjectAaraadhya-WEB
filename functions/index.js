// // import * as functions from "firebase-functions";
// // import * as admin from "firebase-admin";
// // import Razorpay = require("razorpay");
// // import * as crypto from "crypto";
// // import * as cors from "cors";

// // // Initialize Firebase Admin SDK
// // admin.initializeApp();

// // // Initialize CORS middleware
// // const corsHandler = cors({ origin: true });

// // // Get Razorpay credentials from Firebase environment configuration
// // const razorpayKeyId = functions.config().razorpay.key_id;
// // const razorpayKeySecret = functions.config().razorpay.key_secret;

// // // Check if Razorpay keys are configured
// // if (!razorpayKeyId || !razorpayKeySecret) {
// //   console.error("Razorpay API keys are not configured. Please set them in Firebase environment variables.");
// // }

// // // Initialize Razorpay instance
// // const razorpay = new Razorpay({
// //   key_id: razorpayKeyId,
// //   key_secret: razorpayKeySecret,
// // });

// // /**
// //  * Creates a Razorpay order.
// //  * Expects a POST request with { amount, currency } in the body.
// //  * Amount should be in the smallest currency unit (e.g., paise for INR).
// //  */
// // export const createOrder = functions.https.onRequest((request, response) => {
// //   corsHandler(request, response, async () => {
// //     if (request.method !== "POST") {
// //       response.status(405).send("Method Not Allowed");
// //       return;
// //     }

// //     try {
// //       const { amount, currency } = request.body;

// //       if (!amount || !currency) {
// //         response.status(400).send("Missing required fields: amount, currency");
// //         return;
// //       }

// //       const options = {
// //         amount: Number(amount), // Amount in the smallest currency unit
// //         currency: currency,
// //         receipt: `receipt_order_${new Date().getTime()}`,
// //       };

// //       const order = await razorpay.orders.create(options);
// //       console.log("Order created:", order);
// //       response.status(200).json(order);
// //     } catch (error) {
// //       console.error("Error creating Razorpay order:", error);
// //       response.status(500).send("Internal Server Error");
// //     }
// //   });
// // });

// // /**
// //  * Verifies a Razorpay payment.
// //  * Expects a POST request with { order_id, razorpay_payment_id, razorpay_signature } in the body.
// //  */
// // export const verifyPayment = functions.https.onRequest((request, response) => {
// //   corsHandler(request, response, async () => {
// //     if (request.method !== "POST") {
// //       response.status(405).send("Method Not Allowed");
// //       return;
// //     }

// //     try {
// //       const { order_id, razorpay_payment_id, razorpay_signature } = request.body;

// //       if (!order_id || !razorpay_payment_id || !razorpay_signature) {
// //         response.status(400).send("Missing required payment verification fields");
// //         return;
// //       }

// //       const body = `${order_id}|${razorpay_payment_id}`;

// //       const expectedSignature = crypto
// //         .createHmac("sha256", razorpayKeySecret)
// //         .update(body.toString())
// //         .digest("hex");

// //       if (expectedSignature === razorpay_signature) {
// //         console.log("Payment verification successful for payment ID:", razorpay_payment_id);
        
// //         // (IMPORTANT) Here is where you would update your database
// //         // For example, update a Firestore document to mark the order as 'paid'.
// //         // await admin.firestore().collection('orders').doc(order_id).update({
// //         //   paymentStatus: 'paid',
// //         //   paymentId: razorpay_payment_id,
// //         // });

// //         response.status(200).json({ status: "success", paymentId: razorpay_payment_id });
// //       } else {
// //         console.warn("Payment verification failed for payment ID:", razorpay_payment_id);
// //         response.status(400).json({ status: "failure" });
// //       }
// //     } catch (error) {
// //       console.error("Error verifying payment:", error);
// //       response.status(500).send("Internal Server Error");
// //     }
// //   });
// // });



// // import * as functions from "firebase-functions";
// // import * as Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: "rzp_test_R79F1bWUTRYNZh",
//   key_secret: "pA621F7Fg5tg2IqbVqKeZtwA",
// });

// export const createOrder = functions.https.onRequest(async (req, res) => {
//   const options = {
//     amount: 5000, // amount in paise
//     currency: "INR",
//     receipt: "receipt#1",
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });





const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
admin.initializeApp();
const db = admin.firestore();

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Reusable CORS middleware
const corsHandler = cors({ origin: true });


exports.createRazorpayOrder = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
      }

      const { uid } = req.body;
      if (!uid) {
        return res.status(400).json({ error: "User ID required" });
      }

      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ error: "Payment service not configured" });
      }

      // ✅ Get cart items
      const cartItemsSnapshot = await db
        .collection("cart")
        .doc(uid)
        .collection("items")
        .get();

      if (cartItemsSnapshot.empty) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      let totalPaise = 0;
      const items = [];

      cartItemsSnapshot.forEach((doc) => {
        const item = doc.data();

        // 🔥 Ensure price is numeric
        const priceInr = Number(item.price);
        if (isNaN(priceInr) || priceInr <= 0) return;

        // Convert INR → paise
        const pricePaise = Math.round(priceInr * 100);

        // Add to total
        totalPaise += pricePaise;

        items.push({
          poojaId: item.poojaId || null,
          templeId: item.templeId || null,
          name: item.members?.name || null,
          poojaDate: item.members?.poojaDate || null,
          priceInr: priceInr,
        });
      });

      if (totalPaise <= 0) {
        return res
          .status(400)
          .json({ error: "Total amount must be greater than 0" });
      }

      const bookingId = `AR_${Date.now()}`;

      // ✅ Create order in Razorpay
      const razorpayOrder = await razorpay.orders.create({
        amount: totalPaise, // paise
        currency: "INR",
        receipt: bookingId,
        notes: { bookingId, userId: uid },
      });

      // ✅ Save order in Firestore
      await db.collection("payment_orders").doc(razorpayOrder.id).set({
        amount: totalPaise,
        amountInr: (totalPaise / 100).toFixed(2), // 💡 store INR too for readability
        userId: uid,
        bookingId: bookingId,
        orderId: razorpayOrder.id,
        status: "created",
        razorpayResponse: razorpayOrder,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).json({
        success: true,
        order: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount, // paise
          amountInr: (razorpayOrder.amount / 100).toFixed(2), // INR
          currency: razorpayOrder.currency,
          bookingId,
        },
        message: "Order created successfully",
        cartItems: items,
      });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return res.status(500).json({
        error: "Failed to create Razorpay order",
        details: error.message,
      });
    }
  });
});


/**
 * 🔹 Verify Razorpay Payment
 */
exports.verifyRazorpayPayment = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status,
        reason,
      } = req.body;

      if (!razorpay_order_id) {
        return res.status(400).json({ error: "Missing order ID" });
      }

      const bookingRef = db.collection("bookings").doc(razorpay_order_id);

      // ❌ Cancelled
      if (status === "cancelled") {
        await bookingRef.set(
          {
            paymentStatus: "CANCELLED",
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        return res.json({ success: true, message: "Payment cancelled" });
      }

      // ❌ Failed
      if (status === "failed") {
        await bookingRef.set(
          {
            paymentStatus: "FAILED",
            failureReason: reason || "Unknown",
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        return res.json({ success: true, message: "Payment failed recorded" });
      }

      // ✅ Success → Verify Signature
      if (!razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: "Missing payment details" });
      }

      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid signature" });
      }

      // ✅ Save confirmed payment
      await bookingRef.set(
        {
          paymentStatus: "CONFIRMED",
          paymentDetails: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          },
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return res.json({
        success: true,
        message: "Payment verified and confirmed",
      });
    } catch (error) {
      console.error("Error verifying Razorpay payment:", error);
      return res.status(500).json({
        error: "Failed to verify Razorpay payment",
        details: error.message,
      });
    }
  });
});
