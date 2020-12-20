import { AppBar, Menu, MenuItem, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Links } from 'util/links';


// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';

export function TopBar({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  function handleClick(e) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <h1>Crimewatch</h1>
          {/* <MenuIcon /> */}

          {/* <Typography variant="h6" className={classes.title}>
            News
          </Typography> */}

          {/* <Link to={'/events'}>events</Link>
          <Link to={'/login'}>login</Link>
          <Link to={'/map'}>map</Link>
          <Link to={'/dashboard'}>dashboard</Link>
          <Link to={'/apitester'}>apitester</Link> */}

          <IconButton onClick={handleClick} edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            keepMounted
          >
            <MenuItem onClick={handleClose}>
              <Link to={Links.SCENES}>
                Scenes
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={Links.ACTORS}>
                Actors
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={Links.EVENTS}>
                Events
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={Links.PROPS}>
                Props
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={Links.MAP}>
                Map
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                Logout
            </MenuItem>
          </Menu>


        </Toolbar>
      </AppBar>
      {/* <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        item
      >
        <h1>Crimewatch</h1>

      </Grid> */}
      {children}
    </>
  );
}

export default TopBar;
