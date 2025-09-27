const inboxController = (req, res) => {
    res.status(200).json({
        message: "Chat Inbox"
    });
}

export { inboxController };