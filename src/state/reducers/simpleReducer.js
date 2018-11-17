/*
 src/reducers/simpleReducer.js
*/
import types from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
     case types.SIMPLE_ACTION:
      return {
       result: action.payload
      }
     default:
      return state
    }
   }