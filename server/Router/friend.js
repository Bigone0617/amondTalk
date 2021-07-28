// global import
import express from 'express';
// local import
import * as friendController from '../Controller/friend.js';

const router = express.Router();

// 모든 친구 가져오기
router.get('/getAllFriends/:userID', friendController.getAllFriends);
// 친구인지 확인하기
router.get('/findById/:userID/:friendID', friendController.findById);
// 친구추가
router.post('/addFriend', friendController.addFriend);


export default router;