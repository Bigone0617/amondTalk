import { Switch, Route, useHistory} from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './context/AuthConterxt';

import AllChat from './pages/AllChat';
// import MyChat from './pages/MyChat';
import Profile from './pages/profile';

function App({authService, chatService}) {
  const history = useHistory();
  const {user, logout} = useAuth();

  const onAllChats = () => {
    history.push('/');
  };

  // const onMyChats = () => {
  //   history.push(`/myChats`);
  // }

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
        onAllChats = {onAllChats}
        // onMyChats = {onMyChats}
        onProfile = {onProfile}
      />
      <Switch>
        (
          <>
            <Route exact path='/'>
              <AllChat authService={authService} chatService={chatService}/>
            </Route>
            {/* <Route exact path='/myChats'>
              <MyChat chatService={chatService}/>
            </Route> */}
            <Route exact path='/profile'>
              <Profile authService={authService} chatService={chatService} id={user.id}/>
            </Route>
          </>
        )
      </Switch>
    </div>
  );
}

export default App;
