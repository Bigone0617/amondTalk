import React, { memo, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthConterxt';
import ChatCard from './ChatCard';
import NewChatForm from './NewChatForm';

const Chats = memo(({authService, chatService}) => {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState('');
    const {user} = useAuth();

    useEffect(() => {
        chatService
            .getAllChats()
            .then((chats) => setChats([...chats['chats']]))
            .catch(onError);

        const stopSync = chatService.onSync((chat) => onCreated(chat));
        return () => stopSync();
    }, [chatService]);

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

    return (
        <>
            {error && <h1>{error}</h1>}
            <ul className='chats'>
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
            <NewChatForm chatService={chatService} onError={onError} userID ={user.id} userName={user.userName}/>
        </>
    )
});

export default Chats;