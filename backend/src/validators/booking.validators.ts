import { body } from "express-validator";

export const createBookingValidator = [
    body("trip").notEmpty().withMessage("Trip ID is required"),
    body("seats")
        .isInt({ gt: 0 })
        .withMessage("Seats must be greater than 0"),
];
