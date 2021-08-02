import React from 'react'
import Head from 'next/head'
import {AppBar, Typography, Toolbar, Container} from '@material-ui/core'
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
                    <Typography>PictureLand 2.0</Typography>
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
