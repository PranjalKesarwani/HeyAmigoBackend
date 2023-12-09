"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGuest = exports.uploadUserPic = exports.searchUser = exports.getUserData = exports.logout = exports.login = exports.signup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createToken_1 = require("../config/createToken");
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const isUserExist = await userModel_1.default.findOne({ username: username, email: email });
        if (!isUserExist) {
            const user = await userModel_1.default.create({
                username: username,
                email: email,
                password: password,
            });
            let token = (0, createToken_1.createJwt)(user._id.toString());
            const options = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'none',
                secure: true
            };
            res.status(201).cookie("jwt", token, options).json({ isAuthenticated: true, msg: "Sign Up successful!" });
        }
        else {
            res.status(200).json({ msg: "User already exist!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error! Try again." });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel_1.default.findOne({ email: email });
    try {
        if (user) {
            bcryptjs_1.default.compare(password, user?.password, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(205).send("Wrong Password!");
                    throw new Error("Got some error");
                }
                else if (data) {
                    let token = (0, createToken_1.createJwt)(user._id.toString());
                    const options = {
                        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                        httpOnly: true,
                        sameSite: 'none',
                        secure: true
                    };
                    res.status(200).cookie("jwt", token, options).json({ isAuthenticated: true, msg: "Log In successful!" });
                }
                else {
                    res.status(406).send("Password do not match");
                }
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ err: "Internal server error! Try again." });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.status(200).clearCookie('jwt', { sameSite: 'none', secure: true }).json({ msg: 'Logged out successfully' });
    }
    catch (error) {
        console.log(error);
    }
};
exports.logout = logout;
const getUserData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userData = await userModel_1.default.findOne(userId).select("_id username pic email");
        res.status(200).json(userData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error!" });
    }
};
exports.getUserData = getUserData;
const searchUser = async (req, res) => {
    try {
        const currentUserId = req.user;
        const regex = new RegExp(`${req.query.search}`, 'i');
        const query = {
            _id: { $ne: currentUserId },
            $or: [
                { username: { $regex: regex } },
                { email: { $regex: regex } },
            ]
        };
        const allSearchedUser = await userModel_1.default.find(query).select("_id username email");
        res.status(200).json(allSearchedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.searchUser = searchUser;
const uploadUserPic = async (req, res) => {
    try {
        const { imgUrl } = req.body;
        const userId = req.user;
        const userDoc = await userModel_1.default.findByIdAndUpdate(userId, { pic: imgUrl });
        res.status(200).json({ msg: 'success' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.uploadUserPic = uploadUserPic;
const registerGuest = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const isUserExist = await userModel_1.default.findOne({ username: username, email: email });
        if (!isUserExist) {
            const user = await userModel_1.default.create({
                username: username,
                email: email,
                password: password,
            });
            let token = (0, createToken_1.createJwt)(user._id.toString());
            const options = {
                expires: new Date(Date.now() + 600000),
                httpOnly: true,
                sameSite: 'none',
                secure: true
            };
            res.status(201).cookie("jwt", token, options).json({ isAuthenticated: true, msg: "Sign Up successful!" });
        }
        else {
            let token = (0, createToken_1.createJwt)(isUserExist._id.toString());
            const options = {
                expires: new Date(Date.now() + 600000),
                httpOnly: true,
                sameSite: "none",
                secure: true
            };
            res.status(200).cookie('jwt', token, options).json({ isAuthenticated: true, msg: "Login Successful!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error! Try again." });
    }
};
exports.registerGuest = registerGuest;
