import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FriendCard from '../components/Friend';
import {RiUserSearchLine, RiUserAddLine} from 'react-icons/ri';

import Search from '../components/Search';

const Friends = memo(({authService, userID}) => {  
    const [friends, setFriends] = useState([]);
    const [me, setMe] = useState({});
    const [findFriends, setFindFriends] = useState(false);
    const history = useHistory();

    useEffect(() => {
        authService
            .getAllUsers()
            .then((data) => {
                setFriends(data.filter((d) => d.id !== userID));
            });
        authService
            .findById(userID)
            .then((data) => {
                setMe(data)
            });
    }, [authService, userID]);

    const emptyUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UfTSQN07wL1KUUzw5B0FpM1oLUl1kVHEmEvm1BbAJBkpDIdd3SXol0WQtnlG11fkKXU&usqp=CAU';

    const clickMe = () => {
        history.push('/profile');
    }

    const clickFindFriends = () => {
        setFindFriends(!findFriends);
    }

    return (
        <>
            <div className='friend-title-wrap'>
                <div className='friend-title'>
                    Friends
                </div>
                <button className='friendsIcon' onClick={clickFindFriends}>
                    <RiUserSearchLine  size="25"/>
                </button>
                <button className='friendsIcon'>
                    <RiUserAddLine  size="25"/>
                </button>
            </div>
            {
                findFriends && <Search setFriends={setFriends} authService = {authService} userID={userID}/>
            }
            <ul className='freindList'>
                <li onClick={clickMe}>
                        <section className='friend-container-me'>
                            <div className='friend-img-wrap'>
                                <img className='friend-img' src={me.url ? me.url : emptyUrl} alt='freind img'/>
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
                                {
                                    userID !== data.id && 
                                    <FriendCard user={data}/>
                                }
                            </>
                    )
                })}
            </ul>
        </>
    )
})

export default Friends;