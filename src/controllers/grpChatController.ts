import { Response } from "express";
import Chat from "../models/chatModel";
import { ObjectId } from "mongodb";


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
            isGroupChat:true,
            users:{$elemMatch :{$eq:req.user}}
        })
        .populate([
            {
                path: 'users',
                select: '-password -updatedAt -createdAt'
            },
            {
                path:'groupAdmin',
                select:'-password -updatedAt -createdAt'
            }

        ]).populate('latestMessage','-updatedAt').select('-updatedAt');


        res.status(200).json(allGContacts)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error! Unable to fetch data.' })
    }
}