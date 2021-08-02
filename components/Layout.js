import React from 'react'
import Head from 'next/head'
import {AppBar, Typography, Toolbar, Container} from '@material-ui/core'

export default function Layout({children}) {
    return (
        <div>
            <Head>
                <title>PictureLand 2.0</title>
            </Head>
            <AppBar position="static">
                <Toolbar>
                    <Typography>PictureLand 2.0</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                {children}
            </Container>
            <footer>
                <Typography>
                    All rights reserved. PictureLand 2.0
                </Typography>
            </footer>
        </div>
    )
}
