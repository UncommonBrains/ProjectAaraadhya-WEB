import { onCall } from "firebase-functions/v2/https";
import * as crypto from "crypto";
import { updateOrderStatus } from "./firestore.store";

export const verifyRazorpaySignature = onCall(
  { region: "asia-south1" },
  async (request) => {
    const { orderId, paymentId, signature } = request.data as {
      orderId: string;
      paymentId: string;
      signature: string;
    };

    if (!orderId || !paymentId || !signature) {
      throw new Error("Missing orderId/paymentId/signature");
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET!;
    const body = `${orderId}|${paymentId}`;

    // ✅ Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === signature) {
      // ✅ Success
      await updateOrderStatus(orderId, "paid", {
        paymentId,
        signature,
        ts: new Date().toISOString(),
      });
      return { ok: true };
    } else {
      // ❌ Failed
      await updateOrderStatus(orderId, "failed", {
        reason: "signature_mismatch",
        paymentId,
        signature,
        ts: new Date().toISOString(),
      });
      throw new Error("Invalid signature");
    }
  }
);
