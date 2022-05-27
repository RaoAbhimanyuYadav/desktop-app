import React from "react";
import "./navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="company-name">Edvora</div>
      <div className="profile">
        <div className="profile_name">Dhruv Singh</div>
        <div className="profile_pic" style={{ background: "url(https://picsum.photos/200)" }}></div>
      </div>
    </div>
  );
};

export default Navbar;
