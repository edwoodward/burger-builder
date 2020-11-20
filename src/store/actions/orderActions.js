import * as actions from './actions';
import axios from '../../axios';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actions.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actions.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actions.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json', orderData )
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
            } );
    };
};

export const purchaseInit = () => {
    return {
        type: actions.PURCHASE_INIT
    }
};