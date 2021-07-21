import React, { memo } from 'react';
import { useHistory} from 'react-router-dom';

const Avatar = memo(({url, userName, userID}) => {
    const emptyUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UfTSQN07wL1KUUzw5B0FpM1oLUl1kVHEmEvm1BbAJBkpDIdd3SXol0WQtnlG11fkKXU&usqp=CAU';
    const history = useHistory();
    const clickImg = () => {
        history.push({
            pathname: `/Detail/${userID}`,
            state: {userID: userID}
        });
    }

    return(
    <div className='avatar-warp'>
        {!!url ? (
            <img src={url} alt='avatar' className='avatar-img' onClick={clickImg}/>
        ) : (
            <img src={emptyUrl} alt='avatar' className='avatar-img' onClick={clickImg}/>
        )}
        {userName}
    </div>)
});

export default Avatar;