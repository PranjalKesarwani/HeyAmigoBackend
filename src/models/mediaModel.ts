import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const mediaSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        required: true
    },
   
}, { timestamps: true });




const MediaModel = mongoose.model("users", mediaSchema);

export default MediaModel