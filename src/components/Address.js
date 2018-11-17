import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import { getTransactions_THUNK } from "../state/actions/actions";
import SingleAddressTX from "./SingleAddressTx";
import { stat } from "fs";

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
    console.log("STate", this.props.transactions);
  }
  render() {
    console.log(
      "In render:",
      this.props.transactions.slice(this.state.from, this.state.to)
    );

    return (
      <div>
        {this.props.transactions
          .slice(this.state.from, this.state.to)
          .map(tx => (
            <SingleAddressTX key={tx.hash} to={tx.to} value={tx.value} />
          ))}
        <h3>Address: {this.props.match.params.id}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state,
  isFetching: state.simpleReducer.isFetching,
  transactions: state.simpleReducer.transactions,
  blocks: state.simpleReducer.blocks,
  apiError: state.simpleReducer.apiError,
  apiErrorMSG: stat.simpleReducer.apiErrorMSG,
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
