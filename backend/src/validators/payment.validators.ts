import { body, query } from "express-validator";

export const initiatePaymentValidator = [
    body("bookingId")
        .notEmpty()
        .withMessage("Booking ID is required")
        .isMongoId()
        .withMessage("Invalid booking ID"),

    body("method")
        .notEmpty()
        .withMessage("Payment method is required")
        .isIn(["card", "upi", "netbanking"])
        .withMessage("Payment method must be one of: card, upi, netbanking"),
];

export const verifyPaymentValidator = [
    body("paymentId")
        .notEmpty()
        .withMessage("Payment ID is required")
        .isMongoId()
        .withMessage("Invalid payment ID"),

    body("success")
        .notEmpty()
        .withMessage("Success flag is required")
        .isBoolean()
        .withMessage("Success must be boolean")
        .toBoolean(),

    body("transactionId")
        .optional()
        .isString()
        .withMessage("Transaction ID must be a string"),
];

export const paymentsQueryValidator = [
    query("page").optional().isInt({ min: 1 }).withMessage("page must be an integer >= 1").toInt(),
    query("limit").optional().isInt({ min: 1 }).withMessage("limit must be an integer >= 1").toInt(),
    query("status")
        .optional()
        .isIn(["pending", "completed", "failed"])
        .withMessage("status must be one of: pending, completed, failed"),
];
