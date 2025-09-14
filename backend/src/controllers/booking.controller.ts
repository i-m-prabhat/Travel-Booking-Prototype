import { Response } from "express";
import { Booking } from "../models/Booking";
import { Trip } from "../models/Trip";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { RequestWithUser } from "../types/requestWithUser";
import mongoose from "mongoose";


export const createBooking = asyncHandler(async (req: RequestWithUser, res: Response) =>
{
    const { trip, seats } = req.body;
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const tripData = await Trip.findById(trip);
    if (!tripData) throw new ApiError(404, "Trip not found");
    if (tripData.availableSeats < seats)
        throw new ApiError(400, "Not enough seats available");

    const totalPrice = tripData.price * seats;

    const booking = await Booking.create({
        user: req.user.id,
        trip,
        seats,
        totalPrice,
        status: "pending",
    });

    tripData.availableSeats -= seats;
    await tripData.save();

    return res
        .status(201)
        .json(new ApiResponse(201, booking, "Booking created successfully"));
});


export const cancelBooking = asyncHandler(async (req: RequestWithUser, res: Response) =>
{
    const { id } = req.params;
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const booking = await Booking.findOne({ _id: id, user: req.user.id });
    if (!booking) throw new ApiError(404, "Booking not found");

    if (booking.status === "cancelled")
        throw new ApiError(400, "Booking already cancelled");

    booking.status = "cancelled";
    await booking.save();


    const trip = await Trip.findById(booking.trip);
    if (trip)
    {
        trip.availableSeats += booking.seats;
        await trip.save();
    }

    return res
        .status(200)
        .json(new ApiResponse(200, booking, "Booking cancelled successfully"));
});


export const getMyBookings = asyncHandler(async (req: RequestWithUser, res: Response) =>
{
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const bookings = await Booking.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
        { $sort: { createdAt: -1 } }, {
            '$lookup': {
                'from': 'trips',
                'localField': 'trip',
                'foreignField': '_id',
                'as': 'tripDetails'
            }
        }, {
            '$unwind': '$tripDetails'
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'userDetails'
            }
        }, {
            '$unwind': '$userDetails'
        }, {
            '$project': {
                '_id': 1,
                'seats': 1,
                'status': 1,
                'totalPrice': 1,
                'createdAt': 1,
                'updatedAt': 1,
                'tripDetails._id': 1,
                'tripDetails.from': 1,
                'tripDetails.to': 1,
                'tripDetails.date': 1,
                'tripDetails.departureTime': 1,
                'tripDetails.arrivalTime': 1,
                'tripDetails.price': 1,
                'tripDetails.totalSeats': 1,
                'tripDetails.availableSeats': 1,
                'userDetails._id': 1,
                'userDetails.name': 1,
                'userDetails.email': 1,
                'userDetails.role': 1
            }
        }]);

    return res
        .status(200)
        .json(new ApiResponse(200, bookings, "User bookings fetched successfully"));
});


export const getAllBookings = asyncHandler(async (req: RequestWithUser, res: Response) =>
{
    const { page = "1", limit = "10", status } = req.query;

    const match: any = {};
    if (status) match.status = status;

    const aggregate = Booking.aggregate([{ $match: match }, { $sort: { createdAt: -1 } }, {
        '$lookup': {
            'from': 'trips',
            'localField': 'trip',
            'foreignField': '_id',
            'as': 'tripDetails'
        }
    }, {
        '$unwind': '$tripDetails'
    }, {
        '$lookup': {
            'from': 'users',
            'localField': 'user',
            'foreignField': '_id',
            'as': 'userDetails'
        }
    }, {
        '$unwind': '$userDetails'
    }, {
        '$project': {
            '_id': 1,
            'seats': 1,
            'status': 1,
            'totalPrice': 1,
            'createdAt': 1,
            'updatedAt': 1,
            'tripDetails._id': 1,
            'tripDetails.from': 1,
            'tripDetails.to': 1,
            'tripDetails.date': 1,
            'tripDetails.departureTime': 1,
            'tripDetails.arrivalTime': 1,
            'tripDetails.price': 1,
            'tripDetails.totalSeats': 1,
            'tripDetails.availableSeats': 1,
            'userDetails._id': 1,
            'userDetails.name': 1,
            'userDetails.email': 1,
            'userDetails.role': 1
        }
    }]);

    const options = {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        customLabels: { docs: "bookings", totalDocs: "totalBookings" }
    };

    const result = await (Booking as any).aggregatePaginate(aggregate, options);

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Bookings fetched successfully"));
});



export const getBookingById = asyncHandler(async (req: RequestWithUser, res: Response) =>
{
    const { id } = req.params;
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const booking = await Booking.aggregate([
        {
            '$match': {
                '_id': new mongoose.Types.ObjectId(id)
            }
        }, {
            '$lookup': {
                'from': 'trips',
                'localField': 'trip',
                'foreignField': '_id',
                'as': 'tripDetails'
            }
        }, {
            '$unwind': '$tripDetails'
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'userDetails'
            }
        }, {
            '$unwind': '$userDetails'
        }, {
            '$project': {
                '_id': 1,
                'seats': 1,
                'status': 1,
                'totalPrice': 1,
                'createdAt': 1,
                'updatedAt': 1,
                'tripDetails._id': 1,
                'tripDetails.from': 1,
                'tripDetails.to': 1,
                'tripDetails.date': 1,
                'tripDetails.departureTime': 1,
                'tripDetails.arrivalTime': 1,
                'tripDetails.price': 1,
                'tripDetails.totalSeats': 1,
                'tripDetails.availableSeats': 1,
                'userDetails._id': 1,
                'userDetails.name': 1,
                'userDetails.email': 1,
                'userDetails.role': 1
            }
        }
    ]);
    if (!booking.length) throw new ApiError(404, "Booking not found");
    return res
        .status(200)
        .json(new ApiResponse(200, booking[0], "Booking fetched successfully"));
});