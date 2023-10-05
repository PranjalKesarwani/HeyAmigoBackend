import mongoose, { mongo } from "mongoose";

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:"UserModel",
    },
    you: {
        type: mongoose.Types.ObjectId,
        ref:"UserModel"
    },
    latestMessage: {
        type: mongoose.Types.ObjectId,
        ref:"MessageModel"
    },
   
    allMessages:[{type:mongoose.Types.ObjectId,ref:"MessageModel"}]
}, { timestamps: true });




const ContactModel = mongoose.model("users", contactSchema);

export default ContactModel