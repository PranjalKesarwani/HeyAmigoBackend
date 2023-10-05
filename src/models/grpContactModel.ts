import mongoose from "mongoose";

const grpContactSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        ref: "UserModel"
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: "UserModel"
    }],
    latestMessage: {
        type: mongoose.Types.ObjectId,
        ref: "MessageModel"
    },

    allMessages: [{
        type: mongoose.Types.ObjectId,
        ref: "MessageModel"
    }],
    grpPic: {
        type: String,
        default:"https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
    }
}, { timestamps: true });




const GrpContactModel = mongoose.model("users", grpContactSchema);

export default GrpContactModel