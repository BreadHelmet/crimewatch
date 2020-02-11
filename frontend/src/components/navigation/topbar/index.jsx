import React from 'react';
import SideBar from '../sidebar';
import './style.css';

export function TopBar({ children }) {
  return (
    <>
      <div className="top-bar">
        <h1>Top Bar</h1>
        
      </div>
      <SideBar />
      { children }
    </>
  );
}

export default TopBar;
