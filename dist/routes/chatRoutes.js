"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
const auth_1 = __importDefault(require("../Middleware/auth"));
const router = express_1.default.Router();
router.post("/create-chat", auth_1.default, chatController_1.createChat);
router.get('/get-p-contacts', auth_1.default, chatController_1.getPContacts);
router.post('/set_notification', auth_1.default, chatController_1.set_notification);
router.post('/reset_notification', auth_1.default, chatController_1.reset_notification);
router.get('/fetch_media/:chatId', auth_1.default, chatController_1.fetch_media);
exports.default = router;
