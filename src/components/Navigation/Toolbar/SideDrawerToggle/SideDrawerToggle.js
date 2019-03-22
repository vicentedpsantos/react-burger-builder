import React from 'react';
import burgerToggle from '../../../../assets/images/burger.png'
import classes from './SideDrawerToggle.module.css'

const sideDrawerToggle = (props) => (
  <div>
    <img
      className = {classes.Img}
      src={burgerToggle}
      alt="Sidedrawer Toggle Button"
      onClick = {props.clicked}/>
  </div>
);

export default sideDrawerToggle;
