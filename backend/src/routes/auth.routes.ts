import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { registerValidator, loginValidator } from "../validators/auth.validators";

const router = Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);

export default router;
