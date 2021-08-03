import React, {memo} from 'react';
import {VscAccount} from 'react-icons/vsc';
import {BsChat} from 'react-icons/bs';
import {FaUserFriends} from 'react-icons/fa';
import {IoLogOutOutline} from 'react-icons/io5'

const Header = memo(({id, userName, onLogout, onFriend, onAllChats, onProfile}) => {
    return (
        <header className='header'>
            <div className='logo'>
                <img src='./img/logo.jpg' alt='Simple Chat Logo' className='logo-img' />
                <h1 className='logo-name'>아몬드톡</h1>
            </div>
            {userName && (
                <div className='menu'>
                    <nav>
                        <button onClick={onFriend}><FaUserFriends size="20"/></button>
                        <button onClick={onAllChats}><BsChat size="20"/></button>
                        <button onClick={onProfile}><VscAccount size="20"/></button>
                        <button onClick={onLogout}><IoLogOutOutline size="20"/></button>
                    </nav>
                </div>
                
            )}
        </header>
    )
});

export default Header;