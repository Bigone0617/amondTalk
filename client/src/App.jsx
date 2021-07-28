import { Switch, Route, useHistory} from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './context/AuthConterxt';

import ChatPage from './pages/ChatPage';
// import MyChat from './pages/MyChat';
import Profile from './pages/profile';
import Detail from './pages/Detail';
import Friends from './pages/Friends';
import AddFriends from './pages/AddFriends';
import ChatRooms from './pages/ChatRooms';

function App({authService, chatService, friendService}) {
  const history = useHistory();
  const {user, logout} = useAuth();

  const onAllChats = () => {
    history.push('/chats');
  };

  const onFriend = () => {
    history.push(`/`);
  }

  const onLogout = () => {
    if(window.confirm('Do you want to log out?')){
      console.log('logout!');
      logout();
      history.push('/');
    }
  }

  const onProfile = () => {
    history.push('/profile');
  }
  return (
    <div className="app">
      <Header
        id = {user.id}
        userName = {user.userName}
        onLogout = {onLogout}
        onFriend = {onFriend}
        onAllChats = {onAllChats}
        onProfile = {onProfile}
      />
      <Switch>
        (
          <>
            <Route exact path='/'>
              <Friends authService={authService} userID={user.id} friendService={friendService}/>
            </Route>
            <Route exact path='/chats'>
              <ChatRooms 
                userID={user.id} 
                authService={authService} 
                chatService={chatService} 
                friendService={friendService}
              />
            </Route>
            <Route exact path='/chat/:fID'>
              <ChatPage 
                authService={authService} 
                chatService={chatService} 
              />
            </Route>
            <Route exact path='/profile'>
              <Profile authService={authService} chatService={chatService} id={user.id}/>
            </Route>
            <Route exact path='/Detail/:userID'>
              <Detail 
                userID={user.id}
                authService={authService} 
                friendService={friendService}
              />
            </Route>
            <Route exact path='/AddFriends'>
              <AddFriends userID={user.id} authService={authService} friendService={friendService}/>
            </Route>
          </>
        )
      </Switch>
    </div>
  );
}

export default App;
