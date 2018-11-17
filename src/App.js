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
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />



        {/* <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} /> */}
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