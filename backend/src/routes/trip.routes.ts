import { Router } from "express";
import
{
    createTrip,
    updateTrip,
    deleteTrip,
    getTrips,
    getTripById,
} from "../controllers/trip.controller";
import { createTripValidator } from "../validators/trip.validators";
import { validateRequest } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

// Admin-only routes
router.post("/", authMiddleware, adminMiddleware, createTripValidator, validateRequest, createTrip);
router.put("/:id", authMiddleware, adminMiddleware, updateTrip);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTrip);

// Public routes
router.get("/", getTrips);
router.get("/:id", getTripById);

export default router;
