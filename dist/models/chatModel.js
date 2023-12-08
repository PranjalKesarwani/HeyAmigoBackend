"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    chatName: {
        type: String,
        required: true
    },
    isGroupChat: {
        type: Boolean,
        required: true
    },
    users: [
        {
            personInfo: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
            messageCount: {
                type: Number,
                default: 0
            }
        }
    ],
    // users:[
    //     {type:mongoose.Schema.Types.ObjectId,ref:"User"}
    // ],
    groupAdmin: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: "User"
    },
    latestMessage: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Message",
    }
}, { timestamps: true });
const Chat = mongoose_1.default.model("Chat", chatSchema);
exports.default = Chat;
