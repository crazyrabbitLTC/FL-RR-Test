import axios from "axios";

import {
  FETCH_ACTION,
  GET_TRANSACTIONS,
  SET_TRANSACTIONS,
  GET_BLOCKS,
  SET_BLOCKS,
  API_ERROR
} from "./types";

const isFetching = bool => {
  return {
    type: FETCH_ACTION,
    bool
  };
};

const setTransactions = transactions => {
  return {
    type: SET_TRANSACTIONS,
    transactions
  };
};

const setBlocks = blocks => {
  return {
    type: SET_BLOCKS,
    blocks
  };
};

const getTransactions = bool => {
  return {
    type: GET_TRANSACTIONS,
    bool
  };
};

const getBlocks = bool => {
  return {
    type: GET_BLOCKS,
    bool
  };
};

const setApiError = bool => {
  return {
    type: API_ERROR,
    bool
  };
};

//-------- THUNKS

// export const tokenAddMinter_THUNK = minterAddress => {
//   return async dispatch => {
//     dispatch(setTokenFetching(true));
//     try {
//       const coinbase = await web3.eth.getCoinbase();
//       const tokenInstance = await token.deployed();
//       tokenInstance.addMinter(minterAddress).call({ from: coinbase });

//     } catch (error) {
//       dispatch(setTokenFetching(false));
//       dispatch(setTxError(true));
//       console.log(error);
//     }
//     dispatch(setTokenFetching(false));
//   };
// };

const apiRequestObject = {
    base: "http://api.etherscan.io/api?",
    address: "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a"
    
}

const getTransactions_THUNK = address => {
  return async dispatch => {
    dispatch(isFetching(true));
    try {
      const transactions = await axios.get(
        `http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`
      );

      //
      dispatch(isFetching(false));
    } catch (error) {
      dispatch(isFetching(false));
      dispatch(setApiError(true));
      console.error(error);
    }
  };
};

export default {
  isFetching,
  setTransactions,
  setBlocks,
  getTransactions,
  getBlocks,
  getTransactions_THUNK
};
