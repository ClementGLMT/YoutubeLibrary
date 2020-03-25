import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import initialState from './initialState';
import thunk from 'redux-thunk';


export const store = createStore(reducer, initialState, applyMiddleware(thunk));