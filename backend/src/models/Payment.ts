import mongoose, { Schema, Document } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IPayment extends Document
{
    booking: mongoose.Types.ObjectId;
    amount: number;
    status: "pending" | "completed" | "failed";
    method: "card" | "upi" | "netbanking";
    transactionId?: string;
    createdAt: Date;
}

export interface PaymentModel<T extends Document> extends mongoose.Model<T>
{
    aggregatePaginate: (
        aggregation: mongoose.Aggregate<any>,
        options: any
    ) => Promise<any>;
}

const paymentSchema = new Schema<IPayment>(
    {
        booking: {
            type: Schema.Types.ObjectId,
            ref: "Booking",
            required: true
        },
        amount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        method: {
            type: String,
            enum: ["card", "upi", "netbanking"],
            required: true,
        },
        transactionId: { type: String },
    },
    { timestamps: true }
);


paymentSchema.plugin(aggregatePaginate);

export const Payment = mongoose.model<IPayment, PaymentModel<IPayment>>(
    "Payment",
    paymentSchema
);