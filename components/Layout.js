import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import {AppBar, Typography, Toolbar, Container, Link, ThemeProvider, CssBaseline, Switch, Badge, Button, Menu, MenuItem, Box, IconButton, Drawer, Divider, List, ListItem, ListItemText} from '@material-ui/core'
import useStyles from '../utils/styles'
import { createTheme } from '@material-ui/core/styles'
import { Store } from '../utils/Store'
import { getError } from '../utils/error'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import MenuIcon from '@material-ui/icons/Menu'
import CancelIcon from '@material-ui/icons/Cancel'
import { useSnackbar } from 'notistack'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core'

export default function Layout({title, description, children}) {
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const {darkMode, cart, userInfo} = state;
    const theme = createTheme({
        typography:{
            h1:{
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2:{
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            body1:{
                fontWeight: 'normal',
            },  
        },
        palette:{
            type: darkMode ? 'dark' : 'light',
            primary:{
                main: '#f0c000',
            },
            secondary:{
                main: "#208080",
            }
        },
    })
    const classes = useStyles();

    const [sidbarVisible, setSidebarVisible] = useState(false);
    const sidebarOpenHandler = () => {
        setSidebarVisible(true);
    };
    const sidebarCloseHandler = () => {
        setSidebarVisible(false);
    };

    const [categories, setCategories] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const fetchCategories = async () => {
        try {
          const { data } = await axios.get(`/api/products/categories`);
          setCategories(data);
        } catch (err) {
            console.log(err)
          enqueueSnackbar(getError(err), { variant: 'error' });
        }
    };

    const [query, setQuery] = useState('');
    const queryChangeHandler = (e) => {
        setQuery(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        router.push(`/search?query=${query}`);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const darkModeChangeHandler = () =>{
        dispatch({type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON'})
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    }

    const [anchorEl, setAnchorEl] = useState(null)

    const loginClickHandler = (e) =>{
        setAnchorEl(e.currentTarget)
        console.log('dsdsd')
    }

    const loginMenuCloseHandler = (e, redirect) =>{
        setAnchorEl(null)
        if(redirect){
            router.push(redirect)
        }
    }

    const logOutClickHandler = () =>{
        setAnchorEl(null)
        dispatch({type:'USER_LOGOUT'})
        Cookies.remove('userInfo')
        Cookies.remove('cartItems')
        Cookies.remove('shippingAddress')
        Cookies.remove('paymentMethod')
        router.push('/')

    }

    
 
    return (
        <div>
            <Head>
                <title>{title? `${title} - PictureLand 2.0`:'PictureLand 2.0'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar className={classes.toolbar}>
                        <Box display="flex" alignItems="center">
                        <IconButton
                            edge="start"
                            aria-label="open drawer"
                            onClick={sidebarOpenHandler}
                            className={classes.menuButton}
                        >
                            <MenuIcon className={classes.navbarButton} />
                        </IconButton>   
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography className={classes.brand}>
                                PictureLand 2.0
                                </Typography>
                            </Link>
                        </NextLink>
                        </Box>

                        <Drawer
                            anchor="left"
                            open={sidbarVisible}
                            onClose={sidebarCloseHandler}
                            >
                            <List>
                                <ListItem>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Typography>Shopping by category</Typography>
                                    <IconButton
                                    aria-label="close"
                                    onClick={sidebarCloseHandler}
                                    >
                                    <CancelIcon />
                                    </IconButton>
                                </Box>
                                </ListItem>
                                <Divider light />
                                {categories.map((category) => (
                                <NextLink
                                    key={category}
                                    href={`/search?category=${category}`}
                                    passHref
                                >
                                    <ListItem
                                    button
                                    component="a"
                                    onClick={sidebarCloseHandler}
                                    >
                                    <ListItemText primary={category}></ListItemText>
                                    </ListItem>
                                </NextLink>
                                ))}
                            </List>
                        </Drawer>
                        
                        <div className={classes.searchSection}>
                            <form onSubmit={submitHandler} className={classes.searchForm}>
                                <InputBase
                                name="query"
                                className={classes.searchInput}
                                placeholder="Search products"
                                onChange={queryChangeHandler}
                                />
                                <IconButton
                                type="submit"
                                className={classes.iconButton}
                                aria-label="search"
                                >
                                <SearchIcon />
                                </IconButton>
                            </form>
                        </div>
                        <div>
                            <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
                            <NextLink href='/cart'>
                                <Link>
                                    {cart.cartItems.length > 0 ? <Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge> : ("Cart")}
                                </Link>
                            </NextLink>
                            {userInfo ? (

                            <>
                            <Button className={classes.navbarButton} aria-controls="simple-menu" aria-haspopup="true" onClick={loginClickHandler}>{userInfo.name}</Button>

                            <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={loginMenuCloseHandler}
                            >
                            <MenuItem onClick={(e)=>loginMenuCloseHandler(e, '/profile')}>Profile</MenuItem>
                            <MenuItem onClick={(e)=>loginMenuCloseHandler(e, '/order-history')}>Order History</MenuItem>
                            {userInfo.isAdmin && (
                                 <MenuItem onClick={(e)=>loginMenuCloseHandler(e, '/admin/dashboard')}>Admin Dashboard</MenuItem>
                            )}
                            <MenuItem onClick={logOutClickHandler}>Logout</MenuItem>
                            </Menu>
                            </>
                            
                            )
                            :
                            (
                                <NextLink href="/login" passHref>
                                    <Link>Login</Link>
                                </NextLink>
                            )
                        
                            }
                        </div>
                    </Toolbar>
                </AppBar>
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <Typography>
                        All rights reserved. 2021 PictureLand 2.0 
                    </Typography>
                </footer>
            </ThemeProvider>
        </div>
    )
}
