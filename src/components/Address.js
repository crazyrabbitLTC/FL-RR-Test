import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import { getTransactions_THUNK } from "../state/actions/actions";

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: 0,
      to: 10
    };
  }

  componentDidMount() {
    this.props.getTransactions(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        {" "}
        <h3>Block: {this.props.match.params.id}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getTransactions: address => {
    dispatch(getTransactions_THUNK(address));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Address);
