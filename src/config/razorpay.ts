// src/config/razorpay.ts
export const RAZORPAY_KEY_ID = (import.meta.env.VITE_RAZORPAY_KEY_ID ?? "") as string;

export const CHECKOUT_BRAND = {
  name: "Aaraadhya",      // swap for your brand
  image: "/android-chrome-192x192.png", // swap for your brand logo (192x192 or 128x128)
  themeColor: "#0b6efd",
};
