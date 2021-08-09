import React from 'react'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { Store } from '../utils/Store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useReducer } from 'react'
import axios from 'axios'
import { getError } from '../utils/error'
import Layout from '../components/layout'
import { CircularProgress, Typography } from '@material-ui/core'
import useStyles from '../utils/styles'

function reducer(state, action){
    switch(action.type){
        case "FETCH_REQUEST":
            return {...state, loading: true, error:''}
        case 'FETCH_SUCCESS':
            return {...state, loading: false, orders: action.payload, error:''}
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}

        default:
            state
    }
}

export default function OrderHistory() {
    const {state} = useContext(Store)
    const { userInfo } = state
    const router = useRouter()
    const classes = useStyles()

    const [{loading, error, order}, dispatch] = useReducer(reducer, {loading: true, orders:[], error:''})

    useEffect(()=>{
        if(!userInfo){
            router.push('/login')
        }
        const fetchOrders = async () =>{
            try{
                dispatch({type: 'FETCH_REQUEST'})
                const {data} = await axios.get(`/api/orders/history`,{
                    headers: {authorization: `Bearer ${userInfo.token}`}
                })
                dispatch({type:'FETCH_SUCCESS', payload:data})
            }catch(err){
                dispatch({type:'FETCH_FAIL', payload:getError(err)})
            }
        }
        fetchOrders()
    }, [])
    return (
        <Layout title='Your Order History'>
            {loading ? (<CircularProgress />)
            :
            error ? (<Typography className={classes.error}>{error}</Typography>)
            :(
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
                                <ListItem>
                                    Status: {' '} {isDelivered ? `delivered at ${deliveredAt}` : 'not delivered'}
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
                                <ListItem>
                                    Status: {' '} {isPaid ? `paid at ${paidAt}` : 'not paid'}
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
                                        {orderItems.map((item)=>(
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
                            {
                                !isPaid && (
                                    <ListItem>
                                        { isPending ? (<CircularProgress />)
                                        :( <div className={classes.fullWidth}>
                                            <PayPalButtons createOrder={createOrder}
                                            onApprove={onApprove} onError={onError}></PayPalButtons></div>
                                        )
                                            
                                        }
                                    </ListItem>
                                )
                            }
                        </List>
                    </Card>
                </Grid>
            </Grid>
            )
            }
           

            
        </Layout>
    )
}

export default dynamic(()=> Promise.resolve(OrderHistory),{ssr:false})