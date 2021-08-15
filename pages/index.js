import { Card, CardActionArea, Grid, CardMedia, CardContent, Typography, CardActions, Button, Link } from '@material-ui/core'
import Layout from '../components/Layout'
import NextLink from 'next/link'
import db from '../utils/db'
import Product from '../models/Product'
import axios from 'axios'
import { useContext } from 'react'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import Rating from '@material-ui/lab/Rating'
import Carousel from 'react-material-ui-carousel'
import useStyles from '../utils/styles'


export default function Home(props) {
  const classes = useStyles()
  const {products, featuredProducts} = props
  const {state, dispatch} = useContext(Store)
  const router = useRouter()

  const addToCartHandler = async (product) =>{
    
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
    <Layout>
      <Carousel className={classes.mt1} animation="slide">
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link>
              <img
                src={product.featuredImage}
                alt={product.name}
                className={classes.featuredImage}
              ></img>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      
      <Typography variant="h2">Popular Products</Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                       component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                      <Rating value={product.rating} readOnly></Rating>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary" onClick={()=>addToCartHandler(product)}>
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
    </Layout>
    
  )
}

export async function getServerSideProps(){
  await db.connect()
  const featuredProductsDocs = await Product.find({isFeatured: true},'-reviews').lean().limit(3)
  const topRatedProducts = await Product.find({},'-reviews').lean().sort({
    rating: -1,
  }).limit(6)
  await db.disconnect()
  return{
    props:{
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      products: topRatedProducts.map(db.convertDocToObj),
    }
  }
}
