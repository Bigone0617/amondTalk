import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Detail = memo(({authService}) => {
    const location = useLocation();
    const [user, setUser] = useState({});
    useEffect(() => {
        authService
            .findById(location.state.userID)
            .then((data)=> {
                console.log(data);
                setUser(data)
            });
    },[authService, location.state.userID])

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
        </>
    )
});

export default Detail;