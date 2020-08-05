/**
 * TopFilterBarContainer-test.js
 * Created by Kevin Li 1/9/17
 */

import React from 'react';
import { mount } from 'enzyme';

import { Set, OrderedMap } from 'immutable';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import { TopFilterBarContainer } from 'containers/search/topFilterBar/TopFilterBarContainer';

import searchFiltersReducer, { initialState } from 'redux/reducers/search/searchFiltersReducer';

import { mockAwardingAgency, mockFundingAgency, mockRecipient, mockLocation, mockAwardId } from './mockData';

const initialAction = {
    type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
    dateType: 'fy',
    fy: new Set(),
    start: null,
    end: null
};

const stateWithoutDefault = searchFiltersReducer(initialState, initialAction);

const defaultProps = {
    reduxFilters: stateWithoutDefault,
    updateFilterCount: jest.fn()
};

const setup = (props) =>
    mount(<TopFilterBarContainer {...props} />);

describe('TopFilterBarContainer', () => {
    it('should return a TopFilterBar child component with no filters selected by default', () => {
        const topBarContainer = setup({
            reduxFilters: initialState,
            updateFilterCount: jest.fn()
        });

        expect(topBarContainer.find(TopFilterBar)).toHaveLength(0);
    });

    it('should return a TopFilterBar child component when there are active filters', () => {
        const filters = Object.assign({}, stateWithoutDefault, {
            timePeriodType: 'fy',
            timePeriodFY: new Set(['2014'])
        });
        const props = {
            reduxFilters: filters,
            updateFilterCount: jest.fn()
        };

        const topBarContainer = setup(props);

        expect(topBarContainer.find(TopFilterBar)).toHaveLength(1);
    });

    describe('filter preparation', () => {
        it('should update when the Redux filters change', () => {
            const initialFilters = Object.assign({}, stateWithoutDefault, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014'])
            });

            const updatedFilters = Object.assign({}, stateWithoutDefault, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            const initialProps = {
                reduxFilters: initialFilters,
                updateFilterCount: jest.fn()
            };

            const updatedProps = {
                reduxFilters: updatedFilters,
                updateFilterCount: jest.fn()
            };

            // mount the container
            const topBarContainer = setup(initialProps);
            topBarContainer.instance().prepareFilters = jest.fn();

            // change the props
            topBarContainer.setProps(updatedProps);

            // the prepareFilters function should have been called
            expect(topBarContainer.instance().prepareFilters).toHaveBeenCalledTimes(1);
        });

        it('should update component state with Redux keyword filter when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, stateWithoutDefault),
                updateFilterCount: jest.fn()
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const keywordFilter = Object.assign({}, stateWithoutDefault, {
                keyword: new OrderedMap({ Education: "Education" })
            });

            topBarContainer.setProps({
                reduxFilters: keywordFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'keyword',
                name: 'Keyword',
                values: ["Education"]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux time filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup(defaultProps);

            expect(topBarContainer.state().filters).toHaveLength(0);

            const timeFilter = Object.assign({}, stateWithoutDefault, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            topBarContainer.setProps({
                reduxFilters: timeFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'timePeriodFY',
                name: 'Time Period',
                values: ['2015', '2014']
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux award type filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup(defaultProps);

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardFilter = Object.assign({}, stateWithoutDefault, {
                awardType: new Set(['07'])
            });

            topBarContainer.setProps({
                reduxFilters: awardFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'awardType',
                name: 'Award Type',
                values: ['07']
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux location filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup(defaultProps);

            expect(topBarContainer.state().filters).toHaveLength(0);

            const locationFilter = Object.assign({}, stateWithoutDefault, {
                selectedLocations: new OrderedMap({
                    USA_NY_001: {
                        filter: {
                            country: 'USA',
                            state: 'NY',
                            county: '001'
                        },
                        display: {
                            entity: 'County',
                            title: 'New Donk County',
                            standalone: 'New Donk County, NY'
                        },
                        identifier: 'USA_NY_001'
                    }
                })
            });

            topBarContainer.setProps({
                reduxFilters: locationFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedLocations',
                name: 'Place of Performance',
                scope: 'all',
                values: [{
                    filter: {
                        country: 'USA',
                        state: 'NY',
                        county: '001'
                    },
                    display: {
                        entity: 'County',
                        title: 'New Donk County',
                        standalone: 'New Donk County, NY'
                    },
                    identifier: 'USA_NY_001'
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux awarding agency filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup(defaultProps);

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardingAgencyFilter = Object.assign({}, stateWithoutDefault, {
                selectedAwardingAgencies: new OrderedMap({
                    "1788_subtier": mockAwardingAgency
                })
            });

            topBarContainer.setProps({
                reduxFilters: awardingAgencyFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedAwardingAgencies',
                name: 'Awarding Agency',
                values: [mockAwardingAgency]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux funding agency filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup(defaultProps);

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardingAgencyFilter = Object.assign({}, stateWithoutDefault, {
                selectedFundingAgencies: new OrderedMap({
                    "1788_subtier": mockFundingAgency
                })
            });

            topBarContainer.setProps({
                reduxFilters: awardingAgencyFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedFundingAgencies',
                name: 'Funding Agency',
                values: [mockFundingAgency]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux recipient filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup(defaultProps);

            expect(topBarContainer.state().filters).toHaveLength(0);

            const selectedRecipientsFilter = Object.assign({}, stateWithoutDefault, {
                selectedRecipients: new OrderedMap({
                    "006928857": mockRecipient
                })
            });

            topBarContainer.setProps({
                reduxFilters: selectedRecipientsFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedRecipients',
                name: 'Recipient',
                values: [mockRecipient]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux recipient location filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup(defaultProps);

            expect(topBarContainer.state().filters).toHaveLength(0);

            const recipientLocationFilter = Object.assign({}, stateWithoutDefault, {
                selectedRecipientLocations: new OrderedMap({
                    USA_NY_001: mockLocation
                })
            });

            topBarContainer.setProps({
                reduxFilters: recipientLocationFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedRecipientLocations',
                name: 'Recipient Location',
                scope: 'all',
                values: [mockLocation]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux recipient type filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup(defaultProps);

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardFilter = Object.assign({}, stateWithoutDefault, {
                recipientType: new Set(['small_business'])
            });

            topBarContainer.setProps({
                reduxFilters: awardFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'recipientType',
                name: 'Recipient Type',
                values: ['small_business']
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux award ID filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup(defaultProps);

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardIDFilter = Object.assign({}, stateWithoutDefault, {
                selectedAwardIDs: new OrderedMap({
                    601793: mockAwardId
                })
            });

            topBarContainer.setProps({
                reduxFilters: awardIDFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedAwardIDs',
                name: 'Award ID',
                values: [mockAwardId]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux award amount filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup(defaultProps);

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardAmountFilter = Object.assign({}, stateWithoutDefault, {
                awardAmounts: new OrderedMap({
                    0: [0, 1000000],
                    1: [1000000, 25000000],
                    2: [25000000, 100000000],
                    3: [100000000, 500000000],
                    4: [500000000, 0]
                })
            });

            topBarContainer.setProps({
                reduxFilters: awardAmountFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'awardAmounts',
                name: 'Award Amounts',
                values: {
                    0: [0, 1000000],
                    1: [1000000, 25000000],
                    2: [25000000, 100000000],
                    3: [100000000, 500000000],
                    4: [500000000, 0]
                }
            };

            expect(filterItem).toEqual(expectedFilterState);
        });
    });
    it('should update component state with Redux program source filters when available', () => {
        // mount the container with default props
        const topBarContainer = setup(defaultProps);

        expect(topBarContainer.state().filters).toHaveLength(0);

        const programSourceFilter = Object.assign({}, stateWithoutDefault, {
            treasuryAccounts: new Set(['123-4567'])
        });

        topBarContainer.setProps({
            reduxFilters: programSourceFilter
        });

        expect(topBarContainer.state().filters).toHaveLength(1);

        const filterItem = topBarContainer.state().filters[0];
        const expectedFilterState = {
            code: 'treasuryAccounts',
            name: 'Treasury Account',
            values: ['123-4567']
        };

        expect(filterItem).toEqual(expectedFilterState);
    });

    describe('filter removal', () => {
        it('should hide the top filter bar when all filters are cleared', () => {
            const initialFilters = Object.assign({}, stateWithoutDefault, {
                timePeriodType: 'fy', timePeriodFY: new Set(['2014'])
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateFilterCount: jest.fn()
            });

            expect(topBarContainer.find(TopFilterBar)).toHaveLength(1);

            // clear the filters
            topBarContainer.setProps({
                reduxFilters: Object.assign({}, stateWithoutDefault)
            });

            topBarContainer.update();

            expect(topBarContainer.find(TopFilterBar)).toHaveLength(0);
        });
    });
});
