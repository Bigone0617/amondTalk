import SQ from 'sequelize';
import { sequelize } from '../database/database.js';
import { User } from './auth.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

export const Chat = sequelize.define(
    'chats',
    {
      chatID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userID: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      chatTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      isDelete: {
          type: DataTypes.STRING(1),
          allowNull: false,
          defaultValue: '0'
      },
      userName: {
          type: DataTypes.STRING(45),
          allowNull: false,
          defaultValue: false
      }
    },
  );

Chat.belongsTo(User, {foreignKey: 'userID'});

const INCLUDE_USER = {
  attributes: [
    'chatID',
    'text',
    'userID',
    'chatTime',
    'isDelete',
    'createdAt',
    'updatedAt',
    [Sequelize.col('user.id'), 'id'],
    [Sequelize.col('user.url'), 'url'],
    [Sequelize.col('user.userName'), 'userName'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = {
  order: [['createdAt', 'ASC']],
};
//! ========================== CRUD START==========================//

//새로운 chat 만들기
export async function createChat(chatData){
    const {text, userID, userName} = chatData;

    return Chat.create({ text, userID, userName }).then((data) => data.dataValues);
}

// delete chat
export async function deleteChat(chatID){
    return Chat.findByPk(chatID)
               .then((chat) => {
                  chat.isDelete = 1; 
                  return chat.save();
                });
}


//! ========================== CRUD END==========================//
// 모든 채팅 가져오기
export async function getAllChat(){
  return Chat.findAll({ 
    where: {isDelete : '0'},
    ...INCLUDE_USER,
    ...ORDER_DESC,
  });
}

// 나의 채팅 가져오기
export async function getMyChat(userID) {
  return Chat.findAll({ where: {userID}})
}

// chatId로 찾아오기
export async function getById(chatID){
  return Chat.findByPk(chatID);
}

// profile에서 userName 변경 시 chat에 있는 userName 변경
// When user changes userName in profile, userName in chat is changed.
export async function updateUserName(userID, userName){
  return Chat.findAll({ where: {userID}})
             .then((chats) => {
                chats.map((chat) => {
                  chat.userName = userName;
                  chat.save();
                });
             });
}