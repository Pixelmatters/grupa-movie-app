import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Modal,
} from '@material-ui/core';
import { LocalMoviesOutlined, Menu as MenuIcon } from '@material-ui/icons';
import {
  requestAuthToken,
  requestDeleteSession,
} from '../../store/auth/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import Watchlist from '../Watchlist/Watchlist';

import { verifyAuth } from '../../helpers/login';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(styles => ({
  headerContainer: {
    top: 0,
  },
  iconMovie: {
    width: '4rem',
    height: '4rem',
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
    cursor: 'pointer',
  },
  menuOptions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30rem',
    [styles.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuOptionsMobile: {
    display: 'none',
    [styles.breakpoints.down('sm')]: {
      display: 'block',
    },
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
    },
  },
  wideName: {
    display: 'block',
    [styles.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  smallName: {
    display: 'none',
    [styles.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  menuItemMobile: {
    color: styles.palette.primary.light,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const history = useHistory();

  const authState = useSelector((state: RootState) => state.auth);
  const moviesLink = {
    title: 'Movies',
    action: () => history.push('/'),
  };

  const defaultMenuItems = [
    moviesLink,
    {
      title: 'Login',
      action: () => dispatch(requestAuthToken()),
    },
  ];

  const loggedMenuItems = [
    moviesLink,
    {
      title: 'My WatchList',
      action: () => handleOpen(),
    },
    {
      title: 'Logout',
      action: () => dispatch(requestDeleteSession(authState.sessionId || '')),
    },
  ];

  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (authState.requestToken) {
    verifyAuth(authState);
  }

  const menuItems = authState.sessionId ? loggedMenuItems : defaultMenuItems;

  return (
    <Grid item xs={12} className={classes.headerContainer}>
      <header className={classes.menu}>
        <Box
          className={classes.menuIconTitle}
          onClick={() => history.push('/')}
        >
          <LocalMoviesOutlined className={classes.iconMovie} />
          <Box component="h1" className={classes.wideName}>
            The Movies Database
          </Box>
          <Box component="h1" className={classes.smallName}>
            TMD
          </Box>
        </Box>
        <Box className={classes.menuOptions}>
          {menuItems.map(({ title, action }, index) => (
            <Box
              key={index}
              component="span"
              onClick={action}
              className={classes.menuItem}
            >
              {title}
            </Box>
          ))}
        </Box>
        <Box className={classes.menuOptionsMobile}>
          <IconButton
            aria-label="Menu"
            aria-owns={open ? 'long-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            style={{ color: 'white' }}
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
            }}
          >
            {menuItems.map(({ title, action }, index) => (
              <MenuItem key={index}>
                <Box
                  component="span"
                  onClick={action}
                  className={classes.menuItemMobile}
                >
                  {title}
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="Watchlist"
          aria-describedby="Shows watchlist"
        >
          <Box>
            <Watchlist />
          </Box>
        </Modal>
      </header>
    </Grid>
  );
};

export default Header;
