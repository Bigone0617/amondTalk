import React, { memo, useEffect, useState } from 'react';
import {RiUserSearchLine} from 'react-icons/ri';

import ChatRoom from '../components/ChatRoom';

const ChatRooms = memo(({userID, authService, chatService, friendService}) => {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        friendService
            .getAllFriends(userID)
            .then((friends) => setChatRooms(friends.filter((friend) => friend.roomID !== null)));
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
                            <ChatRoom authService={authService} chatService={chatService} friendID={chatRoom.friendID} roomID={chatRoom.roomID}/>
                        )
                    })
                }
            </ul>
        </>
    )
});

export default ChatRooms;