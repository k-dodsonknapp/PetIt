
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./navbar.css"
import * as sessionActions from '../store/session';
import Search from './Search';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { MdEmojiEmotions } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';


const NavBar = () => {

  const dispatch = useDispatch();
  const session = useSelector(state => state.session.user)
  const history = useHistory();
  const [showMenu, setShowMenu] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState();
  console.log(searchResult)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  }

  const openSearch = () => {
    if (showSearchResults) return;
    setShowSearchResults(true);
  }

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu)
  }, [showMenu])

  useEffect(() => {
    if (search.length === 0) {
      setSearchResult([])
    }
  }, [search])

  // useEffect(() => {
  //   setLength(cart.length);
  // }, [cart.length]);

  const clear = () => {
    // history.push('/')
    setSearch([])
  }

  const handleClick = async (e) => {
    await dispatch(sessionActions.login('demo@aa.io', 'password'))
    // history.push('/')
  }

  const onLogout = async (e) => {
    await dispatch(sessionActions.logout());
  };

  return (
    <div className='nav-container'>
      <nav>
        <ul>
          <div className='nav-links'>
            <div className='logo-home'>
              <li id='logo-name'>
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
                          <div className='dropdown-btns' id='login-div'>
                            <li>
                              <RiLogoutBoxRFill id="login-icon" />
                              <span className='signup-span'>
                                Login
                              </span>
                            </li>
                          </div>
                        </NavLink>
                      )}
                      {!session && (
                        <NavLink to='/' onClick={handleClick} exact={true} id="something" activeClassName='another' style={{ textDecoration: 'none', color: "black" }}>
                          <div className='dropdown-btns'>
                            <li id='demo-li'>
                              <MdEmojiEmotions id="demo-icon" />
                              <span className='signup-span'>
                                Demo
                              </span>
                            </li>
                          </div>
                        </NavLink>
                      )}
                      {!session && (
                        <NavLink to='/sign-up' exact={true} activeClassName='active' style={{ textDecoration: 'none', color: "black" }}>
                          <div className='dropdown-btns'>
                            <li id='signup-li'>
                              <FaWpforms id="signup-icon" />
                              <span className='signup-span'>
                                Sign Up
                              </span>
                            </li>
                          </div>
                        </NavLink>
                      )}
                      {session && (
                        // <div className='dropdown-btns'>
                        //   <li>
                        //     {/* <LogoutButton /> */}

                        //   </li>
                        // </div>
                        <NavLink to='/sign-up' exact={true} onClick={onLogout} activeClassName='active' style={{ textDecoration: 'none', color: "black" }}>
                          <div className='dropdown-btns'>
                            <li>
                              <FaWpforms id="logout-icon" />
                              <span className='logout-span'>
                                Logout
                              </span>
                            </li>
                          </div>
                        </NavLink>
                      )}
                    </div>
                  </ul>
                )}
              </li>
            </div>
            <div className='headersearch'>
              <Search search={search} setSearch={setSearch} searchResult={searchResult} setSearchResult={setSearchResult} />
              <div className='searchresultcontainer'>
                {searchResult.length > 0 && searchResult.map(result => (
                  <Link onClick={clear} className='searchLink' to={`/posts/${result.id}`}>
                    <div className='searchresults'>{result?.title}</div>
                  </Link>
                ))}
              </div>
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
              {!session && (
                <li id='new-post-link'>
                  <NavLink to='/login' className='idk' exact={true} activeClassName='active'>
                    Login
                    {/* <AiOutlinePlus id='new-post-icon' /> */}
                  </NavLink>
                </li>
              )}
              {session && (
                <li id='new-post-link'>
                  <NavLink to='/posts/new' className='idk' exact={true} activeClassName='active'>
                    New Post <AiOutlinePlus id='new-post-icon' />
                  </NavLink>
                </li>
              )}
              {session && (
                <li id='new-post-link'>
                  <NavLink className='idk' to='/sign-up' exact={true} onClick={onLogout} activeClassName='active' >
                    {/* <div className='dropdown-btns'> */}
                    {/* <li> */}
                    Logout
                    <FaWpforms id="new-post-icon" />
                    {/* <span className='signup-span'> */}
                    {/* </span> */}
                    {/* </li> */}
                    {/* </div> */}
                  </NavLink>
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
