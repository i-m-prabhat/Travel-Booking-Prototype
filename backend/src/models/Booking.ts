import mongoose, { Schema, Document } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IBooking extends Document
{
    user: mongoose.Types.ObjectId;
    trip: mongoose.Types.ObjectId;
    seats: number;
    status: "pending" | "confirmed" | "cancelled";
    totalPrice: number;
    createdAt: Date;
}

export interface BookingModel<T extends Document> extends mongoose.Model<T>
{
    aggregatePaginate: (
        aggregation: mongoose.Aggregate<any>,
        options: any
    ) => Promise<any>;
}

const bookingSchema = new Schema<IBooking>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        trip: {
            type: Schema.Types.ObjectId,
            ref: "Trip",
            required: true
        },
        seats: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
        totalPrice: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
);

bookingSchema.plugin(aggregatePaginate);

export const Booking = mongoose.model<IBooking, BookingModel<IBooking>>(
    "Booking",
    bookingSchema
);