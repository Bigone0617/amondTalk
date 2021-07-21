import React, { memo, useState } from 'react';
import parseDate from '../util/date';

import Avatar from './Avatar';

const ChatCard = memo(({chat, owner, user, chatService}) => {
    const {text, createdAt, chatID, userName, url, userID} = chat;
    const [rightClick, setRightClick] = useState(false);

    const onRightClick = (e) => {
        e.preventDefault();
        setRightClick(!rightClick);
    }

    const clickDeleteBtn = (e) => {
        e.preventDefault();
        chatService
            .deleteChat(e.target.id)
            .then(() => window.location.reload());
    }

    return (
        <li className='chat'>
                {owner ? (
                    <section className='chat-container-my'>
                       {rightClick ?   
                                    (<div className='deleteBtn'>
                                        <button onClick={clickDeleteBtn} id={chatID}>❌</button>
                                    </div>) : <></>} 
                        <div className='chat-body-my' onContextMenu={onRightClick}>
                            <text>{text}</text>
                        </div>
                        <div className='chat-time-my'>
                            {parseDate(createdAt)}
                        </div>
                    </section>
                    ) : (
                    <section className='chat-container'>
                        <Avatar url={url} userName={userName} userID={userID}/>
                        <div className='chat-body'>
                            <text>{text}</text>
                        </div>
                        <div className='chat-time'>
                            {parseDate(createdAt)}
                        </div>
                    </section>
                    )}
        </li>
    )
});

export default ChatCard;