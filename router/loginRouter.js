// external modules
import express from "express";

// internal modules
import { loginController } from "../controllers/loginController.js";
import decorateHtmlPage from "../middlewares/common/decorateHtmlPage.js";

const router = express.Router();

router.get("/", decorateHtmlPage("Login to Chat"), loginController);

export default router;