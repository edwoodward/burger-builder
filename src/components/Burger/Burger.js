import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    //convert property to an array
    const ingredientsArray = Object.keys(props.ingredients).map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_,i) => {
            return <BurgerIngredient type={ingredientKey} key={ingredientKey + i}/>
        });
    }).reduce((array, element) => {
        return array.concat(element)
    },[]);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {ingredientsArray.length > 0 ? ingredientsArray : 'Please select some ingredients'}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default withRouter(burger);