import React, {memo, useEffect, useState} from 'react';

import { useAuth } from '../context/AuthConterxt';

const Profile = memo(({authService, chatService, id}) => {
    const {user} = useAuth();
    const [userName, setUserName] = useState(user.userName);
    const [email, setEmail] = useState(user.email);
    const [url, setUrl] = useState(user.url);
    const [stmsg, setStmsg] = useState(user.stmsg);

    useEffect(() => {
        authService
            .me()
            .then((user) => {
                setUserName(user.userName);
                setEmail(user.email);
                setUrl(user.url);
                setStmsg(user.stmsg);
            });
    },[authService]);

    const onSubmit = (event) => {
        event.preventDefault();

        authService.updateUser(id, userName, email, url, stmsg)
                   .then((data) => alert('Update complite'));

        // user 이름이 바뀌면 그와 연결된 채팅의 uesr이름들도 업데이트
        if(user.userName !== userName){
            chatService
                .updateUserName(id, userName)
                .then((data) => console.log('update userName'));
        }
    }

    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;

        if(name === 'url'){
            if(value.length > 257){
                alert('url 주소의 길이는 256자 이내로 설정해주세요 :)');
                return false;
            }
        }

        switch (name) {
            case 'userName':
                return setUserName(value);
            case 'email':
                return setEmail(value);
            case 'url':
                return setUrl(value);
            case 'stmsg':
                return setStmsg(value);
            default:
        }
    }
    return (
        <>
            <div className='profileImg-wrap'>
                <img className='profileImg' src={url ? url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UfTSQN07wL1KUUzw5B0FpM1oLUl1kVHEmEvm1BbAJBkpDIdd3SXol0WQtnlG11fkKXU&usqp=CAU'} alt='profile img'/>
            </div>
            <form className='auth-form' onSubmit={onSubmit}>
                <div>
                    <input
                        name='id'
                        type='text'
                        placeholder='Id'
                        value={id}
                        className='form-input'
                        readOnly={true}
                    />
                </div>

                <div>
                    <input
                        name='userName'
                        type='text'
                        placeholder='Name'
                        value={userName}
                        onChange={onChange}
                        className='form-input'
                        required
                    />
                </div>
                <div>
                    <input
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={onChange}
                        className='form-input'
                        required
                    />
                </div>
                <div>
                    <input
                        name='url'
                        type='url'
                        placeholder='Profile Image URL'
                        value={url}
                        onChange={onChange}
                        className='form-input'
                    />
                </div>
                <div>
                    <input
                        name='stmsg'
                        type='text'
                        placeholder='StatusMessage'
                        value={stmsg}
                        onChange={onChange}
                        className='form-input'
                    />
                </div>
                <button className='form-btn auth-form-btn' type='submit'>
                    Update
                </button>
            </form>
        </>
    )
})

export default Profile;