
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./navbar.css"
import * as sessionActions from '../store/session';

const NavBar = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState()
  const session = useSelector(state => state.session.user)

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
    history.push('/')
  }

  return (
    <div className='nav-container'>
      <nav>
        <ul>
          <div className='nav-links'>
            <div className='logo-home'>
              <li>
                <NavLink to='/' exact={true} activeClassName='active'>
                  <img className='elephant-logo' src='https://www.pinclipart.com/picdir/big/97-977614_elephant-guest-house-westport-centre-accommodation-elephant-logo.png' alt='logo' /><span className='app-name'>pettit </span>
                </NavLink>
              </li>
              <li className='dropdown-li'>
                <button id='dropdown' onClick={openMenu}>
                  <div className='dropdown-text'>
                    <div className='home-icon'>
                      <img src='https://cdn.pixabay.com/photo/2013/07/12/14/49/home-148856_960_720.png' alt='Home' />
                    </div>
                    <div className='home-text'>
                      Home
                    </div>
                    <div className='down-arrow'>
                      <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-platform/down-arrow-10.png" alt='add post' />
                    </div>
                  </div>
                </button>
                {showMenu && (
                  <ul className='profile-options'>
                    <div className='dropdown-div'>
                      {!session && (
                        <NavLink to='/login' exact={true} id="something" activeClassName='another' style={{ textDecoration: 'none', color: "black" }}>
                          <div className='dropdown-btns'>
                            <li>
                              Login
                            </li>
                          </div>
                        </NavLink>
                      )}
                      {!session && (
                        <li className='dropdown-btns'>
                          <button id='demo' onClick={handleClick} className='authButton'>Demo</button>
                        </li>
                      )}
                      {!session && (
                        <NavLink to='/sign-up' exact={true} activeClassName='active' style={{ textDecoration: 'none', color: "black" }}>
                          <div className='dropdown-btns'>
                            <li>
                              Sign Up
                            </li>
                          </div>
                        </NavLink>
                      )}
                      <div className='dropdown-btns'>
                        {session && (
                          <li>
                            <LogoutButton />
                          </li>
                        )}
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
              {session && (
                <li>
                  <NavLink to='/posts/new' className='idk' exact={true} activeClassName='active'>
                    New Post<i className="fa-light fa-plus"></i>
                  </NavLink>
                </li>
              )}
              {session && (
                <li>
                  <LogoutButton />
                </li>
              )}
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
