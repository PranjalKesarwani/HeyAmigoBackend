"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGrpChatInfo = exports.getGrpContacts = exports.grpChatCreator = void 0;
const chatModel_1 = __importDefault(require("../models/chatModel"));
const grpChatCreator = async (req, res) => {
    try {
        const grpDetails = req.body;
        const allUsersId = JSON.parse(grpDetails.allUsers);
        const grpName = grpDetails.grpName;
        const userId = req.user;
        allUsersId.push(userId);
        const gUsersArray = allUsersId.map((id) => {
            return ({
                personInfo: id,
                messageCount: 0
            });
        });
        const createGChat = await chatModel_1.default.create({
            chatName: grpName,
            isGroupChat: true,
            users: gUsersArray,
            groupAdmin: userId,
            latestMessage: null
        });
        const populatedGChat = await createGChat.populate([
            {
                path: 'users.personInfo',
                select: '-password -updatedAt -createdAt'
            },
            {
                path: 'groupAdmin',
                select: '-password -updatedAt -createdAt'
            },
        ]);
        res.status(201).json(populatedGChat);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server, chat not created!' });
    }
};
exports.grpChatCreator = grpChatCreator;
const getGrpContacts = async (req, res) => {
    try {
        const userId = req.user;
        const allGContacts = await chatModel_1.default.find({
            isGroupChat: true,
            'users.personInfo': req.user
        })
            .populate([
            {
                path: 'users.personInfo',
                select: '-password -updatedAt -createdAt'
            },
            {
                path: 'groupAdmin',
                select: '-password -updatedAt -createdAt'
            },
            {
                path: 'latestMessage',
                populate: {
                    path: 'senderId',
                    select: '-createdAt -updatedAt -password'
                }
            }
        ]).select('-updatedAt');
        res.status(200).json(allGContacts);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error! Unable to fetch data.' });
    }
};
exports.getGrpContacts = getGrpContacts;
//--------It will not work currently, as users have been changed but here modifications not done
const updateGrpChatInfo = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const { allUsers, grpName } = req.body;
        const allUsersIds = JSON.parse(allUsers);
        const reqUsersArray = allUsersIds.map((personId) => {
            return ({
                personInfo: personId,
                messageCount: 0
            });
        });
        const updatedChatDoc = await chatModel_1.default.findByIdAndUpdate({ _id: chatId }, { chatName: grpName, users: reqUsersArray }, { new: true }).populate([
            {
                path: 'users.personInfo',
                select: 'username email pic _id'
            },
            {
                path: 'groupAdmin',
                select: '-password -updatedAt -createdAt'
            },
            {
                path: 'latestMessage',
                populate: {
                    path: 'senderId',
                    select: '-createdAt -updatedAt -password'
                }
            }
        ]);
        res.status(200).json(updatedChatDoc);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};
exports.updateGrpChatInfo = updateGrpChatInfo;
