import { Response } from "express"
import ChatModel from "../models/chatModel";

export const createChat = async (req: any, res: Response) => {
    try {


        const { username, email, isGroupChat } = req.body;
        const otherPId = req.body._id;
        const userId = req.user;

        //User searched in one-on-one chat, clicked on any one, now the data will come here, and check if the chat is not created, then it will create, and if chat is already present then it will do nothing

        console.log('hello world')

        const isChatExist = await ChatModel.findOne({
            isGroupChat: false,
            $and: [
                { 'users.personInfo': userId },   //users array me hote hai elements isliye uske elements me check kr rahe, koi element toh hoga, jiski id userId se match kr rahi hogi
                { 'users.personInfo': otherPId }, //usi oopr wale user array me atleast koi ek element toh hoga jo otherPId ke barabar ho

            ]
        });
        console.log(isChatExist);

        if (isChatExist) {
            // const populatedChatData = await isChatExist.populate('users', '-password');
            const populatedChatData = await isChatExist.populate([
                {
                    path: 'users',
                    select: '_id, username email pic'
                },
                {
                    path: 'latestMessage',
                    select: '-updatedAt',
                    populate: {
                        path: 'senderId',
                        select: '_id username email pic'
                    }
                }
            ]);

            


            res.status(200).json(populatedChatData);

        } else {
            console.log('inside else condition');
            const chat = await ChatModel.create({
                chatName: username,
                isGroupChat: isGroupChat,
                users: [
                    { personInfo: userId, messageCount: 0 },
                    { personInfo: otherPId, messageCount: 0 }
                ],
                // users: [userId, otherPId],
                latestMessage: null,

            });
            const populatedChatData = await chat.populate('users.personInfo', '-password');
            console.log(populatedChatData);
            res.status(201).send(populatedChatData);
        }



    } catch (error) {
        res.status(500).json("msg:Internal Server error!");
    }


}

export const getPContacts = async (req: any, res: Response) => {

    try {

        const allPContacts = await ChatModel.find({
            isGroupChat: false,
            'users.personInfo': req.user 
        }).populate([
            {
                path: 'users.personInfo',
                select: '_id username email pic'
            }, {
                path: 'latestMessage',
                populate: {
                    path: 'senderId',
                    select: '_id username email pic'

                }
            }
        ]).select('_id chatName isGroupChat users latestMessage').sort({ updatedAt: -1 });

        console.log('--',allPContacts);






        res.status(200).json(allPContacts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error!' });
    }



}

export const set_notification = async (req: any, res: Response) => {
    const { chatId } = req.body;
    const userId = req.user;
    console.log('--', chatId);
    res.status(201).json('i am listening');
}