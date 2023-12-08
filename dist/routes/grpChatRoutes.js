"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const grpChatController_1 = require("../controllers/grpChatController");
const auth_1 = __importDefault(require("../Middleware/auth"));
const router = express_1.default.Router();
router.post("/create-grp", auth_1.default, grpChatController_1.grpChatCreator);
router.post("/update-grp/:chatId", auth_1.default, grpChatController_1.updateGrpChatInfo);
router.get("/get-g-contacts", auth_1.default, grpChatController_1.getGrpContacts);
exports.default = router;
