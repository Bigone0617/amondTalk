import React, { memo } from 'react';

const Avatar = memo(({url, userName}) => {
    const emptyUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UfTSQN07wL1KUUzw5B0FpM1oLUl1kVHEmEvm1BbAJBkpDIdd3SXol0WQtnlG11fkKXU&usqp=CAU';
    return(
    <div className='avatar-warp'>
        {!!url ? (
            <img src={url} alt='avatar' className='avatar-img'/>
        ) : (
            <img src={emptyUrl} alt='avatar' className='avatar-img'/>
        )}
        {userName}
    </div>)
});

export default Avatar;