import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        {props.isAuthenticated
            ? <NavigationItem link='/logout'>Log out</NavigationItem>
            : <NavigationItem link='/auth'>Log in</NavigationItem>}
    </ul>

);

export default navigationItems;