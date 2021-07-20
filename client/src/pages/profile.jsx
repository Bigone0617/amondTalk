import React, {memo, useState} from 'react';

import { useAuth } from '../context/AuthConterxt';

const Profile = memo(({authService, chatService, id}) => {
    const {user} = useAuth();
    const [userName, setUserName] = useState(user.userName);
    const [email, setEmail] = useState(user.email);
    const [url, setUrl] = useState(user.url);
    const onSubmit = (event) => {
        event.preventDefault();

        authService.updateUser(id, userName, email, url)
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

        switch (name) {
            case 'userName':
                return setUserName(value);
            case 'email':
                return setEmail(value);
            case 'url':
                return setUrl(value);
            default:
        }
    }

    return (
        <>
            <form className='auth-form' onSubmit={onSubmit}>
                <div>
                    ID : 
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
                    Name : 
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
                    EMAIL : 
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
                    ImgUrl : 
                    <input
                        name='url'
                        type='url'
                        placeholder='Profile Image URL'
                        value={url}
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