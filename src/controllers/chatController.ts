import { Response } from "express"
import ChatModel from "../models/chatModel";

export const createChat = async (req: any, res: Response) => {
    try {


        const { username, email, isGroupChat } = req.body;
        const otherPId = req.body._id;
        const userId = req.user;

        //User searched in one-on-one chat, clicked on any one, now the data will come here, and check if the chat is not created, then it will create, and if chat is already present then it will do nothing

        const isChatExist = await ChatModel.findOne({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: userId, } } },   //users array me hote hai elements isliye uske elements me check kr rahe, koi element toh hoga, jiski id userId se match kr rahi hogi
                { users: { $elemMatch: { $eq: otherPId, } } }, //usi oopr wale user array me atleast koi ek element toh hoga jo otherPId ke barabar ho

            ]
        });
        console.log(isChatExist);
        if (isChatExist) {
            res.status(200).json({ msg: 'Chat already exist!' });

        } else {
            const chat = await ChatModel.create({
                chatName: username,
                isGroupChat: isGroupChat,
                users: [userId, otherPId],
            })
            res.status(201).send(chat);
        }



    } catch (error) {
        res.status(500).json("msg:Internal Server error!");
    }


}

export const getPContacts = async (req: any, res: Response) => {

    try {
        const allPContacts = await ChatModel.find({
            isGroupChat: false,
            users: { $elemMatch: { $eq: req.user } }
        }).populate({
            path:'users',
            select:'_id username email pic'
        }).select('_id chatName isGroupChat users');

         

        console.log(allPContacts)

        res.status(200).json(allPContacts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error!' });
    }



}