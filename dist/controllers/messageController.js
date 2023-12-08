"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgUploader = exports.fetchAllMessages = exports.createGrpMessage = exports.createPMessage = void 0;
const chatModel_1 = __importDefault(require("../models/chatModel"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
const createPMessage = async (req, res) => {
    const { chatId, message, messageType } = req.body;
    try {
        const createMsg = await messageModel_1.default.create({
            senderId: req.user,
            message: message,
            messageType: messageType,
            chatId: chatId
        });
        if (createMsg) {
            const chatDoc = await chatModel_1.default.findById(chatId);
            chatDoc.latestMessage = createMsg._id;
            await chatDoc.save();
        }
        res.status(201).json(createMsg);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.createPMessage = createPMessage;
const createGrpMessage = async (req, res) => {
    const { chatId, message, messageType } = req.body;
    try {
        const createGrpMsg = await messageModel_1.default.create({
            senderId: req.user,
            message: message,
            messageType: messageType,
            chatId: chatId
        });
        await createGrpMsg.populate('senderId', '_id username email pic');
        if (createGrpMsg) {
            const chatDoc = await chatModel_1.default.findById(chatId);
            chatDoc.latestMessage = createGrpMsg._id;
            await chatDoc.save();
        }
        res.status(201).json(createGrpMsg);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.createGrpMessage = createGrpMessage;
const fetchAllMessages = async (req, res) => {
    const chatId = req.params.chatId;
    try {
        const allMessages = await messageModel_1.default.find({ chatId: chatId }).populate('senderId', '_id username email pic');
        res.status(200).json(allMessages);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.fetchAllMessages = fetchAllMessages;
const imgUploader = async (req, res) => {
    try {
        const { message, messageType, chatId } = req.body;
        const userId = req.user;
        const createMsg = await messageModel_1.default.create({
            senderId: userId,
            message: message,
            messageType: messageType,
            chatId: chatId
        });
        if (createMsg) {
            const chatDoc = await chatModel_1.default.findById(chatId);
            chatDoc.latestMessage = createMsg._id;
            await chatDoc.save();
        }
        res.status(201).json(createMsg);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error! Message not sent!' });
    }
};
exports.imgUploader = imgUploader;
