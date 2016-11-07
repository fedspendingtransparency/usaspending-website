/**
 * index.js
 * Created by Kevin Li 11/1/16
 **/

import { combineReducers } from 'redux';

import searchReducer from './searchReducer';

const appReducer = combineReducers({
    search: searchReducer
});

export default appReducer;
