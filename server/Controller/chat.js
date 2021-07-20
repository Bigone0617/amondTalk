import * as chatRepository from '../Repository/chat.js';
import { getSocketIO } from '../connection/socket.js';

// create chat
export async function createChat(req, res) {
    const newChat = await chatRepository.createChat(req.body);
    res.status(201).json(newChat);
    getSocketIO().emit('chats', newChat);
};

// delete chat
export async function deleteChat(req, res) {
    const {chatID} = req.body;
    const chat = await chatRepository.getById(chatID);

    if(!chat){
        return res.status(404).json({message: `Chat not found: ${chatID}`});
    }
    if(chat.userID !== req.userId){
        return res.sendStatus(403);
    }
    await chatRepository.deleteChat(chatID)
    res.sendStatus(204);
};

//get all chat
export async function getAllChat(req, res) {
    const chats = await chatRepository.getAllChat();
    res.status(200).json({chats});
};

//get my chat
export async function getMyChat(req, res) {
    const {userID} = req.body;
    const chats = await chatRepository.getMyChat(userID);

    res.status(200).json({chats});
};

export async function updateUserName(req, res) {
    const {userID, userName} = req.body;
    await chatRepository.updateUserName(userID, userName);

    res.sendStatus(200);
}