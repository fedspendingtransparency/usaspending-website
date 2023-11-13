/**
 * @jest-environment jsdom
 * 
 * accountReducer-test.js
 * Created by Max Kendall 🍻 12/9/2020
 */

import aboutTheDataReducer, { initialState } from 'redux/reducers/aboutTheData';

test('SET_ABOUT_THE_DATA_ALL_SUBMISSIONS', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_ALL_SUBMISSIONS',
        payload: [1]
    }).allSubmissions)
        .toEqual([1]);
    expect(aboutTheDataReducer({ ...initialState, allSubmissions: [1] }, {
        type: 'SET_ABOUT_THE_DATA_ALL_SUBMISSIONS',
        payload: [2],
        append: true
    }).allSubmissions)
        .toEqual([1, 2]);
});

test('SET_ABOUT_THE_DATA_ALL_PUBLICATIONS', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_ALL_PUBLICATIONS',
        payload: [1]
    }).allPublications)
        .toEqual([1]);
    expect(aboutTheDataReducer({ ...initialState, allPublications: [1] }, {
        type: 'SET_ABOUT_THE_DATA_ALL_PUBLICATIONS',
        payload: [2],
        append: true
    }).allPublications)
        .toEqual([1, 2]);
});

test('SET_ABOUT_THE_DATA_TOTALS', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_TOTALS',
        payload: [1]
    }).federalTotals)
        .toEqual([1]);
});

test('SET_ABOUT_THE_DATA_ALL_SUBMISSIONS_SORT', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_ALL_SUBMISSIONS_SORT',
        payload: ['test', 'desc']
    }).submissionsSort)
        .toEqual(['test', 'desc']);
});

test('SET_ABOUT_THE_DATA_ALL_PUBLICATIONS_SORT', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_ALL_PUBLICATIONS_SORT',
        payload: ['test', 'asc']
    }).publicationsSort)
        .toEqual(['test', 'asc']);
});

test('SET_ABOUT_THE_DATA_SEARCH_RESULTS_SUBMISSIONS', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_SEARCH_RESULTS_SUBMISSIONS',
        payload: [1]
    }).submissionsSearchResults)
        .toEqual([1]);
});

test('SET_ABOUT_THE_DATA_SEARCH_RESULTS_PUBLICATIONS', () => {
    expect(aboutTheDataReducer(initialState, {
        type: 'SET_ABOUT_THE_DATA_SEARCH_RESULTS_PUBLICATIONS',
        payload: [2]
    }).publicationsSearchResults)
        .toEqual([2]);
});
