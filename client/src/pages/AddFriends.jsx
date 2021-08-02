import React, { memo, useEffect, useState } from 'react';
import {BsSearch} from 'react-icons/bs'
import {IoCloseCircleSharp} from 'react-icons/io5'

const AddFriends = memo(({userID, authService, friendService}) => {
    // 검색한 값
    const [searchFriend, setSearchFriend] = useState('');
    // 검색해서 api로 받아온 값
    const [findFriend, setFindFriend] = useState({});
    // 검색했는지 값
    const [searched, setSearched] = useState(false);
    // 친구 추가가 되었는지 확인
    const [isFriend, setIsFriend] = useState(false);

    const emptyUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UfTSQN07wL1KUUzw5B0FpM1oLUl1kVHEmEvm1BbAJBkpDIdd3SXol0WQtnlG11fkKXU&usqp=CAU';

    useEffect(() => {
        if(findFriend){
            friendService
                .findById({userID, friendID: findFriend.id})
                .then((data) => {
                    if(data){
                        setIsFriend(true);
                    }else{
                        setIsFriend(false);
                    }
                });
        }
    },[friendService, userID, findFriend])

    const onSubmit = async (event) => {
        event.preventDefault();
        authService
            .findById(searchFriend)
            .then((data) => {
                setFindFriend(data);
                setSearched(true);
            });

        
    }

    const onChange = (event) => {
        setSearchFriend(event.target.value);
        if(event.target.value === ''){
            setSearched(false);
        }
    }

    const clearSearch = () => {
        setSearchFriend('');
        setSearched(false);
    }

    const addFriend = () => {
        friendService
            .addFriend({userID, friendID: findFriend.id})
            .then(() => {
                alert(`Add friend success`)
            });
    }

    const enterControl = (e) => {
        if(e.key === 'Enter'){
            onSubmit(e)
        }
    }

    return (
        <div className='addFriend-wrap'>
            <h3>아몬드톡 ID로 추가</h3>
            <form className='searchID' onSubmit={onSubmit}>
                <input
                    type='text'
                    autoFocus
                    className='addFriend-input'
                    onChange={onChange}
                    value={searchFriend}
                    onKeyPress={enterControl}
                    placeholder='친구 아몬드톡 ID'
                    maxlength='8'
                />
                {
                    searchFriend && 
                    <button className='searchFriend-clear' onClick={clearSearch}>
                        <IoCloseCircleSharp size='20'/>
                    </button>
                }
                <button type='submit' className='searchFriend-btn' onClick={onSubmit}>
                    <BsSearch size='20'/>
                </button>
            </form>
            {

                searched && (findFriend !== null ? (
                    <div className='searchFriend-wrap'>
                        <img src={findFriend.url ? findFriend.url : emptyUrl} alt='friend img'/>
                        <div className='searchFriend-userName'>
                            {findFriend.userName}
                        </div>
                        {
                            userID !== findFriend.id ? (
                                isFriend ? (
                                    <button className='addFriend-btn'>
                                        대화하기
                                    </button>
                                ) : (
                                    <button className='addFriend-btn' onClick={addFriend}>
                                        친구 추가
                                    </button>
                                )
                            ):(
                                <></>
                            )
                        }   
                    </div>
                ) : (
                    <div className='searchFriend-wrap'>
                        <div className='searchFriend-none'>
                            검색 결과가 없습니다.
                        </div>
                    </div>
                ))
            }
        </div>
    )
});

export default AddFriends;