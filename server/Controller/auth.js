import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../Repository/auth.js';
import { config } from '../config.js';

// 로그인
export async function signIn(req, res){
    const {id, pw} = req.body;
    const user = await userRepository.signIn(id);

    // id가 없는 경우
    if(!user) {
        return res.status(401).json({ message: 'Invalid user or password' });
    }

    // 비밀번호 복호화
   const isValidPassword = await bcrypt.compare(pw, user.pw);
   if(!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password' });
   }
   const token = createJwtToken(user.id);
   const {userName, email, url} = user;

   res.status(200).json({ token, id, userName, url, email});
};

// 회원가입
export async function signUp(req, res) {
    const { id, pw, userName, email, url } = req.body;

    const duplicated = await userRepository.findById(id);

    // 중복된 ID가 존재
    if(duplicated){
        return res.status(409).json({ message: `${id} already exists` });
    }
    // 비밀번호 암호화
    const hashed = await bcrypt.hash(pw, config.bcrypt.saltRounds);

    const userId = await userRepository.createUser({
        id,
        pw : hashed,
        userName,
        email,
        url
    });

    const token = createJwtToken(userId);

    res.status(201).json({token, id});
}

// 회원 정보 수정
export async function updateUser(req, res){
    // updateData(req.body) -> id, userName, email, url
    const updated = await userRepository.updateUser(req.body);

    res.status(200).json(updated);
}

// 회원 탈퇴
export async function deleteUser(req, res) {
    const { id , pw} = req.body;
    const user = await userRepository.findById(id);

    if(!user){
        return res.status(404).json({message: `${id} is not found`});
    }

    if(user.pw !== pw){
        return res.status(403).json({message: `password is not correct`});
    }
    await userRepository.deleteUser(id);
    res.sendStatus(204);
}

// 모든 회원정보 가져오기
export async function getAllUser(req, res) {
    const allUsers = await userRepository.getAllUser();
    res.status(200).json(allUsers);
}


function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, {
      expiresIn: config.jwt.expiresInSec,
    });
  }
  
  export async function me(req, res, next) {
    const user = await userRepository.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ token: req.token, userName: user.userName, id: user.id, email: user.email, url: user.url, stmsg: user.stmsg});
  }

  export async function getById(req, res, next) {
      const id = req.params.userID
      const user = await userRepository.findById(id);
      if(!user){
        return res.status(200).json(null);
      }
      res.status(200).json({ id: user.id, userName: user.userName, email: user.email, url: user.url, stmsg: user.stmsg});
  }
