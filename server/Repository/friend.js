import SQ from 'sequelize';
import { sequelize } from '../database/database.js';
import { User } from './auth.js';
import {Chat} from './chat.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;
const Op = Sequelize.Op;

export const Friend = sequelize.define(
    'friends',
    {
      fID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userID: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      friendID: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      roomID: {
        type: DataTypes.STRING(8),
        defaultValue: null
      },
      favorites: {
        type: DataTypes.STRING(1),
        defaultValue: '0'
      },
    },
    { timestamps: false }
);

Friend.belongsTo(User, {foreignKey: 'friendID'});
Friend.belongsTo(Chat, {
  foreignKey: {
    name : 'roomID'
  },
  targetKey: 'roomID',
});

const INCLUDE_USER = {
    attributes: [
        'fID',
        'userID',
        'friendID',
        'roomID',
        'favorites',
        [Sequelize.col('user.id'), 'id'],
        [Sequelize.col('user.userName'), 'userName'],
        [Sequelize.col('user.url'), 'url'],
        [Sequelize.col('user.stmsg'), 'stmsg'],
    ],
    include: {
        model: User,
        attributes: [],
    },
}

const INCLUDE_USER_CHAT = {
  attributes: [
    'userID',
    'friendID',
    'roomID',
    [Sequelize.col('user.id'), 'id'],
    [Sequelize.col('user.userName'), 'userName'],
    [Sequelize.col('user.url'), 'url'],
    [Sequelize.col('chat.text'), 'text'],
    [sequelize.col('chat.createdAt'), 'createdAt']
  ],
  include: [{
      model: User,
      attributes: [],
  },{
      model: Chat,
      attributes: [],
  }]
}

const ORDER_DESC = {
    order: [['user','userName', 'ASC']],
};

const ORDER_CHATROOMS = {
    order: [['chat', 'createdAt', 'DESC']]
}
//! ========================== CRUD START==========================//
// 친구 추가
export async function addFriend(friendData){
    Friend.create({
      userID: friendData.userID,
      friendID: friendData.friendID
    }).then((data) => data.dataValues.userID);
}

//! ========================== CRUD END==========================//

// 모든 친구 찾기
export async function getAllFriends(userID) {
  return Friend.findAll({
    where: {userID},
    ...INCLUDE_USER,
    ...ORDER_DESC
  });
}

// 친구인지 아닌지 확인
export async function findById(userID, friendID) {
  return Friend.findOne({
    where: {
      userID,
      friendID
    }
  });
}

// 채팅 만들기
export async function createChatRoom(fID, userID, friendID) {
  
  // 내 roomID에 fID 업데이트
  Friend.findOne({where : {userID, friendID}})
        .then((friend) => {
          friend.roomID = fID;
          friend.save();
        });
  // 친구 roomID에 내 fID 업데이트
  Friend.findOne({where : {friendID: userID, userID: friendID}})
        .then((friend) => {
          friend.roomID = fID;
          friend.save();
        });
        
  return fID;
}

// fid 얻기
export async function getFID(userID, friendID) {
  return Friend.findOne({where : {userID, friendID}});
}

// roomID 얻기
export async function getRoomID(userID, friendID) {
  return Friend.findOne({where : {userID, friendID}});
}

// 나의 모든 채틸 가져오기
export async function getAllChatRooms(userID) {
  return Friend.findAll({
    attributes:{
      include: [
        'userID',
        'friendID',
        'roomID',
        [Sequelize.col('user.userName'), 'userName'],
        [Sequelize.col('user.url'), 'url'],
        [ 
          Sequelize.literal('(SELECT `T`.`text` FROM (SELECT `text`, `createdAt` FROM `chats` WHERE `roomID` = `friends`.`roomID` ORDER BY `chatID` DESC LIMIT 1) AS `T`)'),
          'text'
        ],
        [ 
          Sequelize.literal('(SELECT `T`.`createdAt` FROM (SELECT `text`, `createdAt` FROM `chats` WHERE `roomID` = `friends`.`roomID` ORDER BY `chatID` DESC LIMIT 1) AS `T`)'),
          'createdAt'
        ]
      ]
    },
    where: {
      userID,
      roomID: {
        [Op.ne]: null
      }
    },
    include: [
      {
        model: User,
        attributes:[]
      }
    ],
    order: [[Sequelize.literal('createdAt'), 'DESC']],
  });
}

  // 채팅방 나가기 시 관련 데이터 지우기
  export async function closeChatRoom(roomID) {
    return Friend.findAll({
                    where: {roomID}
                  })
                  .then((datas) => {
                    datas.map((data) => {
                      data.roomID = null;
                      data.save();
                    });
                  });
  }