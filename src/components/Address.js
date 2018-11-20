import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import web3 from "web3";

import { getTransactions_THUNK, isFetching } from "../state/actions/actions";
import SimpleTable from "./SimpleTable";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import nav from "../nav";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: theme.spacing.unit,
    width: "90%",
  }
});

class Address extends Component {
  constructor(props) {
    super(props);

    this.classes = this.props.classes;
    this.state = {
      from: 0,
      to: 10,
      address: "0x0"
    };
  }

  componentDidMount() {

    this.props.getTransactions(this.props.match.params.id);
    this.setState({ address: this.props.match.params.id });
    console.log("STate", this.props.transactions);

  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.match.params.id !== this.props.match.params.id) {

      this.setState({ address: this.props.match.params.id });
      this.props.getTransactions(this.props.match.params.id);
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleLoadNewAddress = () => {
    console.log("Search Clicked")
    this.props.getTransactions(this.state.address);
    nav(this.state.address);
  };

  render() {
    console.log(
      "In render:",
      this.props.transactions.slice(this.state.from, this.state.to)
    );

    return (
      <div>
        {this.props.isFetching ? <div>loading..</div> : <span></span>}
        <h3>Address: {this.props.match.params.id || "0x0..."}</h3>
        <h4>Total Transactions: {this.props.transactions.length || 0}</h4>
        <div className="address-bar">
          <Button variant="outlined" className={this.classes.button} onClick={this.handleLoadNewAddress}>
            Search
          </Button>
          <Input
            placeholder={this.props.match.params.id || "0x0..."}
            className={this.classes.input}
            onChange={this.handleInputChange}
            value={this.state.address}
            name="address"
            inputProps={{
              "aria-label": "Description"
            }}
          />
        </div>

        <form className="addressForm">
          <label>
            From:
            <input
              name="from"
              type="number"
              value={this.state.from}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            To:
            <input
              name="to"
              type="number"
              value={this.state.to}
              onChange={this.handleInputChange}
            />
          </label>
        </form>

        {this.props.transactions
          .slice(this.state.from, this.state.to)
          .map(tx => (
            // <SingleAddressTX key={tx.hash} from={tx.from} to={tx.to} hash={tx.hash} value={parseFloat(web3.utils.fromWei(tx.value))} blockNumber={tx.blockNumber} />
            <SimpleTable
              key={tx.hash}
              from={tx.from}
              to={tx.to}
              hash={tx.hash}
              value={parseFloat(web3.utils.fromWei(tx.value))}
              blockNumber={tx.blockNumber}
            />
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
  apiErrorMSG: state.simpleReducer.apiErrorMSG
});

const mapDispatchToProps = dispatch => ({
  getTransactions: address => {
    dispatch(getTransactions_THUNK(address));
  },
  setLoadingStatus: status => {
    dispatch(isFetching(status));
  }
});

Address.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Address));
