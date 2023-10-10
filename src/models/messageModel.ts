import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    messageType: {
        type: String,
        required: true,
        trim: true
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required: true
    }

}, { timestamps: true });




const Message = mongoose.model("Message", messageSchema);

export default Message;