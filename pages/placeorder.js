import { Button, Card, Grid, Link, List, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import Layout from '../components/layout'
import { Store } from '../utils/Store'
import NextLink from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useRouter } from 'next/router'
import useStyles from '../utils/styles'

function PlaceOrder() {
    const classes = useStyles()
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const { cart: {cartItems, shippingAddress, paymentMethod} } = state

    return (
        <Layout title="Shopping Cart">
            <Typography component="h1" variant="h1">Place Order</Typography>
           
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>

                        <Card className={classes.section}>
                                <List>
                                    <ListItem>
                                        <Typography component="h2" varaint="h2">Shipping Address</Typography>
                                    </ListItem>
                                    <ListItem>
                                        {shippingAddress.fullName}, {shippingAddress.address},{' '}{shippingAddress.city}, {shippingAddress.postalCode},{' '}{shippingAddress.country}
                                    </ListItem>
                                </List>
                        </Card>

                        <Card className={classes.section}>
                                <List>
                                    <ListItem>
                                        <Typography component="h2" varaint="h2">Payment Method</Typography>
                                    </ListItem>
                                    <ListItem>
                                        {paymentMethod}
                                    </ListItem>
                                </List>
                        </Card>

                        <Card className={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography component="h2" varaint="h2">Order Items</Typography>
                                </ListItem>
                                <ListItem>
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
                                </ListItem>
                            </List>
 
                        </Card>
                       
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card className={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">
                                       Order Summary
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Items:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>${itemsPrice}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Tax:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>${taxPrice}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Shipping:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>${shippingPrice}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography><strong>Total:</strong></Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography><strong>${totalPrice}</strong></Typography>
                                        </Grid>
                                    </Grid>
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
