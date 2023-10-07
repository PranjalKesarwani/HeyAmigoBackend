import mongoose, { mongo } from "mongoose";

const contactSchema = new mongoose.Schema({
    firstPId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
    },
    secondPId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"MessageModel"
    },
   
    allMessages:[{type:mongoose.Schema.Types.ObjectId,ref:"MessageModel"}]
}, { timestamps: true });




const ContactModel = mongoose.model("contacts", contactSchema);

export default ContactModel