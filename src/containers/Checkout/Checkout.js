import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    purchaseCancelledHandler = () => {
        this.props.history.goBack();
    }

    purchaseContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/'/>

        if (this.props.ingredients) {
            const purchaseRedirect = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <div>
                    { purchaseRedirect }
                    <CheckoutSummary ingredients={this.props.ingredients}
                                     purchaseCancelled={this.purchaseCancelledHandler}
                                     purchaseContinued={this.purchaseContinuedHandler}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
            );
        }
        return summary;

    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }

};

export default connect(mapStateToProps)(Checkout);