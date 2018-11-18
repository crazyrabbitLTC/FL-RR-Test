import React, { Component } from "react";
import { connect } from "react-redux";

import web3 from "web3";

import { getBlocks_THUNK } from "../state/actions/actions";
import SingleBlock from "./SingleBlock";

class Block extends Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {
    this.props.getBlocks(this.props.match.params.id);
    console.log("STate", this.props.transactions);
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getBlocks(this.props.match.params.id);
    }
  }



  render() {
    console.log("In render blocks:", this.props.blocks);
    const {
      timeStamp,
      blockMiner,
      blockReward,
      blockNumber
    } = this.props.blocks;

    return (
      <div>
        <h3>blockNumber: {this.props.match.params.id}</h3>

        <SingleBlock
          timeStamp={timeStamp}
          blockMiner={blockMiner}
          blockReward={blockReward}
          blockNumber={blockNumber}
        />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block);
