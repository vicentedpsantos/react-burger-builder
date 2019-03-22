import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import SideDrawerToggle from './SideDrawerToggle/SideDrawerToggle'

const toolbar = (props) => (
  <header className = {classes.Toolbar}>
    <SideDrawerToggle
      clicked = {props.clicked}/>
    <Logo/>
    <nav className={classes.DesktopOnly}>
      <NavigationItems/>
    </nav>
  </header>
);

export default toolbar;
