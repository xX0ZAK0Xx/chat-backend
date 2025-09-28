// import modules: external
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

// import modules: internal
import { notFound, errorHandler } from "./middlewares/common/errorHandler.js";
import loginRouter from "./router/loginRouter.js";
import conversationRouter from "./router/chatRouter.js";
import usersRouter from "./router/usersRouter.js";
import socketHandler from "./socket/socket.js";

// fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// connect socket
const io = new Server(server, { cors: { origin: "*" } });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing
app.use("/", loginRouter);
app.use("/chat", conversationRouter);
app.use("/users", usersRouter);

// error handling
app.use(notFound);
app.use(errorHandler);

// socket handler
socketHandler(io);

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
