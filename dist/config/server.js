"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const PORT = 5000 || process.env.PORT;
const app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", true);
mongoose_1.default
    .connect(process.env.DB_CONN_STRING, {
    serverSelectionTimeoutMS: 50000, // Set a 50-second timeout
})
    .then(() => {
    console.log("DB connected");
})
    .catch((err) => {
    console.log(err);
});
