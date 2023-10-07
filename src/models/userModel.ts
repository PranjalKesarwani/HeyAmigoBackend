import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
    },
    contacts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ContactModel"
        }
    ],
    grpContacts:[
        
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"GrpContactModel"
            }
        
    ]
}, { timestamps: true });

userSchema.methods.matchPassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    } else {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
})

const UserModel = mongoose.model("users", userSchema);

export default UserModel