import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  // console.log("^^^^^^^", user)
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button id='logoutbutton' onClick={onLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>;
};

export default LogoutButton;
