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
    },
});

export default useStyles