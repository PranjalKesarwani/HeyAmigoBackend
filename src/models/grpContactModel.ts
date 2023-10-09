import mongoose from "mongoose";

const grpChatSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    grpName: {
        type: String,
        trim:true,
        required:true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MessageModel"
    },

    grpPic: {
        type: String,
        default: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
    }
}, { timestamps: true });




const GrpContactModel =  mongoose.model("grpChat", grpChatSchema);

export default GrpContactModel;