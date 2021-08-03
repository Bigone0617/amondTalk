import React, {useLayoutEffect, useRef, useState} from 'react';


const NewChatForm = ({chatService, onError, userID, userName, roomID}) => {
    const [chat, setChat] = useState('');
    const inputRef = useRef();

    // chat scroll focus move to bottom
    useLayoutEffect(() => {
        const chatScroll = document.getElementsByClassName('chats');
        chatScroll[0].scrollTop = chatScroll[0].scrollHeight;
    })

    const onSubmit = async (event) => {
        event.preventDefault();

        if(chat.trim() !== ''){
            chatService
                .postChat(chat, userID, userName, roomID)
                .then(() => {
                    setChat('')
                    inputRef.current.blur();
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
                refs={inputRef}
            />
            <button type='submit' className='form-btn'>🥜</button>
        </form>
    )
}

export default NewChatForm;
