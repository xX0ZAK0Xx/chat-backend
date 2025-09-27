// external modules
import express from "express";

// internal modules
import { inboxController } from "../controllers/inboxController.js";
import decorateHtmlPage from "../middlewares/common/decorateHtmlPage.js";

const router = express.Router();

router.get("/", decorateHtmlPage("Chat Inbox"), inboxController);

export default router;