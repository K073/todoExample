import { useState } from 'react';

const useForm = (callback, validate) => {

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
            callback(values)
        } else {
            setErrors(errors)
        }
    }
    return {
        submit,
        inputOnchange,
        setErrors,
        errors,
        values,
        isSubmitting,
    }
}

export default useForm;
