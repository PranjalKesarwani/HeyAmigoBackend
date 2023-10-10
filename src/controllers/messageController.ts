import Chat from "../models/chatModel";
import Message from "../models/messageModel";

export const createMessage = async (req: any, res: any) => {

    const {chatId,message,messageType} = req.body;
    console.log(chatId,message,messageType);

    try {

        const createMsg = await Message.create({
            senderId:req.user,
            message:message,
            messageType:messageType,
            chatId:chatId
        });
        res.status(201).json(createMsg);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
    }

}
export const fetchAllMessages = async (req: any, res: any) => {

    const chatId = req.params.chatId;
    console.log(chatId);
  

    try {

        const allMessages = await Message.find({chatId:chatId});
        console.log(allMessages)
        res.status(200).json(allMessages);
   
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
    }

}