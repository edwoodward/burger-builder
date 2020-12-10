import * as actions from './actions';
import axios from '../../axiosOR';

export const addIngredients = (name) => {
    return {
        type: actions.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredients = (name) => {
    return {
        type: actions.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actions.SET_INGREDIENTS,
        ingredients: ingredients,
        error: false
    };

};

export const fetchIngredientsFailed = () => {
    return {
        type: actions.FETCH_INGREDIENTS_FAILED,
    };
};

export const fetchIngredients = () => {
    return dispatch => {
        axios.get( 'https://ew-burger-builder.firebaseio.com/ingredients.json' )
            .then( response => {
                dispatch(setIngredients(response.data));
            } )
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            } );
    }
};