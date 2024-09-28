import React from 'react';
import { FaWpforms } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch();
  // const user = useSelector(state => state.session.user)
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <NavLink to='/sign-up' exact={true} onClick={onLogout} activeClassName='active' style={{ textDecoration: 'none', color: "black" }}>
    <div className='dropdown-btns'>
      <li>
        <FaWpforms id="signup-icon" />
        <span className='signup-span'>
          Logout
        </span>
      </li>
    </div>
  </NavLink>
    // <div>
    //   <button id='logoutbutton' onClick={onLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
    // </div>
  ) 
};

export default LogoutButton;
