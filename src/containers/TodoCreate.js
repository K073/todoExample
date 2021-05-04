import React from "react";
import {Backdrop, Button, Fade, Grid, makeStyles, Modal, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function TodoCreate (props) {
    const classes = useStyles()

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            className={classes.modal}
            open={true}
            onClose={() => props.history.replace('/')}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={true}>
                <div className={classes.paper}>
                    <h2 id="spring-modal-title">Create TODO</h2>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid container
                              justify="center"
                              spacing={2}>
                            <Grid item xs='12'>
                                <TextField fullWidth id="outlined-basic" label="User Name" variant="outlined" />
                            </Grid>
                            <Grid item xs='12'>
                                <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
                            </Grid>
                            <Grid item xs='12'>
                                <TextField fullWidth id="outlined-basic" label="Description" variant="outlined" />
                            </Grid>
                            <Grid item xs='7'>
                                <Button fullWidth variant="contained" color="primary">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
}

export default TodoCreate;
