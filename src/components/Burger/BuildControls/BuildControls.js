import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' }
];

const buildControls = (props) => (
  <div className = {classes.BuildControls}>
    <p className = {classes.TotalPrice}> Current Price: {props.price.toFixed(2)} </p>
    {controls.map(ctrl => (
      <BuildControl
      key = {ctrl.label}
      label = {ctrl.label}
      added = {() => props.ingredientAdded(ctrl.type)}
      removed = {() => props.ingredientRemoved(ctrl.type)}
      disabledLess = {props.disabledLess[ctrl.type]}
      disabledMore = {props.disabledMore[ctrl.type]}/>
    ))}

    <button
      className = {classes.OrderNowButton}
      disabled = {!props.purchasable}
      onClick = {props.ordered}>Order Now</button>
  </div>
);

export default buildControls;
