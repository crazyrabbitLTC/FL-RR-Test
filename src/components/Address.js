import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
import web3 from "web3";
import { getTransactions_THUNK, isFetching } from "../state/actions/actions";
import SingleAddress from "./SingleAddress";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import nav from "../nav";
import { withWeb3 } from "react-web3-provider";
import { Link } from "react-router-dom";

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
    width: "90%"
  }
});

class Address extends Component {
  constructor(props) {
    super(props);

    this.classes = this.props.classes;
    this.state = {
      from: 0,
      to: 10,
      address: "",
      web3Account: ""
    };
  }

  componentDidMount() {
    this.props.getTransactions(this.props.match.params.id);
    this.getWeb3Account();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({ from: 0, to: 10 });
      this.props.getTransactions(this.props.match.params.id);
    }
  }

  getWeb3Account = async () => {
    const { web3 } = this.props;
    const account = await web3.eth.getAccounts();
    this.setState({ ...this.state, web3Account: account[0] });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleLoadNewAddress = () => {
    const address = this.state.address;
    this.setState({ ...this.state, address: "" });
    this.props.getTransactions(address);
    nav(address);
  };

  render() {

    const {isFetching, transactions, match} = this.props;

    return (
      <div className="table-container">
        <h3>Address: {match.params.id || "0x0..."}</h3>
        {this.state.web3Account ? (
          <div className="user-web3">
            Your Account:{" "}
            <Link to={`/address/${this.state.web3Account}`}>
              {this.state.web3Account}
            </Link>
          </div>
        ) : (
          <div>No web3 found.</div>
        )}
        <h4>Total Transactions: {transactions.length || 0}</h4>
        <div className="address-bar">
          <Button
            variant="outlined"
            className={this.classes.button}
            onClick={this.handleLoadNewAddress}
          >
            Search
          </Button>
          <Input
            placeholder={"0x0..."}
            className={this.classes.input}
            onChange={this.handleInputChange}
            value={this.state.address}
            name="address"
            inputProps={{
              "aria-label": "Description"
            }}
          />
        </div>

        <div className="bar-loader">
          {isFetching ? (
            <React.Fragment>
              <ClipLoader
                className="BarLoader"
                sizeUnit={"px"}
                size={50}
                color={"#123abc"}
                loading={isFetching}
              />
            </React.Fragment>
          ) : (
            <div>
              {this.renderPagination(transactions)}
              {transactions
                .slice(this.state.from, this.state.to)
                .map(tx => (
                  <SingleAddress
                    key={tx.hash}
                    from={tx.from}
                    to={tx.to}
                    hash={tx.hash}
                    value={parseFloat(web3.utils.fromWei(tx.value))}
                    blockNumber={tx.blockNumber}
                    confirmations={tx.confirmations}
                  />
                ))}
            </div>
          )}
        </div>
        <div className="footer">Made by dennison@dennisonbertram.com</div>
      </div>
    );
  }

  //This Creates the "pagination" offered for Accounts with many transactions. 
  renderPagination(transactions) {
    return (
      <form className="address-form">
        <label>
          From:{" "}
          <input
            name="from"
            type="number"
            value={this.state.from}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          To:{" "}
          <input
            name="to"
            type="number"
            value={
              this.state.to < transactions.length
                ? this.state.to
                : transactions.length
            }
            onChange={this.handleInputChange}
          />
        </label>
      </form>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWeb3(withStyles(styles)(Address)));
