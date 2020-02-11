import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const menuItems = {
  DASHBOARD: '/dashboard',
  INCIDENTS: '/incidents',
  LOGIN: '/login',
}

export function SideBar() {
  return (
    <>
      <div className="side-bar">
        <Link to={menuItems.DASHBOARD}>
          <i className="fas fa-chart-bar"></i>
        </Link>
        <Link to={menuItems.INCIDENTS}>
          <i className="fas fa-chart-pie"></i>
        </Link>
        <Link to={menuItems.LOGIN}>
          <i className="far fa-address-card"></i>
        </Link>
      </div>
    </>
  );
}

export default SideBar;
