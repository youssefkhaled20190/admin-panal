// AuthenticatedLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar.js';
import NavBar from '../NavBar/NavBar.js';
import "./Style/Auth.css"; // Ensure you have the CSS with appropriate layout styles

function AuthenticatedLayout() {
  return (
    <div className="authenticated-layout">
      <NavBar className="navbar"/>
      <div className="main-content">
        <SideBar className="sidebar"/>
        <div className="content">
          <Outlet /> {/* This renders the child route components */}
        </div>
      </div>
    </div>
  );
}

export default AuthenticatedLayout;
