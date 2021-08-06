import { Button, Card, Grid, Link, List, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import Layout from '../components/layout'
import { Store } from '../utils/Store'
import NextLink from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useRouter } from 'next/router'

function PlaceOrder() {
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const { cart: {cartItems} } = state

    return (
        <Layout title="Shopping Cart">
            <Typography component="h1" variant="h1">Place Order</Typography>
           
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {cartItems.map((item)=>(
                                        <TableRow key={item._id}>

                                            <TableCell>
                                                <NextLink href={`/product/${item.slug}`} passHref>
                                                    <Link>
                                                        <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                                                    </Link>
                                                </NextLink>
                                            </TableCell>

                                            <TableCell>
                                                <NextLink href={`/product/${item.slug}`} passHref>
                                                    <Link>
                                                        <Typography>{item.name}</Typography>
                                                    </Link>
                                                </NextLink>
                                            </TableCell>

                                            <TableCell align="right">
                                                <Typography>{item.quantity}</Typography>
                                            </TableCell>

                                            <TableCell align="right">
                                                <Typography>${item.price}</Typography>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </TableContainer>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">
                                       Order Summary
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Button variant="contained" color="primary" fullWidth>Place your Order</Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            
        </Layout>
    )
}

export default dynamic(()=> Promise.resolve(PlaceOrder),{ssr:false})
