import * as dotenv from "dotenv";
import * as path from "path";
import * as admin from "firebase-admin";

// Load environment variables from .env file
// The .env file is located in the functions directory, but the compiled code is in functions/lib
dotenv.config({ path: path.resolve(__dirname, "../.env") });

admin.initializeApp();

export { createRazorpayOrder, verifyPayment, razorpayWebhook } from "./razorpay";

 