import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import parseDate from '../util/date';

const ChatRoom = memo(({authService, chatService, friendID, roomID}) => {
    const [friend, setFriend] = useState({});
    const [lastChat, setLastChat] = useState({});
    const emptyUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UfTSQN07wL1KUUzw5B0FpM1oLUl1kVHEmEvm1BbAJBkpDIdd3SXol0WQtnlG11fkKXU&usqp=CAU';
    const history = useHistory();

    const clickChatRoom = () => {
        history.push({
            pathname : `/chat/${roomID}`,
            state: {roomID: roomID}
        });
    }

    useEffect(() => {
        authService
            .findById(friendID)
            .then((data) => {
                setFriend(data);
            })
            .then(() => {
                chatService
                    .getLastChat(roomID)
                    .then((data) => {
                        setLastChat(data);
                    });
            });

        
    }, [authService, friendID, chatService, roomID]);

    return (
        <li onClick={clickChatRoom}>
            <section className='chatRoom-container'>
                <div className='chatRoom-img-wrap'>
                    <img className='chatRoom-img' src={friend.url ? friend.url : emptyUrl} alt='chatRoom img'/>
                </div>
                <div className='chatRoom-name-wrap'>
                    <div className='chatRoom-name'>
                        <h5>{friend.userName}</h5>
                    </div>
                    <div className='chatRoom-text'>
                        {lastChat.text}
                    </div>
                </div>
                <div className='chatRoom-time'>
                    {parseDate(lastChat.time)}
                </div>
            </section>
        </li>
    )
});

export default ChatRoom;
