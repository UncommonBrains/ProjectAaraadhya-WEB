import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import Razorpay from "razorpay";
import { CreateOrderInput, CreateOrderResponse, FirestorePaymentOrder } from "../types/payments";
import * as admin from "firebase-admin";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createRazorpayOrder = onCall<CreateOrderInput>(
  async (request): Promise<CreateOrderResponse> => {
    const data = request.data;

    if (!data?.amount || !data?.bookingId || !data?.user?.id) {
      throw new HttpsError("invalid-argument", "Missing required fields");
    }

    // Create Razorpay order
    const options = {
      amount: data.amount,
      currency: "INR",
      receipt: data.bookingId,
      notes: {
        userId: data.user.id,
        bookingId: data.bookingId,
      },
    };

    const order = await razorpay.orders.create(options);

    // Store in Firestore
    const db = admin.firestore();
    const orderDoc: FirestorePaymentOrder = {
      orderId: order.id,
      bookingId: data.bookingId,
      amount: Number(order.amount),
      currency: order.currency,
      status: order.status,
      userId: `/users/${data.user.id}`,
      userSnapshot: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
      },
      razorpayResponse: order,
      events: [{ type: "create", ts: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection("payment_orders").doc(order.id).set(orderDoc);

    // ✅ Return correct response type
    return {
      orderId: order.id,
      amount: Number(order.amount),
      currency: order.currency,
    };
  }
);
