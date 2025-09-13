import mongoose, { Schema, Document } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface ITrip extends Document
{
    from: string;
    to: string;
    date: Date;
    departureTime: string;
    arrivalTime: string;
    price: number;
    totalSeats: number;
    availableSeats: number;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
}


export interface TripModel<T extends Document> extends mongoose.Model<T>
{
    aggregatePaginate: (
        aggregation: mongoose.Aggregate<any>,
        options: any
    ) => Promise<any>;
}

const tripSchema = new Schema<ITrip>(
    {
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        departureTime: {
            type: String,
            required: true
        },
        arrivalTime: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        totalSeats: {
            type: Number,
            required: true
        },
        availableSeats: {
            type: Number,
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true }
);

tripSchema.plugin(aggregatePaginate);

export const Trip = mongoose.model<ITrip, TripModel<ITrip>>("Trip", tripSchema);
