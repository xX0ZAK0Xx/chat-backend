import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

const startChat = async (req, res) => {
    try {
        // find existing chat between two users
        let chat = await Chat.findOne({
            participants: {
                $all: [
                    req.body.receiverId,
                    req.userId
                ]
            }
        });

        // if doesn't exist, create a new chat
        if(!chat){
            chat = await new Chat({
                participants: [
                    req.body.receiverId,
                    req.userId
                ]
            });
            chat = await chat.save();
        }

        // return the chat
        res.status(200).json({
            success: true,
            message: "Chat started successfully",
            data: chat
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: {
                common: {
                    message: "Internal server error"
                }
            }
        });
    }
}

const getAllChats = async (req, res) => {
    try {
        // find all chats of the user
        const allChats = await Chat.find({
            participants: {
                $in: [req.userId]
            }
        }).populate("participants", "-password -__v");
        
        // return the chats
        res.status(200).json({
            success: true,
            message: "Chats fetched successfully",
            data: allChats
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: {
                common: {
                    message: "Internal server error"
                }
            }
        });
    }
}

const getMessages = async (req, res) => {
    try {
        // check if the chat exists
        const chat = await Chat.findById(req.params.id);

        if(!chat){
            res.status(404).json({
                errors: {
                    common: {
                        message: "Chat not found"
                    }
                }
            });
        }else{
            // find all messages of the chat
            const messages = await Message.find({
                conversationId: req.params.id,
            }).populate("sender", "-password -__v")
            .sort({createdAt: 1});

            // return the messages
            res.status(200).json({
                success: true,
                message: "Messages fetched successfully",
                data: messages
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: {
                common: {
                    message: "Internal server error"
                }
            }
        });
    }
}

const sendMessage = async (req, res) => {
    try {
        // check if the chat exists
        const chat = await Chat.findById(req.params.id);

        if(!chat){
            res.status(404).json({
                errors: {
                    common: {
                        message: "Chat not found"
                    }
                }
            });
        }else{
            // create a new message
            const message = await new Message({
                conversationId: req.params.id,
                sender: req.userId,
                message: req.body.message,
                attachments: req.body.attachments || []
            });

            // save the message
            await message.save();

            // return the message
            res.status(200).json({
                success: true,
                message: "Message sent successfully",
                data: message
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: {
                common: {
                    message: "Internal server error"
                }
            }
        });
    }
}

export { startChat, getAllChats, getMessages, sendMessage };