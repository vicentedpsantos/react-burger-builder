import React, { Component } from 'react';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import Aux from '../Aux/Aux';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerOpenedHandler = () => {
    this.setState({
      showSideDrawer: true
    })
  }

  render () {
    return (  <Aux>
        <SideDrawer
          closed = {this.sideDrawerClosedHandler}
          open = {this.state.showSideDrawer}/>
        <Toolbar
          clicked = {this.sideDrawerOpenedHandler}/>
        <main className = {classes.Content}>
          {this.props.children}
        </main>
      </Aux>)
  }
};

export default Layout;
