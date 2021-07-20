import React, {useLayoutEffect, useState} from 'react';


const NewChatForm = ({chatService, onError, userID, userName}) => {
    const [chat, setChat] = useState('');

    // chat scroll focus move to bottom
    useLayoutEffect(() => {
        const chatScroll = document.getElementsByClassName('chats');
        chatScroll[0].scrollTop = chatScroll[0].scrollHeight;
    })

    const onSubmit = async (event) => {
        event.preventDefault();

        if(chat.trim() !== ''){
            chatService
                .postChat(chat, userID, userName)
                .then(() => {
                    setChat('')
                })
                .catch(onError);
        }
    }

    const onChange = (evnet) => {
        setChat(evnet.target.value);
    }

    return (
        <form className='chat-form' onSubmit={onSubmit}>
            <input
                type='text'
                value={chat}
                autoFocus
                onChange={onChange}
                className='form-input chat-input'
            />
            <button type='submit' className='form-btn'>🎈</button>
        </form>
    )
}

export default NewChatForm;
