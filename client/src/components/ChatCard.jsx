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

    const isLink = (text) => {
        return text.indexOf('http') > -1 ? true : false;
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
                            {
                                isLink(text) ? <a href={text} target="_blank" rel="noreferrer"><div>{text}</div></a> : <div>{text}</div>
                            }
                        </div>
                        <div className='chat-time-my'>
                            {parseDate(createdAt)}
                        </div>
                    </section>
                    ) : (
                    <section className='chat-container'>
                        <Avatar url={url} userName={userName} userID={userID}/>
                        <div className='chat-body'>
                            {
                                isLink(text) ? <a href={text} target="_blank" rel="noreferrer"><div>{text}</div></a> : <div>{text}</div>
                            }
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