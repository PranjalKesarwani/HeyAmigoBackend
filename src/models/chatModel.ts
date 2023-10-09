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
        {type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}
    ],
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,ref:"UserModel"
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"MessageModel"
    },
   
}, { timestamps: true });




const ChatModel = mongoose.model("chats", chatSchema);

export default ChatModel;
