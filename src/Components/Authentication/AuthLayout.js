// AuthenticatedLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar.js';
import "./Style/Auth.css"

function AuthenticatedLayout() {
  return (
    <div className="authenticated-layout">
      <SideBar />
      <main>
        <Outlet /> {/* This renders the child route components */}
      </main>
    </div>
  );
}

export default AuthenticatedLayout;
