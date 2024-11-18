import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = []
    if (username.length <= 5) errors.push("Username must have a length of five or more")
    if (username.length > 30) errors.push("Username must be less than 30")
    if ((!(email.includes("@")))) errors.push("Must be a valid email.")
    if (password.length < 5) errors.push("You must have a longer password")
    if (repeatPassword !== password) errors.push("Passwords don't match")
    setErrors(errors)
  }, [username, password, email, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 400)
  })

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <form className='loginForm' onSubmit={onSignUp}>
      {/* <div className=''>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
      <div className='form-wrapperss'>
        <div className='login-card'>
        <div className='welcome-banner'>
            Welcome to Pettit!
          </div>
          <div className='second-banner'>
            Please enter your information below.
          </div>
          <div className='email'>
            <label>User Name</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div >
          <div className='email'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='email'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='email'>
            <label>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div id='buttons'>
            <button className="login-btn" hidden={errors.length > 0 ? true : false} type='submit'>Sign Up</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
