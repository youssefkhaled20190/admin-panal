import React from "react";
import logo from "../../Assets/imgs/eShop (2).png"; // Update with the correct path to your logo
import './style/NavBar.css'; // Import the CSS file

const NavBar = () => {
  return (
    <nav className="navbar custom-navbar">
      <a className="navbar-brand" href="#">
        <img
          src={logo}
          alt="Logo"
        />
      </a>

      <button className="logout-button" onClick={""}>  <i className="fa fa-sign-out"></i> Logout</button>

    </nav>
  );
};

export default NavBar;
