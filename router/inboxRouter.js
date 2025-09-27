// external modules
import express from "express";

// internal modules
import { inboxController } from "../controllers/inboxController.js";

const router = express.Router();

router.get("/", inboxController);

export default router;