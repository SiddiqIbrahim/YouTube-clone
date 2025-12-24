import React, { useState } from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import Search from "../../assets/search.png";
import Upload_icon from "../../assets/upload.png";
import More from "../../assets/more.png";
import Notification from "../../assets/notification.png";
import Profile_icon from "../../assets/jack.png";
import { Link } from "react-router-dom";
const Navbar = ({setSiderbar}) => {    
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img className="menu-icon" onClick={() => setSiderbar(prev => prev===false?true:false)} src={menu_icon} alt="" />
       <Link to='/'><img className="logo" src={logo} alt="" /></Link> 
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <img src={Search} alt="" />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={Upload_icon} alt="" />
        <img src={More} alt="" />
        <img src={Notification} alt="" />
        <img src={Profile_icon}  className="user-icon" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
