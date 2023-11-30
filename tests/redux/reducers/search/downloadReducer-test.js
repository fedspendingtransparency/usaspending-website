/**
 * @jest-environment jsdom
 * 
 * downloadReducer-test.js
 * Created by Emily Gullo 08/24/2017
 */

import downloadReducer, { initialState } from 'redux/reducers/search/downloadReducer';
import { List } from 'immutable';


describe('downloadReducer', () => {
    it('should return an empty array by default', () => {
        expect(downloadReducer(undefined, {})).toEqual(initialState);
    });

    describe('SET_DOWNLOAD_TYPE', () => {
        it('should return a new string for download type', () => {
            const action = {
                type: 'SET_DOWNLOAD_TYPE',
                downloadType: 'awards'
            };

            const updatedState = downloadReducer(undefined, action);

            // the value should be equal
            expect(updatedState.type).toEqual(action.downloadType);
        });
    });

    describe('SET_DOWNLOAD_COLUMNS', () => {
        it('should return a new list object of columns', () => {
            const action = {
                type: 'SET_DOWNLOAD_COLUMNS',
                columns: new List(['type', 'amount_obligated', 'location'])
            };

            const updatedState = downloadReducer(undefined, action);

            // the value should be equal
            expect(updatedState.columns).toEqual(action.columns);
        });
    });

    describe('SET_DOWNLOAD_EXPECTED_FILE', () => {
        it('should return a new string of the expected filename', () => {
            const action = {
                type: 'SET_DOWNLOAD_EXPECTED_FILE',
                file: 'transaction_9fn24der3.csv'
            };

            const updatedState = downloadReducer(undefined, action);

            // the value should be equal
            expect(updatedState.expectedFile).toEqual(action.file);
        });
    });

    describe('SET_DOWNLOAD_PENDING', () => {
        it('should return a boolean value for a pending download', () => {
            const action = {
                type: 'SET_DOWNLOAD_PENDING',
                state: true
            };

            const updatedState = downloadReducer(undefined, action);

            // the value should be equal
            expect(updatedState.pendingDownload).toEqual(true);
        });
    });

    describe('SET_DOWNLOAD_COLLAPSED', () => {
        it('should return a boolean value for collapsed modal state', () => {
            const action = {
                type: 'SET_DOWNLOAD_COLLAPSED',
                collapsed: true
            };

            const updatedState = downloadReducer(undefined, action);

            // the value should be equal
            expect(updatedState.showCollapsedProgress).toEqual(true);
        });
    });

    describe('RESET_DOWNLOAD', () => {
        it('should return an empty object', () => {
            const action = {
                type: 'RESET_DOWNLOAD'
            };

            const updatedState = downloadReducer(undefined, action);

            // the value should be equal
            expect(updatedState).toEqual(initialState);
        });
    });
});
