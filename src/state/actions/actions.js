import axios from "axios";
//This should be a simple secrets.js file that exports an etherscan apiKey
import apiKey from "../../secrets";
import {
  FETCH_ACTION,
  GET_TRANSACTIONS,
  SET_TRANSACTIONS,
  GET_BLOCKS,
  SET_BLOCKS,
  API_ERROR,
  SET_API_ERROR_MSG
} from "./types";

export const isFetching = bool => {
  return {
    type: FETCH_ACTION,
    bool
  };
};

export const setTransactions = transactions => {
  return {
    type: SET_TRANSACTIONS,
    transactions
  };
};

export const setBlocks = blocks => {
  return {
    type: SET_BLOCKS,
    blocks
  };
};

export const getTransactions = bool => {
  return {
    type: GET_TRANSACTIONS,
    bool
  };
};

export const getBlocks = bool => {
  return {
    type: GET_BLOCKS,
    bool
  };
};

export const setApiError = bool => {
  return {
    type: API_ERROR,
    bool
  };
};

export const setApiErrorMsg = MSG => {
    return {
        type: SET_API_ERROR_MSG,
        MSG
    }
}
//-------- THUNKS

export const getTransactions_THUNK = address => {
  return async dispatch => {
    dispatch(isFetching(true));
    try {
      const transactions = await axios.get(
        `http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
      );

        if(transactions.data.message === "OK"){
            dispatch(setTransactions(transactions.data.result));
            dispatch(isFetching(false));
        } else {

            dispatch(setApiError(true));
            dispatch(setApiErrorMsg(transactions.data.message));
            dispatch(isFetching(false));
        }
    } catch (error) {
      dispatch(isFetching(false));
      dispatch(setApiError(true));
      console.error(error);
    }
  };
};

export const getBlocks_THUNK = block => {
    return async dispatch => {
      dispatch(isFetching(true));
      try {
        const transactions = await axios.get(
          `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${block}&apikey=YourApiKeyToken${apiKey}`
        );

        if(transactions.data.message === "OK"){
            dispatch(setBlocks(transactions.data.result));
            dispatch(isFetching(false));
        } else {

            dispatch(setApiError(true));
            dispatch(isFetching(false));
        }
        
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
  getTransactions_THUNK,
  getBlocks_THUNK,
};


