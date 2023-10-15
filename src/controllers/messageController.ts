import Chat from "../models/chatModel";
import Message from "../models/messageModel";
import { Request, Response } from "express";
// const cloudinary = require('cloudinary').v2
import { v2 } from 'cloudinary'

export const createPMessage = async (req: any, res: any) => {

    const { chatId, message, messageType } = req.body;

    try {

        const createMsg = await Message.create({
            senderId: req.user,
            message: message,
            messageType: messageType,
            chatId: chatId
        });
        if (createMsg) {
            const chatDoc = await Chat.findById(chatId);
            chatDoc!.latestMessage = createMsg._id;
            await chatDoc!.save();


        }
        res.status(201).json(createMsg);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }

}
export const createGrpMessage = async (req: any, res: any) => {

    const { chatId, message, messageType } = req.body;

    try {

        const createGrpMsg = await Message.create({
            senderId: req.user,
            message: message,
            messageType: messageType,
            chatId: chatId
        })


        await createGrpMsg.populate('senderId', '_id username email pic');
        console.log(createGrpMsg);



        if (createGrpMsg) {

            const chatDoc = await Chat.findById(chatId);
            chatDoc!.latestMessage = createGrpMsg._id;
            await chatDoc!.save();


        }
        res.status(201).json(createGrpMsg);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }

}
export const fetchAllMessages = async (req: any, res: any) => {

    const chatId = req.params.chatId;



    try {

        const allMessages = await Message.find({ chatId: chatId }).populate('senderId', '_id username email pic');

        res.status(200).json(allMessages);


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }

}

export const imgUploader = async (req: any, res: Response) => {

    try {
        
    const {message,messageType,chatId} = req.body;
    const userId = req.user;

    const createMsg = await Message.create({
        senderId: userId,
        message: message,
        messageType: messageType,
        chatId: chatId
    });

    if (createMsg) {
        const chatDoc = await Chat.findById(chatId);
        chatDoc!.latestMessage = createMsg._id;
        await chatDoc!.save();

    }

    res.status(201).json(createMsg);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Server Error! Message not sent!'})
    }

}