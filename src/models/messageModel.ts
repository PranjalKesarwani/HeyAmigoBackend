import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
     
    },
    message: {
        type: String,
        required: true
    },
    messageType:{
        type:String,
        required:true
    }
    
   
  
}, { timestamps: true });




const MessageModel = mongoose.model("messages", messageSchema);

export default MessageModel