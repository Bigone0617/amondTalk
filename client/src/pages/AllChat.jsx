import React from 'react';
import Chats from '../components/Chats';

const AllChat = ({authService, chatService}) => {
    return <Chats authService={authService} chatService={chatService} />
};

export default AllChat;