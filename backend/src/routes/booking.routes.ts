import { Router } from "express";
import
{
    createBooking,
    cancelBooking,
    getMyBookings,
    getAllBookings,
} from "../controllers/booking.controller";
import { createBookingValidator } from "../validators/booking.validators";
import { validateRequest } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

router.post("/", authMiddleware, createBookingValidator, validateRequest, createBooking);
router.delete("/:id", authMiddleware, cancelBooking);
router.get("/me", authMiddleware, getMyBookings);

router.get("/", authMiddleware, adminMiddleware, getAllBookings);

export default router;
