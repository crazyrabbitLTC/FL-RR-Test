import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import web3 from "web3";

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

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getTransactions(this.props.match.params.id);
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    console.log(
      "In render:",
      this.props.transactions.slice(this.state.from, this.state.to)
    );

    return (
      <div>
        <h3>Address: {this.props.match.params.id}</h3>
        <h4>Total Transactions: {this.props.transactions.length}</h4>

      <form>
        <label>
          From:
          <input
            name="from"
            type="number"
            value={this.state.from}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          To:
          <input
            name="to"
            type="number"
            value={this.state.to}
            onChange={this.handleInputChange} />
        </label>
      </form>

        {this.props.transactions
          .slice(this.state.from, this.state.to)
          .map(tx => (
            <SingleAddressTX key={tx.hash} from={tx.from} to={tx.to} hash={tx.hash} value={parseFloat(web3.utils.fromWei(tx.value))} blockNumber={tx.blockNumber} />
          ))}
        
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
  apiErrorMSG: state.simpleReducer.apiErrorMSG,
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
