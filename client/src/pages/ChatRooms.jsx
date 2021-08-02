import React, { memo, useEffect, useState } from 'react';
import {RiUserSearchLine} from 'react-icons/ri';

import ChatRoom from '../components/ChatRoom';

const ChatRooms = memo(({userID, friendService}) => {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        friendService
            .getAllChatRooms(userID)
            .then((friends) => {
                console.log(friends)
                setChatRooms(friends)
            });
    },[friendService, userID]);

    return (
        <>
            <div className='chatRooms-title-wrap'>
                <div className='chatRooms-title'>
                    채팅
                </div>
                <button className='chatRoomsIcon'>
                    <RiUserSearchLine  size="25"/>
                </button>
            </div>
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