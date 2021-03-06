import React from "react";
import {AppBar, Button, Link, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUserFailure} from "../store/actions/userActions";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    logo: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData)



    return <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    <Link color={"inherit"} component={RouterLink} to={'/'}>
                        TODO
                    </Link>
                </Typography>
                <nav className={classes.title}>
                    <Typography variant="h6">
                        <Link color={"inherit"} component={RouterLink} to={'/create'}>
                            Create
                        </Link>
                    </Typography>
                </nav>
                {userData?.message?.token ? <Button color="inherit" onClick={() => dispatch(loginUserFailure())} >Exit</Button> : <Button color="inherit" component={RouterLink} to={"/login"}>Login</Button>}
            </Toolbar>
        </AppBar>
    </div>
}

export default Header;
