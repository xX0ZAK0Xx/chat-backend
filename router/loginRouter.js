// external modules
import express from "express";

// internal modules
import { loginController } from "../controllers/loginController.js";
import { logInValidator, logInValidationHandler } from "../middlewares/login/loginValidator.js";

const router = express.Router();

router.post("/", logInValidator, logInValidationHandler, loginController);

export default router;