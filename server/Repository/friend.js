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
    console.log(`repository: ${friendData}`);
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