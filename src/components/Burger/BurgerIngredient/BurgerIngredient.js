import React, { Component } from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {

  render () {
    let ingredient = [];
    var i;
    for (i = 0; i < this.props.quantity; i++) {
      switch (this.props.type) {
        case ('bread-bottom'):
          ingredient = <div className = {classes.BreadBottom}></div>;
          break;
        case ('bread-top'):
          ingredient = (
            <div className = {classes.BreadTop}>
              <div className = {classes.Seeds1}></div>
              <div className = {classes.Seeds2}></div>
            </div>
          );
          break;
        case ('meat'):
          ingredient.push(<div className = {classes.Meat}></div>)
          break;
        case ('cheese'):
          ingredient.push(<div className = {classes.Cheese}></div>)
          break;
        case ('salad'):
          ingredient.push(<div className = {classes.Salad}></div>)
          break;
        case ('bacon'):
          ingredient.push(<div className = {classes.Bacon}></div>)
          break;
        default:
          ingredient = null;
      }

    }
    return ingredient;
  };
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};


export default BurgerIngredient;
