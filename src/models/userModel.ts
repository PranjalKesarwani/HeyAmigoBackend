import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    pic:{
        type:String,
        default:"https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
    }
},{timestamps:true});

const UserModel = mongoose.model("users", userSchema);

export default UserModel