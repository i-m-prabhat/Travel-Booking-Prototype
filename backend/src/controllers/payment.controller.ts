import { Response } from "express";
import { Payment } from "../models/Payment";
import { Booking } from "../models/Booking";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { RequestWithUser } from "../types/requestWithUser";

export const initiatePayment = asyncHandler(async (req: RequestWithUser, res: Response) =>
{
    const { bookingId, method } = req.body;
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new ApiError(404, "Booking not found");
    if (booking.status !== "pending")
        throw new ApiError(400, "Booking is not pending");

    const payment = await Payment.create({
        booking: booking._id,
        amount: booking.totalPrice,
        method,
        status: "pending",
    });

    return res
        .status(201)
        .json(new ApiResponse(201, payment, "Payment initiated"));
});

export const verifyPayment = asyncHandler(async (req: RequestWithUser, res: Response) =>
{
    const { paymentId, success, transactionId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) throw new ApiError(404, "Payment not found");

    payment.status = success ? "completed" : "failed";
    if (transactionId) payment.transactionId = transactionId;
    await payment.save();

    if (success)
    {
        await Booking.findByIdAndUpdate(payment.booking, { status: "confirmed" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, payment, "Payment verified successfully"));
});

export const getAllPayments = asyncHandler(async (req: RequestWithUser, res: Response) =>
{
    const payments = await Payment.find().populate("booking");

    return res
        .status(200)
        .json(new ApiResponse(200, payments, "All payments fetched successfully"));
});
