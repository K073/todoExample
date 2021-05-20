import React from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {loginUserRequest} from "../store/actions/userActions";
import useForm from "../utils/useForm";

function Auth(){
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData)

    const keys = {
        username: 'username',
        password: 'password'
    }

    const validate = (values) => {
        let errors = {};
        if (!values[keys.username]) {
            errors[keys.username] = 'Username is required';
        }
        if (!values[keys.password]) {
            errors[keys.password] = 'Password is required'
        }
        return errors;
    }

    const {
        values,
        errors,
        submit,
        setErrors,
        isSubmitting,
        inputOnchange
    } = useForm((values) => dispatch(loginUserRequest(values)), validate, keys)


    // Пришлось сделать такой говнокод так как статус ответа 200 на не правильный пароль...
    if (userData?.status === 'error' && isSubmitting && !errors[keys.password]) {
        setErrors(userData.message);
    }

    return (
        <form onSubmit={submit} autoComplete="off">
            <Grid container
                  alignItems="center"
                  direction="column"
                  spacing={2}>
                <Grid item>
                    <TextField
                        fullWidth
                        label="User Name"
                        variant="outlined"
                        value={values[keys.username] || ''}
                        onChange={(e) => inputOnchange(e, keys.username)}
                        error={!!errors[keys.username] && isSubmitting}
                        helperText={isSubmitting && errors[keys.username]}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={values[keys.password] || ''}
                        onChange={(e) => inputOnchange(e, keys.password)}
                        error={!!errors[keys.password] && isSubmitting}
                        helperText={isSubmitting && errors[keys.password]}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Button fullWidth type={"submit"} variant="contained" color="primary">Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default Auth;
