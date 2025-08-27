import * as admin from "firebase-admin";
import { PaymentOrder } from "../types/payments";

const db = admin.firestore();

export async function saveOrder(order: PaymentOrder) {
  await db.collection("payment_orders").doc(order.orderId).set(order);
}

export async function updateOrderStatus(
  orderId: string,
  status: "paid" | "failed",
  extra: any
) {
  await db.collection("payment_orders").doc(orderId).update({
    status,
    updatedAt: new Date().toISOString(),
    events: admin.firestore.FieldValue.arrayUnion({
      type: status,
      ...extra,
    }),
  });
}
