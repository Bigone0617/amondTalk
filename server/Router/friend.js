// global import
import express from 'express';
// local import
import * as friendController from '../Controller/friend.js';

const router = express.Router();

// 모든 친구 가져오기
router.get('/getAllFriends/:userID', friendController.getAllFriends);
// 친구인지 확인하기
router.get('/findById/:userID/:friendID', friendController.findById);
// 모든 채팅방 가져오기
router.get('/getAllChatRooms/:userID', friendController.getAllChatRooms);
// 친구추가
router.post('/addFriend', friendController.addFriend);
// 채팅 만들기
router.put('/createChatRoom', friendController.createChatRoom);



export default router;