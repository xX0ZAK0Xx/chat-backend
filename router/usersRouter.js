// external modules
import express from "express";

// internal modules
import { usersController } from "../controllers/usersController.js";
import decorateHtmlPage from "../middlewares/common/decorateHtmlPage.js";

const router = express.Router();

router.get("/", decorateHtmlPage("Manage Users"), usersController);

export default router;