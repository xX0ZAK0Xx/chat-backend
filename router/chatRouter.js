// external modules
import express from "express";

// internal modules
import {startChat, getAllChats, getMessages, sendMessage} from "../controllers/chatController.js";
import validateToken from "../middlewares/common/validateToken.js";
import { createChatValidator, createChatValidationHandler } from "../middlewares/chat/createChatValidator.js";
import { sendMessageValidator, sendMessageValidationHandler } from "../middlewares/chat/sendMessageValidator.js";

const router = express.Router();

// start a new chat
router.post("/", validateToken, createChatValidator, createChatValidationHandler,  startChat);
// router.post("/", (req, res) => res.send("hello"));

// get all chats
router.get("/", validateToken, getAllChats);

// get messages
router.get("/:id", validateToken, getMessages);

// send message
router.post("/:id", validateToken, sendMessageValidator, sendMessageValidationHandler, sendMessage);

export default router;