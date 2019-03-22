import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  componentWillUpdate(){
    console.log("[OrderSummary.js componentWillUpdate]")
  }
  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return <li className = {classes.row}>
          <span className = {classes.IngredientName}> {igKey} </span>
          <span className = {classes.IngredientQuantity}>{this.props.ingredients[igKey]}</span>
        </li>
      })

    return(
      <Aux>
        <h3 className = {classes.OrderSummaryTitle}>Your order</h3>
        <p className = {classes.OrderMessage}>A delicious burger with the following ingredients</p>
        <ul className>
          {ingredientSummary}
        </ul>
        <p>Price: {this.props.totalPrice.toFixed(2)}</p>
        <p>Continue to Checkout?</p>
        <Button
          clicked={this.props.purchaseCanceled}
          buttonType="Danger">Cancel</Button>
        <Button
          clicked={this.props.purchaseContinued}
          buttonType="Success">Continue</Button>
      </Aux>
    );
  }
}

export default OrderSummary;
