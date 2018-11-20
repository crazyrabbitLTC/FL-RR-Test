import React from "react";
import {Link } from "react-router-dom";

import web3 from "web3"

function SingleBlock({
  blockNumber,
  timeStamp,
  blockMiner,
  blockReward = "0",
}) {


  return (
    <div className="SingleBlock">
    <br/>
    <div>Block Miner: 
        <Link to={`/address/${blockMiner}`}>{blockMiner}</Link></div>
        
        <div>BlockNumber: {blockNumber}</div>
        <div>TimeStamp: {timeStamp}</div>
        <div>BlockReward: {web3.utils.fromWei(blockReward, 'ether')}</div>
        <br/>
    </div>
  );
}

export default SingleBlock;

// blockNumber: "2165403",
// timeStamp: "1472533979",
// blockMiner: "0x13a06d3dfe21e0db5c016c03ea7d2509f7f8d1e3",
// blockReward: "5314181600000000000",
// uncles: [
// {
// miner: "0xbcdfc35b86bedf72f0cda046a3c16829a2ef41d1",
// unclePosition: "0",
// blockreward: "3750000000000000000"
// },
// {
// miner: "0x0d0c9855c722ff0c78f21e43aa275a5b8ea60dce",
// unclePosition: "1",
// blockreward: "3750000000000000000"
// }
// ],
// uncleInclusionReward: "312500000000000000"
// }parseFloat(web3.utils.fromWei(