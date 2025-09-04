// src/services/payments.ts
import type { CreateOrderInput, CreateOrderResponse } from "../types/payments";


export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
  const res = await fetch("/api/payments/createOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to create order");
  }

  return res.json() as Promise<CreateOrderResponse>;
}
