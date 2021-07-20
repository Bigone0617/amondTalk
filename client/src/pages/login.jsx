import React, { useState } from 'react';

const Login = ({signUp, logIn}) => {
    const [signup, setSignup] = useState(false);
    const [userName, setUserName] = useState('');
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [email, setEmail] = useState('');
    const [url, setUrl] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        if(signup){
            signUp(id, pw, userName, email, url);
        }else{
            logIn(id, pw);
        }
    }

    const onChange = (event) => {
        const {
            target: {name, value, checked},
        } = event;

        switch (name) {
            case 'userName':
                return setUserName(value);
            case 'id':
                return setId(value);
            case 'pw':
                return setPw(value);
            case 'email':
                return setEmail(value);
            case 'url':
                return setUrl(value);
            case 'signup':
                return setSignup(checked);
            default:
        }
    }
    return (
        <>
        <form className='auth-form' onSubmit={onSubmit}>
          <input
            name='id'
            type='text'
            placeholder='Id'
            value={id}
            onChange={onChange}
            className='form-input'
            required
          />
          <input
            name='pw'
            type='password'
            placeholder='Password'
            value={pw}
            className='form-input'
            onChange={onChange}
          />
          {signup && (
            <input
              name='userName'
              type='text'
              placeholder='Name'
              value={userName}
              onChange={onChange}
              className='form-input'
              required
            />
          )}
          {signup && (
            <input
              name='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={onChange}
              className='form-input'
              required
            />
          )}
          {signup && (
            <input
              name='url'
              type='url'
              placeholder='Profile Image URL'
              value={url}
              onChange={onChange}
              className='form-input'
            />
          )}
          <div className='form-signup'>
            <input
              name='signup'
              id='signup'
              type='checkbox'
              onChange={onChange}
              checked={signup}
            />
            <label htmlFor='signup'> Create a new account?</label>
          </div>
          <button className='form-btn auth-form-btn' type='submit'>
            {signup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
      </>
    );
}

export default Login;