import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        senderId: {
            type: String,
        },
        receiverId: {
            type: String,
        },
        conversationId: {
            type: String,
        },
        message: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
