import * as actions from '../actions/actions';
import {updateObject} from "../../shared/utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };

            return updateObject(state, updatedState);
        case actions.REMOVE_INGREDIENT:
            const removeIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const ingredients = updateObject(state.ingredients, removeIngredient);
            const removedState = {
                ingredients: ingredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };

            return updateObject(state, removedState);
        case actions.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            });
        case actions.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {
                error: true
            });
        default:
            return state;
    }

};

export default burgerBuilderReducer;