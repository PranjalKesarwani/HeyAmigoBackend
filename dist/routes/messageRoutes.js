"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const auth_1 = __importDefault(require("../Middleware/auth"));
const router = express_1.default.Router();
router.post("/message", auth_1.default, messageController_1.createPMessage);
router.post("/g-message", auth_1.default, messageController_1.createGrpMessage);
router.get("/:chatId", auth_1.default, messageController_1.fetchAllMessages);
router.post("/upload", auth_1.default, messageController_1.imgUploader);
exports.default = router;
