import {
    createContext, useCallback, useMemo, useState,useImperativeHandle, createRef, useEffect, useContext
  } from 'react';
import Login from '../pages/login';

const AuthContext = createContext({});

const contextRef = createRef();

export function AuthProvider({authService, authErrorEventBus, children}){
    const [user, setUser] = useState(undefined);

    useImperativeHandle(contextRef, () => (user ? user.token : undefined));

    useEffect(() => {
        authErrorEventBus.listen((err) => {
        console.log(err);
        setUser(undefined);
        });
    }, [authErrorEventBus]);

    useEffect(() => {
        authService.me().then(setUser).catch(console.error);
    }, [authService]);


    const signUp = useCallback(
        async(id, pw, userName, email, url) => {
            authService
                .signup(id, pw, userName, email, url)
                .then((user) => setUser(user));
        }, [authService]
    )

    const logIn = useCallback(
        async(id, pw) => 
            authService.login(id, pw).then((user) => {console.log(user); setUser(user)}),
        [authService]
    )

    const logout = useCallback(
        async () => authService.logout().then(() => setUser(undefined)),
        [authService]
    );

    const context = useMemo(
        () => ({
            user,
            signUp,
            logIn,
            logout
        }), [user, signUp, logIn, logout]
    );

    return(
        <AuthContext.Provider value={context}>
            { user ? (
                children
            ) : (
                <div>
                    <Login signUp={signUp} logIn={logIn}/>
                </div>
            )}
        </AuthContext.Provider>    
    );
    
}

export class AuthErrorEventBus {
    listen(callback) {
      this.callback = callback;
    }
    notify(error) {
      this.callback(error);
    }
  }

export default AuthContext;
export const fetchToken = () => contextRef.current;
export const useAuth = () => useContext(AuthContext);