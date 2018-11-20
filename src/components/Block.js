import React, { Component } from "react";
import { connect } from "react-redux";



import { getBlocks_THUNK } from "../state/actions/actions";

import SimpleBlock from "./SimpleBlock";
import {ClipLoader} from "react-spinners";

class Block extends Component {
  constructor(props) {
    super(props);


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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block);
