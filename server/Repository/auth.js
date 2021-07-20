import SQ from 'sequelize';
import { sequelize } from '../database/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.STRING(8),
        allowNull: false,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      pw: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      url: DataTypes.TEXT,
    },
    { timestamps: false }
  );

//! ========================== CRUD START==========================//

// 로그인
export async function signIn(id){
    const user = findById(id);

    return user;
}

//새로운 user 만들기
export async function createUser(userData){
    return User.create(userData).then((data) => data.dataValues.id);
}


// 회원 정보 수정
export async function updateUser(updateData) {
    return User.findByPk(updateData.id)
               .then((user) => {
                   user.userName = updateData.userName;
                   user.email = updateData.email;
                   user.url = updateData.url;
                   return user.save();
               });
}

// 회원 탈퇴
export async function deleteUser(id){
    return User.findByPk(id)
               .then((user) => {
                   user.destroy();
               })
}

//! ========================== CRUD END==========================//


// id로 데이터 찾기
export async function findById(id){
    return User.findOne({ where: {id}});
}

// 모든 유저 정보 가져오기
export async function getAllUser(){
    return User.findAll();
}