
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./navbar.css"
import * as sessionActions from '../store/session';

const NavBar = () => {

  const dispatch = useDispatch();
  const history = useHistory(); 
  const [showMenu, setShowMenu] = useState()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  }

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu)
  }, [showMenu])

  const handleClick = async (e) => {
    await dispatch(sessionActions.login('demo@aa.io', 'password'))
    history.push('/home')
  }

  return (
    <div className='nav-container'>
      <nav>
        <ul>
          <div className='nav-links'>
            <div className='logo-home'>
              <li>
                <NavLink to='/posts/main' exact={true} activeClassName='active'>
                  Home
                </NavLink>
              </li>
              <li>
                <button id='dropdown' onClick={openMenu}>
                  <div className='dropdown-text'>
                    Open Menu
                  </div>
                  <div className='dropdown-arrow'>
                    🔽
                  </div>
                </button>
                {showMenu && (
                  <ul className='profile-options'>
                    <div className='dropdown-div'>
                      <NavLink to='/login' exact={true} id="something" activeClassName='another' style={{ textDecoration: 'none', color: "black" }}>
                        <div className='dropdown-btns'>
                          <li>
                            Login
                          </li>
                        </div>
                      </NavLink>
                      <button onClick={handleClick} className='authButton'>Demo</button>

                      <NavLink to='/sign-up' exact={true} activeClassName='active' style={{ textDecoration: 'none', color: "black" }}>
                        <div className='dropdown-btns'>
                          <li>
                            Sign Up
                          </li>
                        </div>
                      </NavLink>
                      <div className='dropdown-btns'>
                        <li>
                          <LogoutButton />
                        </li>
                      </div>
                    </div>
                  </ul>
                )}
              </li>
            </div>
            <div className='search'>
            </div>
            <div className='right-side'>
              {/* <li>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to='/users' exact={true} activeClassName='active'>
                  Users
                </NavLink>
              </li> */}
              <li>
                <NavLink to='/posts/new' exact={true} activeClassName='active'>
                  New Post
                </NavLink>
              </li>
              <li>
                <LogoutButton />
              </li>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
