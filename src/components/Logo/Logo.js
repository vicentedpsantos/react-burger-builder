import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img
      className={classes.Img}
      src={burgerLogo}
      alt="My Burger Logo"/>
  </div>
);

export default logo;
