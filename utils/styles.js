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
    }

});

export default useStyles