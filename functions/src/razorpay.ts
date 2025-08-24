import * as admin from "firebase-admin";
import Razorpay from "razorpay";
import crypto from "crypto";

import { onCall, HttpsError, onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";

import { PaymentOrder } from "./types/paymentOrders";

// ---- init
if (admin.apps.length === 0) admin.initializeApp();
const db = admin.firestore();

// ---- secrets (set them first: see step 0 below)
const RAZORPAY_KEY_ID     = defineSecret("RAZORPAY_KEY_ID");
const RAZORPAY_KEY_SECRET = defineSecret("RAZORPAY_KEY_SECRET");
const RAZORPAY_WEBHOOK_SECRET = defineSecret("RAZORPAY_WEBHOOK_SECRET");

// Helper to build client
function buildClient(keyId: string, keySecret: string) {
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// ---- 1) Create order (callable from client)
export const createRazorpayOrder = onCall(
  { region: "asia-south1", secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET] },
  async (request) => {
    const { amount, bookingId, user, device } = request.data as {
      amount: number;
      bookingId: string;
      user: { id: string; name: string; email: string; phone: string };
      device?: string;
    };

    if (!amount || !bookingId || !user?.id) {
      throw new HttpsError(
        "invalid-argument",
        "amount, bookingId and user.id are required"
      );
    }

    const razorpay = buildClient(RAZORPAY_KEY_ID.value(), RAZORPAY_KEY_SECRET.value());
    const paise = Math.round(amount * 100);

    const order = await razorpay.orders.create({
      amount: paise,
      currency: "INR",
      receipt: bookingId,
    });

    const paymentOrder: PaymentOrder = {
      amount,
      amountPaise: String(paise),
      bookingId,
      createdAt: new Date(),
      updatedAt: new Date(),
      currency: "INR",
      status: "created",
      orderId: bookingId,               // your internal reference (optional)
      razorpayOrderId: order.id,        // <-- use this as doc id
      userId: user.id,
      userSnapshot: { name: user.name, email: user.email, phone: user.phone },
      meta: {
        device: device ?? "web",
        ip: request.rawRequest?.ip,     // available in v2 onCall
      },
    };

    await db.collection("payment_orders").doc(order.id).set(paymentOrder);

    // return public info to client; DO NOT return secret
    return {
      orderId: order.id,
      amount: order.amount,   // paise
      currency: order.currency,
      key: RAZORPAY_KEY_ID.value(), // client needs only key_id
    };
  }
);

// ---- 2) Verify payment from client handler (extra safety beyond webhook)
export const verifyPayment = onCall(
  { region: "asia-south1", secrets: [RAZORPAY_KEY_SECRET] },
  async (request) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      request.data as {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new HttpsError("invalid-argument", "Required Razorpay fields missing");
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET.value())
      .update(body)
      .digest("hex");

    const ok = expected === razorpay_signature;

    await db.collection("payment_orders").doc(razorpay_order_id).update({
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: ok ? "completed" : "failed",
      failureReason: ok ? null : "signature_mismatch",
      updatedAt: new Date(),
    });

    return { ok };
  }
);

// ---- 3) Webhook (server-to-server) — production-grade confirmation
export const razorpayWebhook = onRequest(
  { region: "asia-south1", secrets: [RAZORPAY_WEBHOOK_SECRET] },
  async (req, res) => {
    try {
      const signature = req.get("x-razorpay-signature") || "";
      const payload = JSON.stringify(req.body);

      const expected = crypto
        .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET.value())
        .update(payload)
        .digest("hex");

      if (expected !== signature) {
        console.warn("Invalid webhook signature");
        res.status(400).send("Invalid signature");
        return;
      }

      // handle key events
      const ev = req.body?.event;
      if (ev === "payment.captured") {
        const p = req.body.payload.payment.entity;
        await db.collection("payment_orders").doc(p.order_id).update({
          razorpayPaymentId: p.id,
          status: "completed",
          updatedAt: new Date(),
          paymentMethod: p.method ?? null,
        });
      }
      res.status(200).send("OK");
      return;
    } catch (e) {
      console.error(e);
      res.status(500).send("ERR");
      return;
    }
  }
);
