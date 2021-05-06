import React, {useState} from "react";
import {Backdrop, Button, Fade, Grid, makeStyles, Modal, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {createTodoRequest} from "../store/actions/todoActions";

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
    const dispatch = useDispatch();

    const keys = {
        email: 'email',
        username: 'username',
        text: 'text'
    }

    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputOnchange = ({target: {value}}, name) => {
        const errors = validate({...values, [name]: value});
        setValues({...values, [name]: value})
        setErrors(errors);
    }

    const submit = (e) => {
        e.preventDefault()
        const errors = validate(values)
        setIsSubmitting(true)
        if (Object.keys(errors).length === 0) {
            dispatch(createTodoRequest(values))
        } else {
            setErrors(errors)
        }
    }

    const validate = (values) => {
        let errors = {};
        if (!values[keys.email]) {
            errors[keys.email] = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(values[keys.email])) {
            errors[keys.email] = 'Email address is invalid';
        }
        if (!values[keys.username]) {
            errors[keys.username] = 'Username is required';
        }
        if (!values[keys.text]) {
            errors[keys.text] = 'Text is required'
        }
        return errors;
    }

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
                    <form className={classes.root} onSubmit={submit} autoComplete="off">
                        <Grid container
                              justify="center"
                              spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="User Name"
                                    variant="outlined"
                                    value={values[keys.username]}
                                    onChange={(e) => inputOnchange(e, keys.username)}
                                    error={!!errors[keys.username] && isSubmitting}
                                    helperText={isSubmitting && errors[keys.username]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    value={values[keys.email]}
                                    onChange={(e) => inputOnchange(e, keys.email)}
                                    error={!!errors[keys.email] && isSubmitting}
                                    helperText={isSubmitting && errors[keys.email]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Text"
                                    variant="outlined"
                                    value={values[keys.text]}
                                    onChange={(e) => inputOnchange(e, keys.text)}
                                    error={!!errors[keys.text] && isSubmitting}
                                    helperText={isSubmitting && errors[keys.text]}
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <Button fullWidth type={"submit"} variant="contained" color="primary">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Fade>
        </Modal>
    );
}

export default TodoCreate;
