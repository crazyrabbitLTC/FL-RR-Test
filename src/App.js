import React, { Component } from "react";
import { BrowserRouter as Router , Route, Link} from "react-router-dom";
import Child from "./components/BrowserBar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
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

      <Route path="/address/:id" component={Child} />
      <Route path="/block/:id" component={Child} />

        {/* <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} /> */}
      </div>
      </Router>
    );
  }
}

export default App;
