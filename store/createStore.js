import {createStore, combineReducers} from 'redux';
import loginReducer from './login/loginReducer';
const rootReducer = combineReducers({loginReducer});
export const store = createStore(rootReducer);
