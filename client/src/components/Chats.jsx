import React, { memo, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthConterxt';
import ChatCard from './ChatCard';
import NewChatForm from './NewChatForm';
import {IoMdArrowRoundBack} from 'react-icons/io';

const Chats = memo(({authService, chatService}) => {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState('');
    const {user} = useAuth();
    const history = useHistory();
    const location = useLocation();
    const roomID = location.state.roomID;

    useEffect(() => {
        chatService
            .getAllChats(roomID)
            .then((chats) => setChats([...chats['chats']]))
            .catch(onError);

        const stopSync = chatService.onSync((chat) => onCreated(chat));
        return () => stopSync();
    }, [chatService, roomID]);

    const onCreated = (chat) => {
        setChats((chats) => [...chats, chat]);

        // scroll move to bottom
        const chatScroll = document.getElementsByClassName('chats');
        chatScroll[0].scrollTop = chatScroll[0].scrollHeight;
    }


    const onError = (error) => {
        setError(error.toString());
        setTimeout(() => {
            setError('');
        }, 3000);
    };

    const onRightClick = (e) => {
        e.preventDefault();
    };

    const chatClose = (e) => {
        if(window.confirm('채팅방을 나가시겠습니까?')){
            chatService
                .closeChatRoom(roomID)
                .then(() => {
                    history.push('/chats');
                });
        }
    }

     const backChatList = () => {
         history.push('/chats')
     }
    
    return (
        <>
            {error && <h1>{error}</h1>}
            <div className='chatTop-wrap'>
                <div className='chatBack-wrap'>
                    <button className='chatBack' onClick={backChatList}>
                        <IoMdArrowRoundBack size='20'/>
                    </button>
                </div>
                <div className='chatClose-wrap'>
                    <button className='chatClose' onClick={chatClose}>채팅 나가기</button>
                </div>
            </div>
            <ul className='chats' onContextMenu={onRightClick}>
                {chats.map((chat) => {
                    return (
                    <ChatCard
                        key={chat.chatID}
                        chat={chat}
                        owner={chat.userID === user.id}
                        user= {user}
                        chatService= {chatService}
                    />
                )})}
            </ul>
            <NewChatForm chatService={chatService} onError={onError} userID ={user.id} userName={user.userName} roomID={roomID}/>
        </>
    )
});

export default Chats;