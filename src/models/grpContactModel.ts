import mongoose from "mongoose";

const grpContactSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true
    },
    members: [{
        type: String,
        required: true
    }],
    latestMessage: {
        type: String,
    },

    allMessages: [{

    }],
    grpPic: {
        type: String
    }
}, { timestamps: true });




const GrpContactModel = mongoose.model("users", grpContactSchema);

export default GrpContactModel