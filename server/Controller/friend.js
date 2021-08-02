import * as friendRepository from '../Repository/friend.js';

export async function getAllFriends(req, res) {
    const userID = req.params.userID;
    const friends = await friendRepository.getAllFriends(userID);
    res.status(200).json(friends);
}

export async function findById(req, res) {
    const {userID, friendID} = req.params;
    const isFriend = await friendRepository.findById(userID, friendID);
    res.status(200).json(isFriend !== null ? true : false);
}

export async function addFriend(req, res) {
    const {userID, friendID} = req.body;

    // 내친구창에 친구 추가
    friendRepository.addFriend({
        userID,
        friendID,
        roomID: null,
        favorites: '0'
    });
    // 친구 친구창에 나 추가
    friendRepository.addFriend({
        userID:friendID,
        friendID: userID,
        roomID: null,
        favorites: '0'
    });

    res.sendStatus(201);
}

export async function createChatRoom(req, res) {
    const {userID, friendID} = req.body;
    const isAlready = await friendRepository.getRoomID(userID, friendID);

    if(isAlready['roomID'] !== null ){
        return res.status(200).json(isAlready['roomID']);
    }else{
        const findData =  await friendRepository.getFID(userID, friendID);
        const returnfID = await friendRepository.createChatRoom(findData['fID'], userID, friendID);
        return res.status(201).json(returnfID);
    }
}

export async function getAllChatRooms(req, res) {
    const {userID} = req.params;
    const chatRooms = await friendRepository.getAllChatRooms(userID);

    return res.status(200).json(chatRooms);
}