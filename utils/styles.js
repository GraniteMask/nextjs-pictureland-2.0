import {makeStyles} from "@material-ui/core" 

const useStyles = makeStyles({
    navbar:{
        backgroundColor: "#203040",
        '& a':{
            color: "#FFFFFF",
            marginLeft: 10,   //by default it is 10px
        },
    },
    main:{
        minHeight: "80vh",
    },
    footer:{
        textAlign: "center",
        marginTop: 10,
    },
    brand:{
        fontWeight: 'bold',
        fontSize: '1.5rem',
    },
    grow:{
        flexGrow: 1,
    },
    section:{
        marginTop: 10,
        marginBottom:10,
    },
    form:{
        width: "100%",
        maxWidth: 800,
        margin: '0 auto',
    },
    navbarButton:{
        color: '#ffffff',
        textTransform: 'initial'
    },
    transparentBackground:{
        backgroundColor: 'transparent'
    },
    error:{
        color:'#f04040'
    },
    fullWidth:{
        width: '100%'
    },
    reviewForm:{
        maxWidth: 800,
        width: '100%',
    },
    reviewItems:{
        marginRight: '1rem',
        borderRight: '1px #808080 solid',
        paddingRight: '1rem', 
    }

});

export default useStyles