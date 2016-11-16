/**
 * index.js
 * Created by Kevin Li 11/1/16
 **/

import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import recordReducer from './records/recordReducer';

const appReducer = combineReducers({
    search: searchReducer,
    records: recordReducer
});

export default appReducer;
