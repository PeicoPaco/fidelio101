import * as actionTypes from '../actions';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
      case actionTypes.INCREMENT:
        return state + 1;
      case actionTypes.DECREASE: 
        return state - 1;
      case actionTypes.INCREMENTPARAMETER:
        return state + action.addnumber;
      default: 
        return state;   
  }
}

export default counterReducer;