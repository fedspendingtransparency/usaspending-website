/**
 * BudgetCategorySearchContainer-test.jsx
 * Created by michaelbray on 3/24/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { BudgetCategorySearchContainer } from
    'containers/search/filters/budgetCategory/BudgetCategorySearchContainer';

const initialFilters = {
    budgetFunctions: {},
    federalAccounts: {},
    objectClasses: {}
};

const budgetFunction = {
    title: 'Income Security',
    functionType: 'Function'
};

const federalAccount = {
    id: '392',
    agency_identifier: '012',
    main_account_code: '3539',
    account_title: 'Child Nutrition Programs, Food Nutrition Service, Agriculture'
};

const objectClass = {
    target: {
        value: 10
    }
};

describe('BudgetCategorySearchContainer', () => {
    describe('Handling adding and removing budget functions', () => {
        it('should add a budget function that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    title: 'Income Security',
                    functionType: 'Function'
                });
            });

            // Set up container with mocked budget function action
            const budgetCategorySearchContainer = shallow(
                <BudgetCategorySearchContainer
                    reduxFilters={initialFilters}
                    updateSelectedBudgetFunctions={mockReduxAction} />);

            const updateBudgetFunctionsSpy = sinon.spy(budgetCategorySearchContainer.instance(),
                'updateBudgetFunctions');

            // Add budget function to redux
            budgetCategorySearchContainer.instance().updateBudgetFunctions(budgetFunction);

            // everything should be updated now
            expect(updateBudgetFunctionsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spies
            updateBudgetFunctionsSpy.reset();
        });

        it('should remove a budget function that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    title: 'Income Security',
                    functionType: 'Function'
                });
            });

            // Set up container with mocked budget function action
            const budgetCategorySearchContainer = shallow(
                <BudgetCategorySearchContainer
                    reduxFilters={initialFilters}
                    updateSelectedBudgetFunctions={mockReduxAction} />);

            const updateBudgetFunctionsSpy = sinon.spy(budgetCategorySearchContainer.instance(),
                'updateBudgetFunctions');

            // Add budget function to redux
            budgetCategorySearchContainer.instance().updateBudgetFunctions(budgetFunction);

            // Remove budget function from Redux
            budgetCategorySearchContainer.instance().updateBudgetFunctions(budgetFunction);

            // everything should be updated now
            expect(updateBudgetFunctionsSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // reset the spy
            updateBudgetFunctionsSpy.reset();
        });
    });

    describe('Handling adding and removing federal accounts', () => {
        it('should add a federal account that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    id: '392',
                    agency_identifier: '012',
                    main_account_code: '3539',
                    account_title: 'Child Nutrition Programs, Food Nutrition Service, Agriculture'
                });
            });

            // Set up container with mocked federal account action
            const budgetCategorySearchContainer = shallow(
                <BudgetCategorySearchContainer
                    reduxFilters={initialFilters}
                    updateSelectedFederalAccounts={mockReduxAction} />);

            const updateFederalAccountsSpy = sinon.spy(budgetCategorySearchContainer.instance(),
                'updateFederalAccounts');

            // Add federal account to redux
            budgetCategorySearchContainer.instance().updateFederalAccounts(federalAccount);

            // everything should be updated now
            expect(updateFederalAccountsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spies
            updateFederalAccountsSpy.reset();
        });

        it('should remove a federal account that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    id: '392',
                    agency_identifier: '012',
                    main_account_code: '3539',
                    account_title: 'Child Nutrition Programs, Food Nutrition Service, Agriculture'
                });
            });

            // Set up container with mocked federal account action
            const budgetCategorySearchContainer = shallow(
                <BudgetCategorySearchContainer
                    reduxFilters={initialFilters}
                    updateSelectedFederalAccounts={mockReduxAction} />);

            const updateFederalAccountsSpy = sinon.spy(budgetCategorySearchContainer.instance(),
                'updateFederalAccounts');

            // Add federal account to redux
            budgetCategorySearchContainer.instance().updateFederalAccounts(federalAccount);

            // Remove federal account from Redux
            budgetCategorySearchContainer.instance().updateFederalAccounts(federalAccount);

            // everything should be updated now
            expect(updateFederalAccountsSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // reset the spy
            updateFederalAccountsSpy.reset();
        });
    });

    describe('Handling adding and removing object classes', () => {
        it('should add an object class that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(10);
            });

            // Set up container with mocked object class action
            const budgetCategorySearchContainer = shallow(
                <BudgetCategorySearchContainer
                    reduxFilters={initialFilters}
                    updateSelectedObjectClasses={mockReduxAction} />);

            const updateObjectClassesSpy = sinon.spy(
                budgetCategorySearchContainer.instance(), 'updateObjectClasses');

            // Add object class to redux
            budgetCategorySearchContainer.instance().updateObjectClasses(objectClass);

            // everything should be updated now
            expect(updateObjectClassesSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spies
            updateObjectClassesSpy.reset();
        });

        it('should remove an object class that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(10);
            });

            // Set up container with mocked object class action
            const budgetCategorySearchContainer = shallow(
                <BudgetCategorySearchContainer
                    reduxFilters={initialFilters}
                    updateSelectedObjectClasses={mockReduxAction} />);

            const updateObjectClassesSpy = sinon.spy(
                budgetCategorySearchContainer.instance(), 'updateObjectClasses');

            // Add object class to redux
            budgetCategorySearchContainer.instance().updateObjectClasses(objectClass);

            // Remove object class from Redux
            budgetCategorySearchContainer.instance().updateObjectClasses(objectClass);

            // everything should be updated now
            expect(updateObjectClassesSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // reset the spy
            updateObjectClassesSpy.reset();
        });
    });
});
