// external modules
import express from "express";

// internal modules
import { loginController } from "../controllers/loginController.js";

const router = express.Router();

router.get("/", loginController);

export default router;