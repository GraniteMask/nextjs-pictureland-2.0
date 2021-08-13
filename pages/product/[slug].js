import React, { useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import Layout from '../../components/Layout'
import NextLink from 'next/link'
import { Button, Card, CircularProgress, Grid, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import useStyles from '../../utils/styles'
import Product from '../../models/Product'
import db from '../../utils/db'
import { Store } from '../../utils/Store'
import axios from 'axios'
import Rating from '@material-ui/lab/Rating'
import { useSnackbar } from 'notistack'

export default function ProductScreen(props) {
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const {userInfo} = state
    const {product} = props
    const classes = useStyles()
    // const router = useRouter()
    // const {slug} = router.query
    // const product = data.products.find(a => a.slug === slug)
    const {enqueueSnackbar} = useSnackbar()

    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await axios.post(
            `/api/products/${product._id}/reviews`,
            {
              rating,
              comment,
            },
            {
              headers: { authorization: `Bearer ${userInfo.token}` },
            }
          );
          setLoading(false);
          enqueueSnackbar('Review submitted successfully', { variant: 'success' });
          fetchReviews();
        } catch (err) {
          setLoading(false);
          enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {variant: 'error'})
        }
      };

    const fetchReviews = async() =>{
        try{
            const {data} = await axios.get(`/api/products/${product._id}/reviews`)
            // console.log(data)
            setReviews(data)
        }catch(err){
            enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {variant: 'error'})

        }
    }

    useEffect(()=>{
        fetchReviews()
    },[])

    if(!product){
        return <div>Product not Found</div>
    }
    const addToCartHandler = async () =>{
        
        // if(data.countInStock <= 0){
        //     window.alert('sorry, product is out of stock')
        //     return
        // }
        const existItem = state.cart.cartItems.find(x=>x._id === product._id) 
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/products/${product._id}`)

        if(data.countInStock < quantity){
            window.alert('sorry, product is out of stock')
            return
        }

        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}})
        router.push('/cart')
    }

    return (
        // <div>
        //     <h1>{product.name}</h1>
        // </div>
        <Layout title={product.name} description={product.description}>
            <div className={classes.section}>
                <NextLink href="/" passHref>
                    <Link><Typography>back to products</Typography></Link>
                </NextLink>
            </div>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>  
                    <Image src={product.image} alt={product.name} width={1000} height={640} layout="responsive" />
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem>
                            <Typography component="h1" variant="h1">{product.name}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Category: {product.category}</Typography>
                        </ListItem>
                        <ListItem>
                           <Typography>Brand: {product.brand}</Typography> 
                        </ListItem>
                        <ListItem>
                            <Rating value={product.rating} readOnly></Rating>
                            <Link href="#reviews">
                                <Typography>({product.numReviews} reviews)</Typography>
                            </Link>
                            
                        </ListItem>
                        <ListItem>
                            <Typography>Description: {product.brand}</Typography>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item md={3} cs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Price</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>${product.price}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Status</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{product.countInStock>0 ? "In Stock":"Unavailable"}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button fullWidth variant="contained" color="primary" onClick={addToCartHandler}>
                                    Add to Cart
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
            <List>
                <ListItem>
                    <Typography name="reviews" id="reviews" variant="h2">
                        Customer Reviews
                    </Typography>
                </ListItem>
                {reviews.length === 0 && <ListItem>No Reviews</ListItem>}
                {reviews.map((review) => (
                    <ListItem key={review._id}>
                        <Grid container>
                        <Grid item className={classes.reviewItems}>
                            <Typography>
                            <strong>{review.name}</strong>
                            </Typography>
                            <Typography>{review.createdAt.substring(0, 10)}</Typography>
                        </Grid>
                        <Grid item>
                            <Rating value={review.rating} readOnly></Rating>
                            <Typography>{review.comment}</Typography>
                        </Grid>
                        </Grid>
                    </ListItem>
                ))}
                <ListItem>
                    {userInfo ? (
                        <form onSubmit={submitHandler} className={classes.reviewForm}>
                        <List>
                          <ListItem>
                            <Typography variant="h2">Leave your review</Typography>
                          </ListItem>
                          <ListItem>
                            <TextField
                              multiline
                              variant="outlined"
                              fullWidth
                              name="review"
                              label="Enter comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </ListItem>
                          <ListItem>
                            <Rating
                              name="simple-controlled"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            />
                          </ListItem>
                          <ListItem>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                            >
                              Submit
                            </Button>
          
                            {loading && <CircularProgress></CircularProgress>}
                          </ListItem>
                        </List>
                      </form>

                    ) : (
                        <Typography variant="h2">
                            Please{' '}
                            <Link href={`/login?redirect=/product/${product.slug}`}>
                                login
                            </Link>{' '}
                            to write a review
                        </Typography>
                    )}
                </ListItem>
                
                
            </List>
        </Layout>
    )
}


export async function getServerSideProps(context){
    const {params} = context;
    const {slug} = params

    await db.connect()
    const product = await Product.findOne({slug},'-reviews').lean()
    await db.disconnect()
    return{
      props:{
        product: db.convertDocToObj(product),
      }
    }
  }
  

//md for medium devices and xs for extra small devices
//most important element of a webpage to be h1 for SEO so typography component to h1
//description is also added for SEO. Add the relevant code for description in layout page also 
