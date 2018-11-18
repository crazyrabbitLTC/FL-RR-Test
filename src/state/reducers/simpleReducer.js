/*
 src/reducers/simpleReducer.js
*/
import types from '../actions/types';

const defaultState = {
  isFetching: false,
  transactions: [],
  blocks: {},
  apiError: false,
  apiErrorMSG: "",
}

export default (state = defaultState, action) => {
    switch (action.type) {
     case types.SIMPLE_ACTION:
      return {
        ...state,
       result: action.payload
      }
      case types.FETCH_ACTION:
      return {
        ...state,
        isFetching: action.bool
      }
      case types.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions
      }
      case types.SET_BLOCKS:
      return {
        ...state,
        blocks: action.blocks
      }
      case types.API_ERROR:
      return {
        ...state, 
        apiError: action.bool
      }
      case types.SET_API_ERROR_MSG:
      return {
        ...state,
        apiErrorMSG: action.MSG
      }


     default:
      return state
    }
   }