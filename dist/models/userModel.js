"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg",
    },
}, { timestamps: true });
userSchema.index({ username: 1 });
userSchema.methods.matchPassword = async function (candidatePassword) {
    return await bcryptjs_1.default.compare(candidatePassword, this.password);
};
userSchema.pre("save", async function (next) {
    //If user wanted to reset his password then findOneAndUpdate krna hoga toh uss situation me isModified true ho jayega so else me ayega and new password ko bhi hash kr dega
    if (!this.isModified('password')) {
        next();
    }
    else {
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
    }
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
