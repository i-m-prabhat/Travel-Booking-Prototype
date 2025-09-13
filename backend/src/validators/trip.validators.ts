import { body } from "express-validator";

export const createTripValidator = [
    body("from").notEmpty().withMessage("Source is required"),
    body("to").notEmpty().withMessage("Destination is required"),
    body("date").isISO8601().withMessage("Valid date is required"),
    body("departureTime").notEmpty().withMessage("Departure time is required"),
    body("arrivalTime").notEmpty().withMessage("Arrival time is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
    body("totalSeats")
        .isInt({ gt: 0 })
        .withMessage("Total seats must be greater than 0"),
];
