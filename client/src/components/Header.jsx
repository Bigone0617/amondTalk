import React, {memo} from 'react';

const Header = memo(({id, userName, onLogout, onAllChats, onProfile}) => {
    return (
        <header className='header'>
            <div className='logo'>
                <img src='./img/logo.jpg' alt='Simple Chat Logo' className='logo-img' />
                <h1 className='logo-name'>Amond Talk</h1>
            </div>
            {userName && (
                <nav className='menu'>
                    <button onClick={onAllChats}>All Chats</button>
                    <button onClick={onProfile}>Profile</button>
                    <button className='menu-item' onClick={onLogout}>Logout</button>
                </nav>
            )}
        </header>
    )
});

export default Header;