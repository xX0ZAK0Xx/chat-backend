import socketAuth from "../middlewares/auth/authMiddleware.js";

export default function socketHandler(io) {
  // apply middleware
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("User connected: ", socket.userId, socket.userName);

    // join chat room
    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`${socket.userId} joined conversation ${conversationId}`);
    });

    // send message
    socket.on("send_message", (data) => {
      const { conversationId, message } = data;
      // broadcast to conversation room
      io.to(conversationId).emit("receive_message", {
        conversationId,
        message,
        sender: socket.userId,
        createdAt: new Date(),
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user);
    });
  });
}
