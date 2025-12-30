import React from 'react'
import logo1 from '../assets/logo1.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar, Collapse } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MoreVert, ExpandLess, ExpandMore } from '@mui/icons-material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CarRentalIcon from '@mui/icons-material/CarRental';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FaxIcon from '@mui/icons-material/Fax';
import PlaceIcon from '@mui/icons-material/Place';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const NavBar = ({ children }) => {
    const user = useSelector(state => state.userReducer.user);

    const func = (index) => {
        switch (index) {
            case 0:
                return '/ActiveRental'
            case 1:
                return '/RentalHistories'
            case 2:
                return '/MyPurchases'
            case 3:
                return '/package'
            case 4:
                return '/product'
            case 5:
                return '/'
        }
    }

    const [state, setState] = React.useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const list = () => (
        <div>
            <img src={logo1} alt="logo" style={{ width: '4vw', height: '4.75vh', marginLeft: '1vw', marginTop: 10, marginLeft: 30 }} />
            <Box
                sx={{
                    width: 300
                }}
                role="presentation"
                onClick={toggleDrawer('left', false)}
                onKeyDown={toggleDrawer('left', false)}
            >
                <Divider />
                <List >

                    {['Active Rental', 'Rentals Histories', 'Purchases Histories', 'Packages List', 'Products list', 'Home Page'].map((text, index) => (
                        <NavLink key={index} to={func(index)}>
                            <ListItem disablePadding sx={{ color: '#284087' }}>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: 'green' }}>
                                        {index === 0 ? <LocalActivityIcon /> :
                                            index === 1 ? <CarRentalIcon /> :
                                                index === 2 ? <PublishedWithChangesIcon /> :
                                                    index === 3 ? <ProductionQuantityLimitsIcon /> :
                                                        index === 4 ? <LocalTaxiIcon /> :
                                                            <HomeIcon />
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItemButton onClick={handleClick} sx={{ color: '#284087' }}>
                        <ListItemIcon sx={{ color: 'green' }}>
                            <SupportAgentIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {['Habarzel 13 Tel Aviv', 'car4us@gmail.com', '03-9999999', '03-9999999'].map((text, index) => (
                            <ListItem key={index} disablePadding sx={{ color: '#284087' }}>
                                <ListItemButton sx={{ pl: 6 }}>
                                    <ListItemIcon sx={{ color: 'green' }}>
                                        {index === 0 ? <PlaceIcon /> :
                                            index === 1 ? <EmailIcon /> :
                                                index === 2 ? <LocalPhoneIcon /> :
                                                    <FaxIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </Collapse>
                </List>
            </Box>
        </div>
    );
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen = () => {
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen1(false);
    };

    const logout = () => {
        nevigate('/')
        setOpen1(false);
    }

    return (
        <>
            <nav id='nav'><img src={logo1} alt="logo" style={{ width: '4vw', height: '5vh', marginLeft: '1vw' }} />
                <span id='span'>
                    {user ?
                        <div style={{ display: 'flex', gap: 15, marginRight: '3px' }}>
                            <p style={{ marginTop: '23px', color: '#284087', fontWeight: "bolder", display: 'inline-block' }}>Wellcome {user.data.name}</p> <p><Avatar alt={user.data.name} src="/static/images/avatar/3.jpg" sx={{ backgroundColor: '#284087' }} /></p> </div> :
                        <p>You are currently using guest access </p>
                    }
                    {user ?
                        <div id='navlink'> <NavLink style={{ color: '#284087', textDecoration: 'nono', backgroundColor: 'transparent', boxSizing: 'border-box' }} onClick={handleClickOpen}>Log Out</NavLink></div> :
                        <p>You are currently using guest access </p> &&
                        <div id='navlink'> <NavLink to={'/signIn'} style={{ color: '#284087', textDecoration: 'nono', backgroundColor: 'transparent', boxSizing: 'border-box' }}>Log In</NavLink></div>
                    }

                </span>
                <Dialog
                    open={open1}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Log Out"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {user?.data.name}, Are you sure you want to log out?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Not now</Button>
                        <Button onClick={logout} autoFocus>
                            Yes, I'm sure
                        </Button>
                    </DialogActions>
                </Dialog>
            </nav>
            <div
            > <React.Fragment >
                    <Button id='more' onClick={toggleDrawer(true)}><MoreVert sx={{ fontSize: 35, paddingTop: 0.8, paddingRight: 1 }} /></Button>
                    <Drawer
                        open={state}
                        onClose={toggleDrawer(false)}
                    >
                        {list()}
                    </Drawer>
                </React.Fragment>
            </div>
            {children}
        </>
    )
}
export default NavBar
