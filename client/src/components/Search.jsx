import React, { memo, useState } from 'react';

const Search = memo(({setFriends, authService, userID}) => {
    const [searchF, setSearchF] = useState([]);
    const saerchFriends = (e) => {
        authService
            .getAllUsers()
            .then((data) => setSearchF(data.filter(d => d.id !== userID)));
        if(e.target.value === ''){
            setFriends(searchF);
            console.log(searchF)
        }else{
            const test = searchF.filter((data) => 
                data.userName.indexOf(e.target.value) > -1
            ) ;
            setFriends(test);
        }
    }

    return (
        <div className='search'>
            <input type='text' onChange={saerchFriends}></input>
        </div>
    )
});

export default Search;