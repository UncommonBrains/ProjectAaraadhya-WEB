import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Razorpay = require("razorpay");
import * as crypto from "crypto";
import * as cors from "cors";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize CORS middleware
const corsHandler = cors({ origin: true });

// Get Razorpay credentials from Firebase environment configuration
const razorpayKeyId = functions.config().razorpay.key_id;
const razorpayKeySecret = functions.config().razorpay.key_secret;

// Check if Razorpay keys are configured
if (!razorpayKeyId || !razorpayKeySecret) {
  console.error("Razorpay API keys are not configured. Please set them in Firebase environment variables.");
}

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

/**
 * Creates a Razorpay order.
 * Expects a POST request with { amount, currency } in the body.
 * Amount should be in the smallest currency unit (e.g., paise for INR).
 */
export const createOrder = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const { amount, currency } = request.body;

      if (!amount || !currency) {
        response.status(400).send("Missing required fields: amount, currency");
        return;
      }

      const options = {
        amount: Number(amount), // Amount in the smallest currency unit
        currency: currency,
        receipt: `receipt_order_${new Date().getTime()}`,
      };

      const order = await razorpay.orders.create(options);
      console.log("Order created:", order);
      response.status(200).json(order);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      response.status(500).send("Internal Server Error");
    }
  });
});

/**
 * Verifies a Razorpay payment.
 * Expects a POST request with { order_id, razorpay_payment_id, razorpay_signature } in the body.
 */
export const verifyPayment = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const { order_id, razorpay_payment_id, razorpay_signature } = request.body;

      if (!order_id || !razorpay_payment_id || !razorpay_signature) {
        response.status(400).send("Missing required payment verification fields");
        return;
      }

      const body = `${order_id}|${razorpay_payment_id}`;

      const expectedSignature = crypto
        .createHmac("sha256", razorpayKeySecret)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        console.log("Payment verification successful for payment ID:", razorpay_payment_id);
        
        // (IMPORTANT) Here is where you would update your database
        // For example, update a Firestore document to mark the order as 'paid'.
        // await admin.firestore().collection('orders').doc(order_id).update({
        //   paymentStatus: 'paid',
        //   paymentId: razorpay_payment_id,
        // });

        response.status(200).json({ status: "success", paymentId: razorpay_payment_id });
      } else {
        console.warn("Payment verification failed for payment ID:", razorpay_payment_id);
        response.status(400).json({ status: "failure" });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      response.status(500).send("Internal Server Error");
    }
  });
});