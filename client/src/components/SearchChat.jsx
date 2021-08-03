import React, { memo, useState } from 'react';

const SearchChat = memo(({setChatRooms, friendService, userID}) => {
    const [searchC, setSearchC] = useState([]);
    const searchChats = (e) => {
        friendService
            .getAllChatRooms(userID)
            .then((friends) => {
                setSearchC(friends)
            });
        // 빈칸 검색
        if(e.target.value === ''){
            setChatRooms(searchC);
        }else{
            const searchChat = searchC.filter((data) => {
                return data.userName.indexOf(e.target.value) > -1
                }
            );
            setChatRooms(searchChat);
        }
    }

    return (
        <div className='findChats-wrap'>
            <input className='findChats' type='text' onChange={searchChats} autoFocus></input>
        </div>
    )
});

export default SearchChat;