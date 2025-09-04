"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpayWebhook = exports.verifyPayment = exports.createRazorpayOrder = void 0;
const admin = __importStar(require("firebase-admin"));
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
// ---- init
if (admin.apps.length === 0)
    admin.initializeApp();
const db = admin.firestore();
// ---- secrets (set them first: see step 0 below)
const RAZORPAY_KEY_ID = (0, params_1.defineSecret)("RAZORPAY_KEY_ID");
const RAZORPAY_KEY_SECRET = (0, params_1.defineSecret)("RAZORPAY_KEY_SECRET");
const RAZORPAY_WEBHOOK_SECRET = (0, params_1.defineSecret)("RAZORPAY_WEBHOOK_SECRET");
// Helper to build client
function buildClient(keyId, keySecret) {
    return new razorpay_1.default({ key_id: keyId, key_secret: keySecret });
}
// ---- 1) Create order (callable from client)
exports.createRazorpayOrder = (0, https_1.onCall)({ region: "asia-south1", secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET] }, async (request) => {
    var _a;
    const { amount, bookingId, user, device } = request.data;
    if (!amount || !bookingId || !(user === null || user === void 0 ? void 0 : user.id)) {
        throw new https_1.HttpsError("invalid-argument", "amount, bookingId and user.id are required");
    }
    const razorpay = buildClient(RAZORPAY_KEY_ID.value(), RAZORPAY_KEY_SECRET.value());
    const paise = Math.round(amount * 100);
    const order = await razorpay.orders.create({
        amount: paise,
        currency: "INR",
        receipt: bookingId,
    });
    const paymentOrder = {
        amount,
        amountPaise: String(paise),
        bookingId,
        createdAt: new Date(),
        updatedAt: new Date(),
        currency: "INR",
        status: "created",
        orderId: bookingId, // your internal reference (optional)
        razorpayOrderId: order.id, // <-- use this as doc id
        userId: user.id,
        userSnapshot: { name: user.name, email: user.email, phone: user.phone },
        meta: {
            device: device !== null && device !== void 0 ? device : "web",
            ip: (_a = request.rawRequest) === null || _a === void 0 ? void 0 : _a.ip, // available in v2 onCall
        },
    };
    await db.collection("payment_orders").doc(order.id).set(paymentOrder);
    // return public info to client; DO NOT return secret
    return {
        orderId: order.id,
        amount: order.amount, // paise
        currency: order.currency,
        key: RAZORPAY_KEY_ID.value(), // client needs only key_id
    };
});
// ---- 2) Verify payment from client handler (extra safety beyond webhook)
exports.verifyPayment = (0, https_1.onCall)({ region: "asia-south1", secrets: [RAZORPAY_KEY_SECRET] }, async (request) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = request.data;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        throw new https_1.HttpsError("invalid-argument", "Required Razorpay fields missing");
    }
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto_1.default
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
});
// ---- 3) Webhook (server-to-server) — production-grade confirmation
exports.razorpayWebhook = (0, https_1.onRequest)({ region: "asia-south1", secrets: [RAZORPAY_WEBHOOK_SECRET] }, async (req, res) => {
    var _a, _b;
    try {
        const signature = req.get("x-razorpay-signature") || "";
        const payload = JSON.stringify(req.body);
        const expected = crypto_1.default
            .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET.value())
            .update(payload)
            .digest("hex");
        if (expected !== signature) {
            console.warn("Invalid webhook signature");
            res.status(400).send("Invalid signature");
            return;
        }
        // handle key events
        const ev = (_a = req.body) === null || _a === void 0 ? void 0 : _a.event;
        if (ev === "payment.captured") {
            const p = req.body.payload.payment.entity;
            await db.collection("payment_orders").doc(p.order_id).update({
                razorpayPaymentId: p.id,
                status: "completed",
                updatedAt: new Date(),
                paymentMethod: (_b = p.method) !== null && _b !== void 0 ? _b : null,
            });
        }
        res.status(200).send("OK");
        return;
    }
    catch (e) {
        console.error(e);
        res.status(500).send("ERR");
        return;
    }
});
//# sourceMappingURL=razorpay.js.map