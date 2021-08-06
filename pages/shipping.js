import { Button, List, ListItem, TextField, Typography, Link } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/layout'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import { Store } from '../utils/Store'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import { Controller, useForm } from 'react-hook-form'

 

export default function Shipping() {
    const {handleSubmit, control, formState: {errors}} = useForm()
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const {redirect} = router.query
    const {userInfo} = state;

    // console.log(userInfo)
    
    useEffect(()=>{
        if(!userInfo){
            router.push('/login?redirect=/shipping')
        }
    },[])

    

    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')

    const classes = useStyles()

    const submitHandler =  ({fullName, address, city, postalcode, country}) =>{
        // e.preventDefault()

        dispatch({type:"SAVE_SHIPPING_ADDRESS", payload: {fullName, address, city, postalcode, country}})
        Cookies.set('shippingAddress', JSON.stringify({fullName, address, city, postalcode, country}))
        router.push('/payment')
    }

    return (
        <Layout title="Shipping">
            <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                <Typography component="h1" variant="h1">
                    Shipping
                </Typography>
                <List>

                    <ListItem>
                        <Controller name="fullName" control={control} defaultValue="" rules={{
                            required: true,
                            minLength: 2,
                        }} render={({field})=>(
                            <TextField variant="outlined" fullWidth id="fullName" label="Full Name" inputProps={{type: 'name'}} 
                            error={Boolean(errors.fullName)}
                            helperText ={
                                errors.fullName ? 
                                errors.fullName.type === 'minLength'?
                                'Full Name length must be more than 1 '
                                :'Full Name is required'
                                :''}
                            {...field}></TextField>
                        )}>

                        </Controller>
                    </ListItem>
                    
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">Continue</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
