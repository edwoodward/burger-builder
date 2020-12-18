import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axiosOR';
import { connect } from 'react-redux';
import * as bbActions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount () {
        this.props.onFetchIngredients();
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState( { purchasing: true } );
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }

    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ingredients ) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        added={this.props.onAddIngredient}
                        removed={this.props.onDeleteIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.totalPrice} />
                </React.Fragment>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch(bbActions.addIngredients(ingredient)),
        onDeleteIngredient: (ingredient) => dispatch(bbActions.removeIngredients(ingredient)),
        onFetchIngredients: () => dispatch(bbActions.fetchIngredients()),
        onInitPurchase: () => dispatch(bbActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(bbActions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));