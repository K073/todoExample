export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'

export const loginUserRequest = (authData) => ({
    type: LOGIN_USER_REQUEST, authData
})

export const loginUserSuccess = (userData) => ({
    type: LOGIN_USER_SUCCESS, userData
})

export const loginUserFailure = (error) => ({
    type: LOGIN_USER_FAILURE, error
})
