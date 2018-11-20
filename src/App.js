import React, { Component } from "react";
import { Router , Route, Link} from "react-router-dom";
import { connect } from 'react-redux';
import Address from "./components/Address";
import Block from "./components/Block";
import history from "./history";

import "./App.css";

import simpleAction from "./state/actions/actions";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="app">
       <div className="left-bar"></div>
        <Route path="/address/:id" component={Address} />
        <Route path="/block/:id" component={Block} />
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