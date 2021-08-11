import React from 'react'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { Store } from '../../utils/Store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useReducer } from 'react'
import axios from 'axios'
import { getError } from '../../utils/error'
import Layout from '../../components/layout'
import { Button, Card, CircularProgress, Grid, ListItem, ListItemText, TableBody, TableCell, TableContainer, Typography, List, Table, TableHead, TableRow, CardContent, CardActions } from '@material-ui/core'
import useStyles from '../../utils/styles'
import NextLink from 'next/link'

function reducer(state, action){
    switch(action.type){
        case "FETCH_REQUEST":
            return {...state, loading: true, error:''}
        case 'FETCH_SUCCESS':
            return {...state, loading: false, products: action.payload, error:''}
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}

        default:
            state
    }
}

function Products() {
    const {state} = useContext(Store)
    const { userInfo } = state
    const router = useRouter()
    const classes = useStyles()

    const [{loading, error, products}, dispatch] = useReducer(reducer, {loading: true, products:[], error:''})

    useEffect(()=>{
        if(!userInfo){
            router.push('/login')
        }
        const fetchData = async () =>{
            try{
                dispatch({type: 'FETCH_REQUEST'})
                const {data} = await axios.get(`/api/admin/products`,{
                    headers: {authorization: `Bearer ${userInfo.token}`}
                })
                dispatch({type:'FETCH_SUCCESS', payload:data})
            }catch(err){
                dispatch({type:'FETCH_FAIL', payload:getError(err)})
            }
        }
        fetchData()
    }, [])
    return (
        <Layout title='Your Product History'>
             <Grid container spacing={1}>
                <Grid item md={3} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <NextLink  href="/admin/dashboard" passHref>
                                <ListItem  button component="a">
                                    <ListItemText primary="Admin Dashboard"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href="/admin/orders" passHref>
                                <ListItem button component="a">
                                    <ListItemText primary="Orders"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href="/admin/products" passHref>
                                <ListItem selected button component="a">
                                    <ListItemText primary="Products"></ListItemText>
                                </ListItem>
                            </NextLink>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={9} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component="h1" variant="h1">
                                    Products
                                </Typography>
                            </ListItem>
                            
                            <ListItem>
                            {loading ? (<CircularProgress />)
                            :
                            error ? (<Typography className={classes.error}>{error}</Typography>)
                            :(
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>NAME</TableCell>
                                                <TableCell>PRICE</TableCell>
                                                <TableCell>CATEGORY</TableCell>
                                                <TableCell>COUNT</TableCell>
                                                <TableCell>RATING</TableCell>
                                                <TableCell>ACTION</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((product)=>(
                                                <TableRow key={product._id}>
                                                    <TableCell>{product._id.substring(20, 24)}</TableCell>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>${product.price}</TableCell>
                                                    <TableCell>{product.category}</TableCell>
                                                    <TableCell>{product.countInStock}</TableCell>
                                                    <TableCell>{product.rating}</TableCell>
                                                    <TableCell>
                                                        <NextLink href={`/admin/product/${product._id}`} passHref>
                                                            <Button size="small" variant="contained">Edit</Button>
                                                        </NextLink>{' '}
                                                        <Button size="small" variant="contained">Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                            </ListItem>
                            
                        </List>
                    </Card>
                </Grid>
            </Grid>
            
               
           

            
        </Layout>
    )
}

export default dynamic(()=> Promise.resolve(Products),{ssr:false})