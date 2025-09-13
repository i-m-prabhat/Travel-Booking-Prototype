import { Router } from "express";
import { initiatePayment, verifyPayment, getAllPayments } from "../controllers/payment.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import
    {
        initiatePaymentValidator,
        verifyPaymentValidator,
        paymentsQueryValidator,
    } from "../validators/payment.validators";

const router = Router();

router.post("/initiate", authMiddleware, initiatePaymentValidator, validateRequest, initiatePayment);
router.post("/verify", authMiddleware, verifyPaymentValidator, validateRequest, verifyPayment);
router.get("/", authMiddleware, adminMiddleware, paymentsQueryValidator, validateRequest, getAllPayments);

export default router;