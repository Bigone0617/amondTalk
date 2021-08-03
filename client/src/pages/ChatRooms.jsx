import React, { memo, useEffect, useState } from 'react';
import {RiUserSearchLine} from 'react-icons/ri';

import SearchChat from '../components/SearchChat';
import ChatRoom from '../components/ChatRoom';

const ChatRooms = memo(({userID, friendService}) => {
    const [chatRooms, setChatRooms] = useState([]);
    const [findChats, setFindChats] = useState(false);


    useEffect(() => {
        friendService
            .getAllChatRooms(userID)
            .then((friends) => {
                console.log(friends)
                setChatRooms(friends)
            });
    },[friendService, userID]);

    const findChatsClick = (e) => {
        setFindChats(!findChats);
    }

    return (
        <>
            <div className='chatRooms-title-wrap'>
                <div className='chatRooms-title'>
                    채팅
                </div>
                <div className='chatRooms-icon-wrap'>
                    <button className='chatRoomsIcon' onClick={findChatsClick}>
                        <RiUserSearchLine  size="25"/>
                    </button>
                </div> 
            </div>
            { findChats && <SearchChat setChatRooms={setChatRooms} friendService={friendService} userID={userID}/> }
            <ul className='chatRoomsList'>
                {
                    chatRooms.map((chatRoom) => {
                        return (
                            <ChatRoom chatRoomData={chatRoom}/>
                        )
                    })
                }
            </ul>
        </>
    )
});

export default ChatRooms;