import React, { memo, useState } from 'react';

const Search = memo(({setFriends, friendService, userID}) => {
    const [searchF, setSearchF] = useState([]);
    const saerchFriends = (e) => {
        friendService
            .getAllFriends(userID)
            .then((data) => setSearchF(data));
        if(e.target.value === ''){
            setFriends(searchF);
            console.log(searchF)
        }else{
            const searchFriend = searchF.filter((data) => 
                data.userName.indexOf(e.target.value) > -1
            ) ;
            setFriends(searchFriend);
        }
    }

    return (
        <div className='search'>
            <input type='text' onChange={saerchFriends} autoFocus></input>
        </div>
    )
});

export default Search;