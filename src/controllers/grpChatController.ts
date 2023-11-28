import { Response } from "express";
import Chat from "../models/chatModel";
const objectId = require('mongodb').ObjectID;

export const grpChatCreator = async (req: any, res: Response) => {

    try {

        const grpDetails = req.body;
        const allUsersId = JSON.parse(grpDetails.allUsers);
        const grpName = grpDetails.grpName;
        const userId = req.user;
        allUsersId.push(userId);

        const createGChat = await Chat.create({
            chatName: grpName,
            isGroupChat: true,
            users: allUsersId,
            groupAdmin: userId,
            latestMessage: null
        });



        const populatedGChat = await createGChat.populate([
            {
                path: 'users',
                select: '-password -updatedAt -createdAt'
            },
            {
                path: 'groupAdmin',
                select: '-password -updatedAt -createdAt'
            },


        ]);


        res.status(201).json(populatedGChat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server, chat not created!' })
    }

}

export const getGrpContacts = async (req: any, res: Response) => {

    try {

        const userId = req.user;



        const allGContacts = await Chat.find({
            isGroupChat: true,
            users: { $elemMatch: { $eq: req.user } }
        })
            .populate([
                {
                    path: 'users',
                    select: '-password -updatedAt -createdAt'
                },
                {
                    path: 'groupAdmin',
                    select: '-password -updatedAt -createdAt'
                },
                {
                    path: 'latestMessage',

                    populate: {
                        path: 'senderId',
                        select: '-createdAt -updatedAt -password'
                    }
                }

            ]).select('-updatedAt');



        res.status(200).json(allGContacts)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error! Unable to fetch data.' })
    }
}

export const updateGrpChatInfo = async (req: any, res: Response) => {

    try {

        const chatId = req.params.chatId;


        const { allUsers, grpName } = req.body;
        const allUsersIds = JSON.parse(allUsers);



        const updatedChatDoc = await Chat.findByIdAndUpdate({ _id: chatId }, { chatName: grpName, users: allUsersIds }, { new: true }).populate([
            {
                path: 'users',
                select: 'username email pic _id'
            },
            {
                path: 'groupAdmin',
                select: '-password -updatedAt -createdAt'
            },
            {
                path: 'latestMessage',

                populate: {
                    path: 'senderId',
                    select: '-createdAt -updatedAt -password'
                }
            }

        ]);


        res.status(200).json(updatedChatDoc);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }



}