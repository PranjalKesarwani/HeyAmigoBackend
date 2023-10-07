import mongoose from "mongoose";

const grpContactSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MessageModel"
    },

    allMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MessageModel"
    }],
    grpPic: {
        type: String,
        default:"https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
    }
}, { timestamps: true });




const GrpContactModel = mongoose.model("grpContacts", grpContactSchema);

export default GrpContactModel