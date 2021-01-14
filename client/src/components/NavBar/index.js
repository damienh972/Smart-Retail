import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const NavBar = ({ currentAccount }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    media: {
      height: 140,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Link to="/">
              <MenuIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" align="right" className={classes.title}>
            <Link to="/account">{currentAccount}</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  currentAccount: PropTypes.string.isRequired,
};

export default NavBar;
