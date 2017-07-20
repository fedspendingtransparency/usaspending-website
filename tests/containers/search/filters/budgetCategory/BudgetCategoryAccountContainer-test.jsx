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

import * as budgetCategoryActions from 'redux/actions/search/budgetCategoryActions';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => mount(<BudgetCategoryAccountContainer {...props} />);

const initialFilters = {
    autocompleteFederalAccounts: []
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
                autocompleteFederalAccounts: [],
                updateFederalAccounts: jest.fn()
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
                autocompleteFederalAccounts: [],
                updateFederalAccounts: jest.fn()
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
                autocompleteFederalAccounts: [],
                updateFederalAccounts: jest.fn()
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
                autocompleteFederalAccounts: [],
                updateFederalAccounts: jest.fn()
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

        it('should populate Federal Accounts after performing the search', async () => {
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

            // Set up spies
            const queryAutocompleteFederalAccountsSpy = sinon.spy(
                budgetCategoryAccountContainer.instance(), 'queryAutocompleteFederalAccounts');
            const parseAutocompleteFederalAccountsSpy = sinon.spy(
                budgetCategoryAccountContainer.instance(), 'parseAutocompleteFederalAccounts');

            budgetCategoryAccountContainer.instance()
                .queryAutocompleteFederalAccounts('Income');
            await budgetCategoryAccountContainer.instance().searchRequest.promise;

            expect(queryAutocompleteFederalAccountsSpy.callCount).toEqual(1);
            expect(parseAutocompleteFederalAccountsSpy
                .calledWith(queryAutocompleteFederalAccountsSpy));
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset spies
            queryAutocompleteFederalAccountsSpy.reset();
            parseAutocompleteFederalAccountsSpy.reset();
        });
    });
});
