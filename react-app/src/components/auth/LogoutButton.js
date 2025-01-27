import React from "react";
import { FaWpforms } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <NavLink
      to="/sign-up"
      exact={true}
      onClick={onLogout}
      activeClassName="active"
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="dropdown-btns">
        <li>
          <FaWpforms id="signup-icon" />
          <span className="signup-span">Logout</span>
        </li>
      </div>
    </NavLink>
  );
};

export default LogoutButton;
