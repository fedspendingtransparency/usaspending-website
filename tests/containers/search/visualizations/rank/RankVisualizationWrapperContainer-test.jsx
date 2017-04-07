/**
 * RankVisualizationWrapperContainer-test.jsx
 * Created by michaelbray on 4/7/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { RankVisualizationWrapperContainer } from
    'containers/search/visualizations/rank/RankVisualizationWrapperContainer';

import { defaultFilters } from '../../../../testResources/defaultReduxFilters';

// mock the child containers by replacing them with a function that returns a null element
jest.mock('containers/search/visualizations/rank/SpendingByCategoryRankVisualizationSectionContainer', () =>
    jest.fn(() => null));
jest.mock('containers/search/visualizations/rank/RankVisualizationSectionContainer', () =>
    jest.fn(() => null));

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const setFilterStatesSpy = sinon.spy(RankVisualizationWrapperContainer.prototype,
    'setFilterStates');
const generateVisualizationSpy = sinon.spy(RankVisualizationWrapperContainer.prototype,
    'generateVisualization');
const changeSpendingBySpy = sinon.spy(RankVisualizationWrapperContainer.prototype,
    'changeSpendingBy');

describe('RankVisualizationWrapperContainer', () => {
    it('should handle generating the visualization and setting filter states on render', () => {
        // shallow mount the container
        mount(<RankVisualizationWrapperContainer
            reduxFilters={defaultFilters} />);

        expect(setFilterStatesSpy.callCount).toEqual(1);
        // Expect one call on render, one call after setFilterStates
        expect(generateVisualizationSpy.callCount).toEqual(2);

        // reset the spies
        generateVisualizationSpy.reset();
        setFilterStatesSpy.reset();
    });

    it('should handle setting filter states on update', () => {
        // shallow mount the container
        const container = mount(<RankVisualizationWrapperContainer
            reduxFilters={defaultFilters} />);

        expect(setFilterStatesSpy.callCount).toEqual(1);
        // Expect one call on render, one call after setFilterStates
        expect(generateVisualizationSpy.callCount).toEqual(2);

        container.instance().componentDidUpdate(defaultFilters);

        expect(setFilterStatesSpy.callCount).toEqual(2);
        expect(generateVisualizationSpy.callCount).toEqual(3);

        // reset the spies
        generateVisualizationSpy.reset();
        setFilterStatesSpy.reset();
    });

    describe('changeSpendingBy', () => {
        it('should change the spendingBy to the provided value', () => {
            const container = mount(<RankVisualizationWrapperContainer
                reduxFilters={defaultFilters} />);

            // the default scope should be budgetFunctions
            expect(container.state().spendingBy).toEqual('budget_category');

            // change the scope to federalAccounts
            container.instance().changeSpendingBy('awarding_agency');
            expect(container.state().spendingBy).toEqual('awarding_agency');

            expect(changeSpendingBySpy.callCount).toEqual(1);
            // reset the spies
            changeSpendingBySpy.reset();
        });
    });
});
