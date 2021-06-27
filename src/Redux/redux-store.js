import { applyMiddleware, combineReducers, createStore } from "redux";
import mainPageReducer from './mainpage-reducer.js';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    mainPage:  mainPageReducer,
});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;