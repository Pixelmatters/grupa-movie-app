import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { LocalMoviesOutlined, Menu as MenuIcon } from '@material-ui/icons';

const useStyles = makeStyles(styles => ({
  headerContainer: {
    top: 0,
  }, 
  iconMovie: {
    width: '4rem',
    height: '4rem'
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '1rem',
    paddingLeft: '1rem',
  },
  menuIconTitle: {
    display: 'flex',
    fontFamily: 'Roboto, arial',
    color: styles.palette.primary.contrastText,
  },
  menuOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30rem',
    [styles.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  menuOptionsMobile: {
    display: 'none',
    [styles.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  menuItem: {
    color: styles.palette.primary.contrastText,
    width: '9rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid transparent',
    borderRadius: '0.5rem',
    transition: 'border 0.5s',
    '&:hover': {
      borderRight: '2px solid gray',
      borderLeft: '2px solid gray',
      cursor: 'pointer',
    }
  },
  wideName: {
    display: 'block',
    [styles.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  smallName: {
    display: 'none',
    [styles.breakpoints.down('xs')]: {
      display: 'block'
    },
  },
  menuItemMobile: {
    color: styles.palette.primary.light
  }
}));

const menuItems = [{
  title: 'Movies',
  action: () => {}
},{
  title: 'My WatchList',
  action: () => {} 
},{
  title: 'Login',
  action: () => {}
} ];

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12} className={classes.headerContainer}>
      <header className={classes.menu}>
        <Box className={classes.menuIconTitle}>
          <LocalMoviesOutlined className={classes.iconMovie}/>
          <Box component="h1" className={classes.wideName}>The Movies Database</Box>
          <Box component="h1" className={classes.smallName}>TMD</Box>
        </Box>
        <Box className={classes.menuOptions}>
          {
            menuItems.map(({title, action}, index) => 
              <Box key={index} component="span" onClick={action} className={classes.menuItem}>{title}</Box>
            )
          }
        </Box>
        <Box className={classes.menuOptionsMobile}>
          <IconButton         
            aria-label="Menu"
            aria-owns={open ? 'long-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClick} style={{color: 'white'}} 
          >
            <MenuIcon />
          </IconButton>
          <Menu         
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: 200,
              },
            }}> 
            {
              menuItems.map(({title, action}, index) => 
                <MenuItem key={index} >
                  <Box component="span" onClick={action} className={classes.menuItemMobile}>{title}</Box>
                </MenuItem>
              )
            }
          </Menu>

        </Box>
      </header>
    </Grid>
  );
};

export default Header;