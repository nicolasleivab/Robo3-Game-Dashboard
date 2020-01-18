import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './MobileNav.module.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MobileNav() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.NavBar}>
        <div className={classes.root}>
            <AppBar position="fixed" className={styles.MobileNav}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                            </MenuIcon>
                            <Menu
                                id="fade-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                                className={styles.navLinks}
                            >
                                <MenuItem onClick={handleClose}><a href="#">Distribution</a></MenuItem>
                                <MenuItem onClick={handleClose}><a href="#GroupedChart">Solutions</a></MenuItem>
                                <MenuItem onClick={handleClose}><a href="#BarChart">Success Probability</a></MenuItem>
                            </Menu>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Robo3 Dashboard
          </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
        </div>
    );
}