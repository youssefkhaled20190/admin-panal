import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";

import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdCategory, MdOutlineStarHalf, MdPayment } from "react-icons/md";

import { NavLink } from "react-router-dom";
import "./style/SideBar.css";
import logo from "../../Assets/imgs/eShop (2).png";
import NavBar from "../NavBar/NavBar";

const SideBar = ({ children }) => {
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <RiDashboardHorizontalFill />,
    },
    {
      path: "/products",
      name: "Product",
      icon: <FaShoppingBag />,
    },
    {
      path: "/Catgories",
      name: "Categories",
      icon: <MdCategory />,
    },
    {
      path: "/Rates",
      name: "Rates",
      icon: <MdOutlineStarHalf />,
    },
    {
      path: "/Payments",
      name: "Payments",
      icon: <MdPayment />,
    },
  ];
  return (
    <>
      <div className="SidebarContainer">
        <div className="sidebar">
          <div className="top_section">
            <div className="logo-container">
              {/* <img className="logo" src={logo} alt="Logo" /> */}
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
