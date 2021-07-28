import React, { memo } from 'react';
import { useHistory} from 'react-router-dom';

const FriendCard = memo(({user}) => {
    const history = useHistory();
    const emptyUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UfTSQN07wL1KUUzw5B0FpM1oLUl1kVHEmEvm1BbAJBkpDIdd3SXol0WQtnlG11fkKXU&usqp=CAU';
    const clickUser = () => {
        history.push({
            pathname: `/Detail/${user.id}`,
            state: {userID: user.id}
        });
    } 
    return (
        <li onClick={clickUser} key={user.id}>
            <section className='friend-container'>
                <div className='friend-img-wrap'>
                    <img className='friend-img' src={user.url ? user.url : emptyUrl} alt='freind img'/>
                </div>
                <div className='friend-name'>
                    <h5>{user.userName}</h5>
                </div>
                {
                    user.stmsg &&  <div className='friend-stmsg'> {user.stmsg} </div>
                }
               
            </section>
        </li>
    )
});

export default FriendCard;