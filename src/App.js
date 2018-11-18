import React, { Component } from "react";
import { BrowserRouter as Router , Route, Link} from "react-router-dom";
import { connect } from 'react-redux';
import Address from "./components/Address";
import Block from "./components/Block";

import "./App.css";

import simpleAction from "./state/actions/actions";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
        <Route path="/address/:id" component={Address} />
        <Route path="/block/:id" component={Block} />
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