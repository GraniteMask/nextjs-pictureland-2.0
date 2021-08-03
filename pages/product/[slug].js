import React from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import data from '../../utils/data'
import Layout from '../../components/layout'
import NextLink from 'next/link'
import { Button, Card, Grid, Link, List, ListItem, Typography } from '@material-ui/core'
import useStyles from '../../utils/styles'

export default function ProductScreen() {
    const classes = useStyles()
    const router = useRouter()
    const {slug} = router.query
    const product = data.products.find(a => a.slug === slug)
    if(!product){
        return <div>Product not Found</div>
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
                            <Typography component="h1">{product.name}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Category: {product.category}</Typography>
                        </ListItem>
                        <ListItem>
                           <Typography>Brand: {product.brand}</Typography> 
                        </ListItem>
                        <ListItem>
                            <Typography>Rating: {product.rating} stars ({product.numReviews} reviews)</Typography>
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
                                <Button fullWidth variant="contained" color="primary">
                                    Add to Cart
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

//md for medium devices and xs for extra small devices
//most important element of a webpage to be h1 for SEO so typography component to h1
//description is also added for SEO. Add the relevant code for description in layout page also 
