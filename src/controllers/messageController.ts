import ContactModel from "../models/chatModel";
import MessageModel from "../models/messageModel";
import UserModel from "../models/userModel";

export const messageController = async (req: any, res: any) => {

    res.send(req.body);
}