import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./MobileNav.module.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MobileNav(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    const timer = setTimeout(() => {
      setAnchorEl(null);
    }, 100);
    return () => clearTimeout(timer);
  };

  const handleResize = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // window resize listener
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className={styles.NavBar}>
      <div className={classes.root}>
        <AppBar position='fixed' className={styles.MobileNav}>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={handleClick}
            >
              <MenuIcon
                aria-controls='fade-menu'
                aria-haspopup='true'
              ></MenuIcon>
              <Menu
                id='fade-menu'
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                className={styles.navLinks}
              >
                <MenuItem onClick={handleClose}>
                  <a href='#'>{props.firstLink}</a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <a href='#secondSection'>{props.secondLink}</a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <a href='#thirdSection'>{props.thirdLink}</a>
                </MenuItem>
              </Menu>
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Robo3 Dashboard
            </Typography>
            <Link
              to='./'
              color='inherit'
              style={{ color: "white", textDecoration: "none" }}
            >
              Logout
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
