import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let totalIngredients = props.totalIngredients;
  let warning = null;
  if (totalIngredients === 0) {
    warning = <p>Please start adding ingredients</p>
  }
  return (
    <div className = {classes.Burger}>
      {warning}
      <BurgerIngredient
        quantity = {1}
        type = "bread-top"/>
      <BurgerIngredient
        quantity = {props.ingredients.cheese}
        type = "cheese" />
      <BurgerIngredient
        quantity = {props.ingredients.meat}
        type = "meat" />
      <BurgerIngredient
        quantity = {props.ingredients.bacon}
        type = "bacon" />
      <BurgerIngredient
        quantity = {props.ingredients.salad}
        type = "salad" />
      <BurgerIngredient
        quantity = {1}
        type = "bread-bottom"/>
    </div>
  );
};

export default burger;
