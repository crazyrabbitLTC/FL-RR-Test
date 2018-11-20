import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
import { getBlocks_THUNK } from "../state/actions/actions";
import SimpleBlock from "./SimpleBlock";
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
    width: "90%"
  }
});

class Block extends Component {
  constructor(props) {
    super(props);

    this.classes = this.props.classes;
    this.state = {
      from: 0,
      to: 10,
      blockNum: ""
    };
  }

  componentDidMount() {
    this.props.getBlocks(this.props.match.params.id);

  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getBlocks(this.props.match.params.id);
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

  handleLoadNewblockNum = () => {
    this.props.getBlocks(this.state.blockNum);
    nav(this.state.blockNum);
  };


  render() {

    const {
      timeStamp,
      blockMiner,
      blockReward,
      blockNumber
    } = this.props.blocks;


    
    return (
      <div className="table-container">
      
      <h3>BlockNumber: {blockNumber || "0x0..."}</h3>
      <div className="address-bar">
          <Button
            variant="outlined"
            className={this.classes.button}
            onClick={this.handleLoadNewblockNum}
          >
            Search
          </Button>
          <Input
            placeholder={"blocknumber..."}
            className={this.classes.input}
            onChange={this.handleInputChange}
            value={this.state.blockNum}
            name="blockNum"
            inputProps={{
              "aria-label": "Description"
            }}
          />
        </div>

      {this.props.isFetching ? 
              <React.Fragment><ClipLoader
                className="BarLoader"
                sizeUnit={"px"}
                size={50}
                color={'#123abc'}
                loading={this.props.isFetching}
              /></React.Fragment> :
        <SimpleBlock
          timeStamp={timeStamp}
          blockMiner={blockMiner}
          blockReward={blockReward}
          blockNumber={blockNumber}
        />}
<div className="footer">Made by dennison@dennisonbertram.com</div>
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
  getBlocks: block => {
    dispatch(getBlocks_THUNK(block));
  }
});

Block.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Block));
