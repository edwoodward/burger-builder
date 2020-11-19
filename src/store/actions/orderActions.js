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

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post( '/orders.json', orderData )
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data, orderData));
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
            } );
    };
};