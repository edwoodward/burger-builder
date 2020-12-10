import * as actions from '../actions/actions';
import {updateObject} from "../utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actions.AUTH_SUCCESS:
            return updateObject(state, { token: action.idToken, userId: action.userId, error: null, loading: false});
        case actions.AUTH_FAIL:
            return updateObject(state, {error: action.error,loading: false} );
        case actions.AUTH_LOGOUT:
            return updateObject(state, {token: null,userId: null} );
        default:
            return state;


    }
}

export default reducer;