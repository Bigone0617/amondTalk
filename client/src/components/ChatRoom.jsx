import React, { memo} from 'react';
import { useHistory } from 'react-router-dom';

import parseDate from '../util/date';

const ChatRoom = memo(({chatRoomData}) => {
    const {url, userName, text, roomID, createdAt} = chatRoomData;
    const emptyUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UfTSQN07wL1KUUzw5B0FpM1oLUl1kVHEmEvm1BbAJBkpDIdd3SXol0WQtnlG11fkKXU&usqp=CAU';
    const history = useHistory();

    const clickChatRoom = () => {
        history.push({
            pathname : `/chat/${roomID}`,
            state: {roomID: roomID}
        });
    }

    return (
        <li onClick={clickChatRoom}>
            <section className='chatRoom-container'>
                <div className='chatRoom-img-wrap'>
                    <img className='chatRoom-img' src={url ? url : emptyUrl} alt='chatRoom img'/>
                </div>
                <div className='chatRoom-name-wrap'>
                    <div className='chatRoom-name'>
                        <h5>{userName}</h5>
                    </div>
                    <div className='chatRoom-text'>
                        {text}
                    </div>
                </div>
                <div className='chatRoom-time'>
                    {parseDate(createdAt)}
                </div>
            </section>
        </li>
    )
});

export default ChatRoom;
