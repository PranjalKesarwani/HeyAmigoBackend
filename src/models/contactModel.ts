import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    you: {
        type: String,
        required: true
    },
    latestMessage: {
        type: String,

    },
   
    allMessages:[{

    }]
}, { timestamps: true });




const ContactModel = mongoose.model("users", contactSchema);

export default ContactModel