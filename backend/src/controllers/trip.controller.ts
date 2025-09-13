import { Request, Response } from "express";
import { Trip } from "../models/Trip";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { RequestWithUser } from "types/requestWithUser";
import mongoose from "mongoose";

export const createTrip = asyncHandler(async (req: RequestWithUser, res: Response) =>
{
    const { from, to, date, departureTime, arrivalTime, price, totalSeats } = req.body;

    console.log(req.user?.id, "req.user");
    const trip = await Trip.create({
        from,
        to,
        date,
        departureTime,
        arrivalTime,
        price,
        totalSeats,
        availableSeats: totalSeats,
        createdBy: new mongoose.Types.ObjectId(req.user?.id),
    });

    return res
        .status(201)
        .json(new ApiResponse(201, trip, "Trip created successfully"));
});

export const updateTrip = asyncHandler(async (req: Request, res: Response) =>
{
    const { id } = req.params;
    const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    if (!updatedTrip) throw new ApiError(404, "Trip not found");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTrip, "Trip updated successfully"));
});


export const deleteTrip = asyncHandler(async (req: Request, res: Response) =>
{
    const { id } = req.params;
    const deletedTrip = await Trip.findByIdAndDelete(id);

    if (!deletedTrip) throw new ApiError(404, "Trip not found");

    return res
        .status(200)
        .json(new ApiResponse(200, deletedTrip, "Trip deleted successfully"));
});

export const getTrips = asyncHandler(async (req: Request, res: Response) =>
{
    const { from, to, date, page = "1", limit = "10" } = req.query;

    const match: any = {};
    if (from) match.from = from;
    if (to) match.to = to;
    if (date) match.date = new Date(date as string);

    const aggregate = Trip.aggregate([
        { $match: match },
        { $sort: { date: 1, departureTime: 1 } }
    ]);

    const options = {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        customLabels: {
            docs: "trips",
            totalDocs: "totalTrips"
        }
    };

    const trips = await (Trip as any).aggregatePaginate(aggregate, options);

    return res
        .status(200)
        .json(new ApiResponse(200, trips, "Trips fetched successfully"));
});


export const getTripById = asyncHandler(async (req: Request, res: Response) =>
{
    const { id } = req.params;
    const trip = await Trip.findById(id);

    if (!trip) throw new ApiError(404, "Trip not found");

    return res
        .status(200)
        .json(new ApiResponse(200, trip, "Trip fetched successfully"));
});
