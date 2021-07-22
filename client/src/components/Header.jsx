import React, {memo} from 'react';
import {VscAccount, VscChromeClose} from 'react-icons/vsc';
import {BsChat} from 'react-icons/bs';

const Header = memo(({id, userName, onLogout, onAllChats, onProfile}) => {
    return (
        <header className='header'>
            <div className='logo'>
                <img src='./img/logo.jpg' alt='Simple Chat Logo' className='logo-img' />
                <h1 className='logo-name'>Amond Talk</h1>
            </div>
            {userName && (
                <nav className='menu'>
                    <button onClick={onAllChats}><BsChat size="20"/></button>
                    <button onClick={onProfile}><VscAccount size="20"/></button>
                    <button className='menu-item' onClick={onLogout}><VscChromeClose size="20"/></button>
                </nav>
            )}
        </header>
    )
});

export default Header;