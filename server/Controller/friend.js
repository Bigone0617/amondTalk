import * as friendRepository from '../Repository/friend.js';

export async function getAllFriends(req, res) {
    const userID = req.params.userID;
    const friends = await friendRepository.getAllFriends(userID);
    res.status(200).json(friends);
}

export async function findById(req, res) {
    const {userID, friendID} = req.params;
    console.log(`Controller : ${userID} , ${friendID}`);
    const isFriend = await friendRepository.findById(userID, friendID);
    res.status(200).json(isFriend !== null ? true : false);
}

export async function addFriend(req, res) {
    const {userID, friendID} = req.body;
    console.log(`controller : ${userID} ${friendID}`);

    const test = await friendRepository.addFriend({
        userID,
        friendID,
        roomID: null,
        favorites: '0'
    });

    res.status(201).json({test});
}