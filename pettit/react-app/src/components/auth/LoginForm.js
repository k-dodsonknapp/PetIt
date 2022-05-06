import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import * as sessionActions from '../../store/session';
import './loginForm.css'

const LoginForm = () => {
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  console.log(emailErrors)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    console.log(data)
    if (data) {
      if (data[0] === 'email : Email provided not found.') {
        setEmailErrors([data[0]]);
      } else {
        // setEmailErrors([data[0]])
        setPasswordErrors([data[0]])
      }
      if (data[0] === 'password : Password was incorrect.') {
        setPasswordErrors([data[0]])
      } else {
        setEmailErrors([data[0]])
        // setPasswordErrors([data[0]])
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 400)
  })

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleSignUp = (e) => {
    history.push("/sign-up")
  }

  const handleClick = async (e) => {
    await dispatch(sessionActions.login('demo@aa.io', 'password'))
    history.push('/')
  }


  return (
    <form className='loginForm' onSubmit={onLogin}>
      {/* <div>
        {emailErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
      <div className='form-wrapperss'>
        <div className='login-card'>
          <div className='welcome-banner'>
            Welcome to Pettit!
          </div>
          <div className='second-banner'>
            All the pets are waiting for you!
          </div>
          <div className='email'>
            <label htmlFor='email'>Your Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            {emailErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='email'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          {passwordErrors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
          <div id='login-buttons'>
            <button className="login-btn" type='submit'>Login</button>
            <h5></h5>
            {/* <h5>continue to</h5> */}
            <div className='secondary-login-btns'>
              <button className="signup-btn" type='submit' onClick={handleSignUp}>Sign Up</button>
              <h5>or</h5>
              <button className="login-btn" onClick={handleClick}>Demo</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
