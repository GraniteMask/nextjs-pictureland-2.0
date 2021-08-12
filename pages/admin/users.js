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
import { Button, Card, CircularProgress, Grid, ListItem, ListItemText, TableBody, TableCell, TableContainer, Typography, List, Table, TableHead, TableRow} from '@material-ui/core'
import useStyles from '../../utils/styles'
import NextLink from 'next/link'
import { useSnackbar } from 'notistack'

function reducer(state, action){
    switch(action.type){
        case "FETCH_REQUEST":
            return {...state, loading: true, error:''}
        case 'FETCH_SUCCESS':
            return {...state, loading: false, users: action.payload, error:''}
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'DELETE_REQUEST':
            return {...state, loadingDelete: true}
        case 'DELETE_SUCCESS':
            return {...state, loadingDelete: false, successDelete: true}
        case 'DELETE_FAIL':
            return {...state, loadingDelete: false}
        case 'DELETE_RESET':
            return {...state, loadingDelete: false, successDelete: false}
        default:
            state
    }
}

function Users() {
    const {state} = useContext(Store)
    const { userInfo } = state
    const router = useRouter()
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()


    const [{loading, error, users, successDelete, loadingDelete}, dispatch] = useReducer(reducer, {loading: true, users:[], error:''})

    useEffect(()=>{
        if(!userInfo){
            router.push('/login')
        }
        const fetchData = async () =>{
            try{
                dispatch({type: 'FETCH_REQUEST'})
                const {data} = await axios.get(`/api/admin/users`,{
                    headers: {authorization: `Bearer ${userInfo.token}`}
                })
                dispatch({type:'FETCH_SUCCESS', payload:data})
            }catch(err){
                dispatch({type:'FETCH_FAIL', payload:getError(err)})
            }
        }
        if(successDelete){
            dispatch({type: 'DELETE_RESET'})
        }else{
            fetchData()
        }
        
    }, [successDelete])

    const deleteHandler = async(userId) =>{
        if(!window.confirm('Are you sure?')){
            return
        }
        try{
            dispatch({type: 'DELETE_REQUEST'})
            await axios.delete(
                `/api/admin/users/${userId}`,
                {
                    headers: {authorization: `Bearer ${userInfo.token}`}
                }
            )
            dispatch({type: 'DELETE_SUCCESS'})
            enqueueSnackbar("User deleted successfully", {variant: 'success'})
        }catch(err){
            dispatch({type: 'DELETE_FAIL'})
            enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {variant: 'error'})
        }
    }

    return (
        <Layout title='User History'>
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
                                <ListItem  button component="a">
                                    <ListItemText primary="Products"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href="/admin/users" passHref>
                                <ListItem selected button component="a">
                                    <ListItemText primary="Users"></ListItemText>
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
                                    Users
                                </Typography>
                                {loadingDelete && <CircularProgress />}
                                   
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
                                                <TableCell>EMAIL</TableCell>
                                                <TableCell>ISADMIN</TableCell>
                                                <TableCell>ACTION</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((user)=>(
                                                <TableRow key={user._id}>
                                                    <TableCell>{user._id.substring(20, 24)}</TableCell>
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.isAdmin ? 'YES':'NO'}</TableCell>
                                                    <TableCell>
                                                        <NextLink href={`/admin/user/${user._id}`} passHref>
                                                            <Button size="small" variant="contained">Edit</Button>
                                                        </NextLink>{' '}
                                                        <Button size="small" variant="contained" onClick={()=>deleteHandler(user._id)}>Delete</Button>
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

export default dynamic(()=> Promise.resolve(Users),{ssr:false})