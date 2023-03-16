import { combineReducers } from 'redux';
import { createSelectorHook } from 'react-redux';
import ableReducer from './ableReducer';
import demoReducer from './demoReducer';
import counterReducer from './reducers/counterReducer';
import firebaseAuthReducer from './reducers/firebaseauthreducer';
import sessionReducer from './reducers/sessionreducer';

const reducer = combineReducers({
    able: ableReducer,
    demo: demoReducer,
    counter: counterReducer,
    firebaseauth: firebaseAuthReducer,
    sessionReducer: sessionReducer

});
export const useSelector = createSelectorHook();
export default reducer;
