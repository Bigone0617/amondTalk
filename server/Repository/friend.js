import SQ from 'sequelize';
import { sequelize } from '../database/database.js';
import { User } from './auth.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

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

const ORDER_DESC = {
    order: [['user','userName', 'ASC']],
};

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