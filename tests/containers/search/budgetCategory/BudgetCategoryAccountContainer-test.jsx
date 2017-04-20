/**
 * BudgetCategoryAccountContainer-test.jsx
 * Created by michaelbray on 3/24/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { BudgetCategoryAccountContainer } from
    'containers/search/filters/budgetCategory/BudgetCategoryAccountContainer';

import * as SearchHelper from 'helpers/searchHelper';
import * as budgetCategoryActions from 'redux/actions/search/budgetCategoryActions';

const setup = (props) => mount(<BudgetCategoryAccountContainer {...props} />);

const initialFilters = {
    autocompleteFederalAccounts: []
};

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const apiResponse = {
    matched_objects: {
        account_title: {
            account_title: "Special Supplemental Nutrition Program for Women, Infants and " +
            "Children (WIC), Food and Nutrition Service",
            agency_identifier: "012",
            id: 391,
            main_account_code: "3510"
        },
        agency_identifier: {},
        main_account_code: {}
    }
};

// we don't want to actually hit the API because tests should be fully controlled, so we will mock
// the SearchHelper functions
const mockSearchHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    SearchHelper[functionName] = jest.fn(() => {
        // Axios normally returns a promise, replicate this, but return the expected result
        const networkCall = new Promise((resolve, reject) => {
            process.nextTick(() => {
                if (event === 'resolve') {
                    resolve({
                        data: expectedResponse
                    });
                }
                else {
                    reject({
                        data: expectedResponse
                    });
                }
            });
        });

        return {
            promise: networkCall,
            cancel: jest.fn()
        };
    });
};

const unmockSearchHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/searchHelper');
};

describe('BudgetCategoryAccountContainer', () => {
    describe('Handling text input', () => {
        it('should handle text input after 300ms', () => {
            // Set up the Container and call the function to type a single letter
            const budgetCategoryAccountContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteFederalAccounts:
                    budgetCategoryActions.setAutocompleteFederalAccounts,
                federalAccounts: new OrderedMap(),
                autocompleteFederalAccounts: []
            });

            const searchQuery = {
                target: {
                    value: 'C'
                }
            };

            const handleTextInputSpy = sinon.spy(budgetCategoryAccountContainer.instance(),
                'handleTextInput');

            // Call handleTextInput function
            budgetCategoryAccountContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
        });

        it('should call the queryAutocompleteFederalAccounts method 300ms ' +
            'after text input', () => {
            // Set up the Container and call the function to type a single letter
            const budgetCategoryAccountContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteFederalAccounts:
                    budgetCategoryActions.setAutocompleteFederalAccounts,
                federalAccounts: new OrderedMap(),
                autocompleteFederalAccounts: []
            });

            const searchQuery = {
                target: {
                    value: 'C'
                }
            };

            const handleTextInputSpy = sinon.spy(budgetCategoryAccountContainer.instance(),
                'handleTextInput');
            const queryAutocompleteFederalAccountsSpy = sinon
                .spy(budgetCategoryAccountContainer.instance(),
                    'queryAutocompleteFederalAccounts');

            // Call handleTextInput function
            budgetCategoryAccountContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteFederalAccountsSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            queryAutocompleteFederalAccountsSpy.reset();
        });

        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const budgetCategoryAccountContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteFederalAccounts: mockReduxAction,
                federalAccounts: new OrderedMap(),
                autocompleteFederalAccounts: []
            });

            const queryAutocompleteFederalAccountsSpy = sinon
                .spy(budgetCategoryAccountContainer.instance(),
                    'queryAutocompleteFederalAccounts');
            const handleTextInputSpy = sinon.spy(budgetCategoryAccountContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: 'I'
                }
            };
            budgetCategoryAccountContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteFederalAccountsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompleteFederalAccountsSpy.reset();
        });

        it('should search when more than one character has been input ' +
            'into the Federal Account field', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const budgetCategoryAccountContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteFederalAccounts: mockReduxAction,
                federalAccounts: new OrderedMap(),
                autocompleteFederalAccounts: []
            });

            // set up spies
            const handleTextInputSpy = sinon.spy(budgetCategoryAccountContainer.instance(),
                'handleTextInput');
            const queryAutocompleteFederalAccountsSpy = sinon
                .spy(budgetCategoryAccountContainer.instance(), 'queryAutocompleteFederalAccounts');

            const searchQuery = {
                target: {
                    value: 'Income'
                }
            };
            budgetCategoryAccountContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(300);

            // Run fake timer for input delay
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteFederalAccountsSpy.calledWith(handleTextInputSpy));

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompleteFederalAccountsSpy.reset();
        });

        it('should populate Federal Accounts after performing the search', () => {
            // Setup redux state
            const reduxState = [{
                391: {
                    account_title: "Special Supplemental Nutrition Program for Women, Infants and " +
                    "Children (WIC), Food and Nutrition Service",
                    agency_identifier: "012",
                    id: 391,
                    main_account_code: "3510"
                }
            }];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            // Set up the Container and call the function to type a single letter
            const budgetCategoryAccountContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteFederalAccounts: mockReduxAction,
                autocompleteFederalAccounts: reduxState,
                federalAccounts: new OrderedMap(),
                updateFederalAccounts: jest.fn()
            });

            // Mock the search helper to resolve with the mocked response
            mockSearchHelper('fetchFederalAccounts', 'resolve', apiResponse);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(10000);

            // Run all ticks
            jest.runAllTicks();

            // Set up spies
            const queryAutocompleteFederalAccountsSpy = sinon.spy(
                budgetCategoryAccountContainer.instance(), 'queryAutocompleteFederalAccounts');
            const parseAutocompleteFederalAccountsSpy = sinon.spy(
                budgetCategoryAccountContainer.instance(), 'parseAutocompleteFederalAccounts');

            budgetCategoryAccountContainer.instance()
                .queryAutocompleteFederalAccounts('Income');

            // Run all ticks
            jest.runAllTicks();

            expect(queryAutocompleteFederalAccountsSpy.callCount).toEqual(1);
            expect(parseAutocompleteFederalAccountsSpy
                .calledWith(queryAutocompleteFederalAccountsSpy));
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset the mock
            unmockSearchHelper();

            // Reset spies
            queryAutocompleteFederalAccountsSpy.reset();
            parseAutocompleteFederalAccountsSpy.reset();
        });
    });
});
