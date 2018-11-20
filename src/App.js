import React, { Component } from "react";
import { Router , Route } from "react-router-dom";
import { connect } from 'react-redux';
import Address from "./components/Address";
import Block from "./components/Block";
import history from "./history";


import "./App.css";

import simpleAction from "./state/actions/actions";

class App extends Component {
  super(props){
    this.web3 = null;
  }

  componentDidMount(){

  }
  render() {

    
    return (
      <Router history={history}>
        <div className="app">
       <div className="left-bar"></div>
       <div className="app-container">
        <Route exact path="/address/:id" component={Address} />
        <Route exact path="/address/" component={Address} />
        <Route exact path="/block/:id" component={Block} />
        <Route exact path="/block/" component={Block} />
        <Route exact path="/" component={Address} />
        </div>
        <div className="right-bar"></div>
      </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })

 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);