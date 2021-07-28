import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FriendCard from '../components/Friend';
import {RiUserSearchLine, RiUserAddLine} from 'react-icons/ri';

import Search from '../components/Search';

const Friends = memo(({authService, userID, friendService}) => {  
    const [friends, setFriends] = useState([]);
    const [me, setMe] = useState({});
    const [findFriends, setFindFriends] = useState(false);
    const history = useHistory();

    useEffect(() => {
        friendService
            .getAllFriends(userID)
            .then((data) => {
                console.log(data);
                setFriends(data);
            });
        authService
            .findById(userID)
            .then((data) => {
                console.log(data);
                setMe(data)
            });
    }, [friendService, authService, userID]);

    const emptyUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UfTSQN07wL1KUUzw5B0FpM1oLUl1kVHEmEvm1BbAJBkpDIdd3SXol0WQtnlG11fkKXU&usqp=CAU';

    const clickMe = () => {
        history.push('/profile');
    }

    const clickFindFriends = () => {
        setFindFriends(!findFriends);
    }

    const clickAddFriends = () => {
        history.push('/AddFriends');
    }

    return (
        <>
            <div className='friend-title-wrap'>
                <div className='friend-title'>
                    친구
                </div>
                <button className='friendsIcon' onClick={clickFindFriends}>
                    <RiUserSearchLine  size="25"/>
                </button>
                <button className='friendsIcon' onClick={clickAddFriends}>
                    <RiUserAddLine  size="25"/>
                </button>
            </div>
            {
                findFriends && <Search setFriends={setFriends} friendService = {friendService} userID={userID}/>
            }
            <ul className='freindList'>
                <li onClick={clickMe} key={me.id}>
                        <section className='friend-container-me'>
                            <div className='friend-img-wrap'>
                                <img className='friend-img' src={me.url ? me.url : emptyUrl} alt='freind img'/>
                            </div>
                            <div className='friend-stmsg'>
                                {me.stmsg}
                            </div>
                            <div className='friend-name'>
                                <h5>{me.userName}</h5>
                            </div>
                            
                        </section>
                </li>
                <div className='friendTitle'>
                    친구 {friends.length}
                </div>
                {friends.map((data) => {
                    return (
                            <>
                                <FriendCard user={data}/>
                            </>
                    )
                })}
            </ul>
        </>
    )
})

export default Friends;