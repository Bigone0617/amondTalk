import React from 'react';
import Chats from '../components/Chats';

const ChatPage = ({authService, chatService}) => {
    return <Chats authService={authService} chatService={chatService} />
};

export default ChatPage;