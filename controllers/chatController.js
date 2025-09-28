
const startChat = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Chat started successfully"
    });
}

const getAllChats = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Chats fetched successfully"
    })
}

const getMessages = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Messages fetched successfully"
    })
}

const sendMessage = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Message sent successfully"
    })
}

export { startChat, getAllChats, getMessages, sendMessage };