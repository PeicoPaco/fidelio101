
import * as actionTypes from '../actions';

const initialState = {
  currentUser: null,
}

const firebaseAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOG_IN: 
      return {
        ...state,
        currentUser: action.currentUser,
      }
    case actionTypes.LOG_OUT: 
      return {
        ...state,
        currentUser: null,
      }
    default: 
      return state
  }
}

export default firebaseAuthReducer;