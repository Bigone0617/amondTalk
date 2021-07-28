// global import
import express from 'express';
import 'express-async-errors';

// local import
import * as chatController from '../Controller/chat.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// create chat
router.post('/createChat', isAuth, chatController.createChat);
// delete chat
router.put('/deleteChat', isAuth, chatController.deleteChat);
// get All chat
router.get('/getAllChat/:roomID', isAuth, chatController.getAllChat);
// get my chat
router.get('/getMyChat', isAuth, chatController.getMyChat);
// userName이 바뀌면 chat들의 userName도 변경(좋지 않은 방법임 하지만 데이터 양이 작아서 임시적으로 이렇게 작동)
router.put('/updateUserName', chatController.updateUserName)

export default router;
