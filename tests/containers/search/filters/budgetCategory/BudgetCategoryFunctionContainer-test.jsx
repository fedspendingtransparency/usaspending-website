/**
 * BudgetCategoryFunctionContainer-test.jsx
 * Created by michaelbray on 3/24/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { BudgetCategoryFunctionContainer } from
    'containers/search/filters/budgetCategory/BudgetCategoryFunctionContainer';

import * as budgetCategoryActions from 'redux/actions/search/budgetCategoryActions';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const setup = (props) => mount(<BudgetCategoryFunctionContainer {...props} />);

const initialFilters = {
    autocompleteBudgetFunctions: []
};

describe('BudgetCategoryFunctionContainer', () => {
    describe('Handling text input', () => {
        it('should handle text input after 300ms', () => {
            // Set up the Container and call the function to type a single letter
            const budgetCategoryFunctionContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteBudgetFunctions:
                    budgetCategoryActions.setAutocompleteBudgetFunctions,
                budgetFunctions: new OrderedMap(),
                autocompleteBudgetFunctions: [],
                updateBudgetFunctions: jest.fn()
            });

            const searchQuery = {
                target: {
                    value: 'I'
                }
            };

            const handleTextInputSpy = sinon.spy(budgetCategoryFunctionContainer.instance(),
                'handleTextInput');

            // Call handleTextInput function
            budgetCategoryFunctionContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
        });

        it('should call the queryAutocompleteBudgetFunctions method 300ms ' +
            'after text input', () => {
            // Set up the Container and call the function to type a single letter
            const budgetCategoryFunctionContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteBudgetFunctions:
                    budgetCategoryActions.setAutocompleteBudgetFunctions,
                budgetFunctions: new OrderedMap(),
                autocompleteBudgetFunctions: [],
                updateBudgetFunctions: jest.fn()
            });

            const searchQuery = {
                target: {
                    value: 'I'
                }
            };

            const handleTextInputSpy = sinon.spy(budgetCategoryFunctionContainer.instance(),
                'handleTextInput');
            const queryAutocompleteBudgetFunctionsSpy = sinon
                .spy(budgetCategoryFunctionContainer.instance(),
                    'queryAutocompleteBudgetFunctions');

            // Call handleTextInput function
            budgetCategoryFunctionContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteBudgetFunctionsSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            queryAutocompleteBudgetFunctionsSpy.reset();
        });

        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const budgetCategoryFunctionContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteBudgetFunctions: mockReduxAction,
                budgetFunctions: new OrderedMap(),
                autocompleteBudgetFunctions: [],
                updateBudgetFunctions: jest.fn()
            });

            const queryAutocompleteBudgetFunctionsSpy = sinon
                .spy(budgetCategoryFunctionContainer.instance(),
                    'queryAutocompleteBudgetFunctions');
            const handleTextInputSpy = sinon.spy(budgetCategoryFunctionContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: 'I'
                }
            };
            budgetCategoryFunctionContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteBudgetFunctionsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompleteBudgetFunctionsSpy.reset();
        });

        it('should search when more than one character has been input ' +
            'into the Budget Function field', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const budgetCategoryFunctionContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteBudgetFunctions: mockReduxAction,
                budgetFunctions: new OrderedMap(),
                autocompleteBudgetFunctions: [],
                updateBudgetFunctions: jest.fn()
            });

            // set up spies
            const handleTextInputSpy = sinon.spy(budgetCategoryFunctionContainer.instance(),
                'handleTextInput');
            const queryAutocompleteBudgetFunctionsSpy = sinon
                .spy(budgetCategoryFunctionContainer.instance(), 'queryAutocompleteBudgetFunctions');

            const searchQuery = {
                target: {
                    value: 'Income'
                }
            };
            budgetCategoryFunctionContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(300);

            // Run fake timer for input delay
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteBudgetFunctionsSpy.calledWith(handleTextInputSpy));

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompleteBudgetFunctionsSpy.reset();
        });

        it('should populate Budget Functions after performing the search', async () => {
            // Setup redux state
            const reduxState = [{
                'Income Security': {
                    title: 'Income Security',
                    functionType: 'Function'
                }
            }];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            // Set up the Container and call the function to type a single letter
            const budgetCategoryFunctionContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteBudgetFunctions: mockReduxAction,
                autocompleteBudgetFunctions: reduxState,
                budgetFunctions: new OrderedMap(),
                updateBudgetFunctions: jest.fn()
            });

            // Set up spies
            const queryAutocompleteBudgetFunctionsSpy = sinon.spy(
                budgetCategoryFunctionContainer.instance(), 'queryAutocompleteBudgetFunctions');
            const parseAutocompleteBudgetFunctionsSpy = sinon.spy(
                budgetCategoryFunctionContainer.instance(), 'parseAutocompleteBudgetFunctions');

            budgetCategoryFunctionContainer.instance()
                .queryAutocompleteBudgetFunctions('Income');

            await budgetCategoryFunctionContainer.instance().searchRequest.promise;

            expect(queryAutocompleteBudgetFunctionsSpy.callCount).toEqual(1);
            expect(parseAutocompleteBudgetFunctionsSpy
                .calledWith(queryAutocompleteBudgetFunctionsSpy));
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset spies
            queryAutocompleteBudgetFunctionsSpy.reset();
            parseAutocompleteBudgetFunctionsSpy.reset();
        });
    });
});
