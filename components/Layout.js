import React from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import {AppBar, Typography, Toolbar, Container, Link} from '@material-ui/core'
import useStyles from '../utils/styles'

export default function Layout({children}) {
    const classes = useStyles();
    return (
        <div>
            <Head>
                <title>PictureLand 2.0</title>
            </Head>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <NextLink href="/" passHref>
                        <Link>
                            <Typography className={classes.brand}>
                            PictureLand 2.0
                            </Typography>
                        </Link>
                    </NextLink>
                    <div className={classes.grow}></div>
                    <div>
                        <NextLink href='/cart'>
                            <Link>
                                Cart
                            </Link>
                        </NextLink>
                        <NextLink href='/login'>
                            <Link>
                                Login
                            </Link>
                        </NextLink>
                    </div>
                </Toolbar>
            </AppBar>
            <Container className={classes.main}>
                {children}
            </Container>
            <footer className={classes.footer}>
                <Typography>
                    All rights reserved. PictureLand 2.0
                </Typography>
            </footer>
        </div>
    )
}
