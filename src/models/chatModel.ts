import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatName: {
        type:String,
        required:true
    },
    isGroupChat: {
        type:Boolean,
        required:true
    },
    users:[
        {type:mongoose.Schema.Types.ObjectId,ref:"User"}
    ],
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
   
}, { timestamps: true });




const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
