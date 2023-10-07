import { ObjectId } from "mongodb";
import ContactModel from "../models/contactModel";
import MessageModel from "../models/messageModel";
import { contactController } from "./contactController";
import { Types } from "mongoose";
import UserModel from "../models/userModel";

export const messageController =async (req:any,res:any)=>{

//This controller creates the message, then search the chatContact from contact model, if not found then creates the chatContact and assign the latestMessage and insert this first msg inside the all messages array.
//If the chatContact got found from the contact model then the latest message set to this new message and also inserted inside the allMessages array of this chatContact. We also needed to save the reference of chatContact in both users document and also needed to insert the messages inside the chatContact which had i already explained.

try {
    const userId = req.user;
    const {secondPersonId,message,messageType} = req.body;

    //creating new message
    const newMessage = await MessageModel.create({
        senderId:userId,
        message:message,
        messageType:messageType
    });



    //searching whether chat contact exist or not
    const searchChatContact = await ContactModel.findOne({
        $or:[
            {firstPId:userId,secondPId:secondPersonId},
            {firstPId:secondPersonId,secondPId:userId}
        ]
    });

    if(!searchChatContact){
        //if not existed then create one
        const createChatContact = await ContactModel.create({
            firstPId:userId,
            secondPId:secondPersonId,
            latestMessage:newMessage._id,
            allMessages:[newMessage._id]
        });

        const [firstPDoc,secondPDoc] = await UserModel.find({_id:{$in:[userId,secondPersonId]}});

        if(!firstPDoc || !secondPDoc){
            res.status(404).json({msg:"user not found"});
        }
        firstPDoc.contacts.push(createChatContact._id);
        secondPDoc.contacts.push(createChatContact._id);


        await Promise.all([firstPDoc.save(),secondPDoc.save()]);
      
     
    }else{

        //if existed then insert the msgs
        
        searchChatContact.latestMessage = newMessage._id ;
        searchChatContact.allMessages.push(newMessage._id)

         await searchChatContact.save()

    }

   
    res.status(201).send(newMessage);
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"Internal server error! Msg not sent"})

}

}