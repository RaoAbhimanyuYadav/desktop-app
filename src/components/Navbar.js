import React from "react";
import "./navbar.css";
const Navbar = ({ userInfo }) => {
  return (
    <div className="navbar">
      <div className="company-name">Edvora</div>
      <div className="profile">
        <div className="profile_name">{userInfo.name}</div>
        <div className="profile_pic" style={{ background: `url(${userInfo.url})` }}></div>
      </div>
    </div>
  );
};

export default Navbar;
