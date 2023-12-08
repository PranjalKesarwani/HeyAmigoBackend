"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const auth = async (req, res, next) => {
    const token = req.cookies.jwt;
    //if the request does not have token
    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }
    const requestedId = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    //Finding userDetails using id
    const userFile = await userModel_1.default.findById(requestedId.id);
    if (!userFile) {
        return res.status(401).json({ isAuthenticated: false });
    }
    req.user = userFile._id;
    next();
};
exports.default = auth;
