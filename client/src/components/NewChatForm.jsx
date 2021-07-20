import React, {useState} from 'react';


const NewChatForm = ({chatService, onError, userID, userName}) => {
    const [chat, setChat] = useState('');

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
