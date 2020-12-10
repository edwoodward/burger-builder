import * as actions from './actions';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actions.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actions.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actions.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true

        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        if(isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        }
        console.log('isSignUp: ' + isSignUp)
        console.log(url);
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));

            })
            .catch(err => {
                console.log(err.response);
                dispatch(authFailed(err.response.data.error));
            })

    };
};

