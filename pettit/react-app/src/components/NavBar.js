
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./navbar.css"

const NavBar = () => {
  
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
                <button onClick={openMenu}>Open Menu</button>
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
              <li>
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
