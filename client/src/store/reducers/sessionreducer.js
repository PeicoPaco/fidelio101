import * as actionTypes from '../actions';

const initialState = {
  idLocal: '',
  profile: []
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: 
      return {
        ...state,
        idLocal: action.user.fidelioTeam,
        profile: action.user.profile,
      }
    case actionTypes.RESET_USER:
      return {
        ...state,
        profile: [],
      }
    default: 
      return state
  }
}

export default sessionReducer;