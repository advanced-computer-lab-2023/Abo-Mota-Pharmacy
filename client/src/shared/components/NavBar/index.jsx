import { Link } from "react-router-dom";
import "./navbarstyless.css";
import logo from "../../assets/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import SideBar from "../SideBar";
import { useState, useEffect } from "react";
import { logout, useLogoutMutation } from "../../../store";
import { useDispatch } from "react-redux";

const NavBar = ({ links, socket, notifications }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [logoutMutation, result] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleClick = async () => {
    const resultLogout = await logoutMutation();
    if (resultLogout?.data) {
      dispatch(logout());
    }
  };
  return (
    <div className="navbar">
      <div className="left">
        <SideBar open={sideBarOpen} setOpen={setSideBarOpen} links={links} />
      </div>
      <img src={logo} alt="logo" className="navbar-logo" />

      <ul className="buttons">
        <li>
          <Link to="/" className="navbar-link">
            <div className="navbar-home">
              <AiOutlineHome size={20} />
              Home
            </div>
          </Link>
        </li>
        <li>
          <Link to="/" className="navbar-link" onClick={handleClick}>
            Logout
          </Link>
        </li>
      </ul>
      {/* <div className='right'>
        <div className='avatar'></div>
      </div> */}
    </div>
  );
};

export default NavBar;
