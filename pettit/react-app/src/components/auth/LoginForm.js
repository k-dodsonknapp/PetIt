import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import * as sessionActions from '../../store/session';
import './loginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/posts/main' />;
  }

  const handleSignUp =(e) => {
    history.push("/sign-up")
  }

  const handleClick = async (e) => {
    await dispatch(sessionActions.login('demo@aa.io', 'password'))
    history.push('/posts/main')
  }

  return (
    <form className='loginForm' onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-wrapperss'>

        <div className='email'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
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
          <div id='buttons'>
            <button className="btn" onClick={handleClick}>Demo</button>
            <button className="btn" type='submit'>Login</button>
            <button className="btn" type='submit' onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
