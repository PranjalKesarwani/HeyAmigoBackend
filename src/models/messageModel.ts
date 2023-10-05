import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    messageType:{
        type:String
    }
    
   
  
}, { timestamps: true });




const MessageModel = mongoose.model("users", messageSchema);

export default MessageModel