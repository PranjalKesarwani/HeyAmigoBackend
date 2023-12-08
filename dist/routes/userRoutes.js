"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = __importDefault(require("../Middleware/auth"));
const router = express_1.default.Router();
router.post("/signup", userController_1.signup);
router.post("/login", userController_1.login);
router.post("/guest", userController_1.registerGuest);
router.post('/upload_user_pic', auth_1.default, userController_1.uploadUserPic);
router.get("/logout", auth_1.default, userController_1.logout);
router.get("/getuserdata", auth_1.default, userController_1.getUserData);
router.get("/searchuser", auth_1.default, userController_1.searchUser);
// router.get('/check_authentication',auth,checkAuth);
exports.default = router;
