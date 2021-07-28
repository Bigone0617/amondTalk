import React, { memo, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Detail = memo(({userID, authService, friendService}) => {
    const location = useLocation();
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        authService
            .findById(location.state.userID)
            .then((data)=> {
                setUser(data)
            });
    },[authService, location.state.userID]);

    const chatStart = () => {
        // 새로운 챗 만들면서 페이지 이동
        friendService
            .createChatRoom(userID, user.id)
            .then((data) => {
                history.push({
                    pathname: `/chat/${data}`,
                    state: {roomID: data}
                })
            });
    }

    return (
        <>
            <div className='detailImg-wrap'>
                <img className='detailImg' src={user.url ? user.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UfTSQN07wL1KUUzw5B0FpM1oLUl1kVHEmEvm1BbAJBkpDIdd3SXol0WQtnlG11fkKXU&usqp=CAU'} alt='profile img'/>
            </div>
            <div className='detail-wrap'>
                <div className='detail-title'>
                    이름
                </div>
                <div className='detail-value'>
                    {user.userName}
                </div>
            </div>
            <div className='detail-wrap'>
                <div className='detail-title'>
                    Email
                </div>
                <div className='detail-value'>
                    {user.email}
                </div>
            </div>
            <div className='detail-wrap'>
                <div className='detail-title'>
                    상태메세지
                </div>
                <div className='detail-value'>
                    {user.stmsg}
                </div>
            </div>
            <div className='detail-chatBtn-wrap'>
                <button className='detail-chatBtn' onClick={chatStart}>
                    채팅하기
                </button>
            </div>
        </>
    )
});

export default Detail;