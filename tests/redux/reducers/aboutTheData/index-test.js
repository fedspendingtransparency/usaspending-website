/**
 * accountReducer-test.js
 * Created by Max Kendall 🍻 12/9/2020
 */

import aboutTheDataReducer, { initialState } from 'redux/reducers/aboutTheData';

test('SET_ABOUT_THE_DATA_DETAILS', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_DETAILS',
        payload: [1]
    }).details)
        .toEqual([1]);
    expect(aboutTheDataReducer({ ...initialState, details: [1] }, {
        type: 'SET_ABOUT_THE_DATA_DETAILS',
        payload: [2],
        append: true
    }).details)
        .toEqual([1, 2]);
});

test('SET_ABOUT_THE_DATA_DATES', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_DATES',
        payload: [1]
    }).dates)
        .toEqual([1]);
    expect(aboutTheDataReducer({ ...initialState, dates: [1] }, {
        type: 'SET_ABOUT_THE_DATA_DATES',
        payload: [2],
        append: true
    }).dates)
        .toEqual([1, 2]);
});

test('SET_ABOUT_THE_DATA_TOTALS', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_TOTALS',
        payload: [1]
    }).totals)
        .toEqual([1]);
});

test('SET_ABOUT_THE_DATA_DETAILS_SORT', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_DETAILS_SORT',
        payload: ['test', 'desc']
    }).detailsSort)
        .toEqual(['test', 'desc']);
});

test('SET_ABOUT_THE_DATA_DATES_SORT', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_DATES_SORT',
        payload: ['test', 'asc']
    }).datesSort)
        .toEqual(['test', 'asc']);
});
