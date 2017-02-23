/**
 * TopFilterBarContainer-test.js
 * Created by Kevin Li 1/9/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Set, OrderedMap } from 'immutable';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import { TopFilterBarContainer } from 'containers/search/topFilterBar/TopFilterBarContainer';

import { defaultFilters } from '../../../testResources/defaultReduxFilters';

const setup = (props) =>
    mount(<TopFilterBarContainer {...props} />);

const removeTimePeriodSpy = sinon.spy(TopFilterBarContainer.prototype, 'removeTimePeriod');
const removeFromSetSpy = sinon.spy(TopFilterBarContainer.prototype, 'removeFromSet');
const resetGenericFieldSpy = sinon.spy(TopFilterBarContainer.prototype, 'resetGenericField');
const prepareFiltersSpy = sinon.spy(TopFilterBarContainer.prototype, 'prepareFilters');


describe('TopFilterBarContainer', () => {
    it('should return a TopFilterBarEmpty child component when no filters are applied', () => {
        const filters = Object.assign({}, defaultFilters);
        const props = {
            reduxFilters: filters
        };
        const topBarContainer = setup(props);

        expect(topBarContainer.find(TopFilterBar)).toHaveLength(0);
    });

    it('should return a TopFilterBar child component when there are active filters', () => {
        const filters = Object.assign({}, defaultFilters, {
            timePeriodType: 'fy',
            timePeriodFY: new Set(['2014'])
        });
        const props = {
            reduxFilters: filters
        };

        const topBarContainer = setup(props);

        expect(topBarContainer.find(TopFilterBar)).toHaveLength(1);
    });

    describe('filter preparation', () => {
        it('should update when the Redux filters change', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014'])
            });

            const updatedFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            const initialProps = {
                reduxFilters: initialFilters
            };

            const updatedProps = {
                reduxFilters: updatedFilters
            };

            // mount the container
            const topBarContainer = setup(initialProps);

            // change the props
            topBarContainer.setProps(updatedProps);

            // the prepareFilters function should have been called
            expect(prepareFiltersSpy.called).toBeTruthy();
        });

        it('should update component state with Redux time filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const timeFilter = Object.assign({}, defaultFilters, {
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
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardFilter = Object.assign({}, defaultFilters, {
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
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const locationFilter = Object.assign({}, defaultFilters, {
                selectedLocations: new OrderedMap({
                    '1,2_LOS ANGELES_CITY': {
                        matched_ids: [1, 2],
                        parent: 'CALIFORNIA',
                        place_type: 'CITY',
                        place: 'LOS ANGELES',
                        identifier: '1,2_LOS ANGELES_CITY'
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
                name: 'Location',
                scope: 'all',
                values: [{
                    matched_ids: [1, 2],
                    parent: 'CALIFORNIA',
                    place_type: 'CITY',
                    place: 'LOS ANGELES',
                    identifier: '1,2_LOS ANGELES_CITY'
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux location scope when it is not "all"', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const locationFilter = Object.assign({}, defaultFilters, {
                locationDomesticForeign: 'foreign'
            });

            topBarContainer.setProps({
                reduxFilters: locationFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedLocations',
                name: 'Location',
                scope: 'foreign',
                values: [{
                    isScope: true
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux awarding agency filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardingAgencyFilter = Object.assign({}, defaultFilters, {
                selectedAwardingAgencies: new OrderedMap({
                    "1788_subtier": {
                        id: 1788,
                        create_date: "2017-01-12T19:56:30.517000Z",
                        update_date: "2017-01-12T19:56:30.517000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1654,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1700",
                            name: "DEPT OF THE NAVY"
                        },
                        office_agency: null
                    }
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
                values: [{
                    id: 1788,
                    create_date: "2017-01-12T19:56:30.517000Z",
                    update_date: "2017-01-12T19:56:30.517000Z",
                    toptier_agency: {
                        toptier_agency_id: 268,
                        create_date: "2017-01-31T21:25:39.810344Z",
                        update_date: "2017-01-31T21:25:39.936439Z",
                        cgac_code: "097",
                        fpds_code: "9700",
                        name: "DEPT OF DEFENSE"
                    },
                    subtier_agency: {
                        subtier_agency_id: 1654,
                        create_date: "2017-01-31T21:25:39.569918Z",
                        update_date: "2017-01-31T21:25:39.691244Z",
                        subtier_code: "1700",
                        name: "DEPT OF THE NAVY"
                    },
                    office_agency: null
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux funding agency filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardingAgencyFilter = Object.assign({}, defaultFilters, {
                selectedFundingAgencies: new OrderedMap({
                    "1788_subtier": {
                        id: 1788,
                        create_date: "2017-01-12T19:56:30.517000Z",
                        update_date: "2017-01-12T19:56:30.517000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1654,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1700",
                            name: "DEPT OF THE NAVY"
                        },
                        office_agency: null
                    }
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
                values: [{
                    id: 1788,
                    create_date: "2017-01-12T19:56:30.517000Z",
                    update_date: "2017-01-12T19:56:30.517000Z",
                    toptier_agency: {
                        toptier_agency_id: 268,
                        create_date: "2017-01-31T21:25:39.810344Z",
                        update_date: "2017-01-31T21:25:39.936439Z",
                        cgac_code: "097",
                        fpds_code: "9700",
                        name: "DEPT OF DEFENSE"
                    },
                    subtier_agency: {
                        subtier_agency_id: 1654,
                        create_date: "2017-01-31T21:25:39.569918Z",
                        update_date: "2017-01-31T21:25:39.691244Z",
                        subtier_code: "1700",
                        name: "DEPT OF THE NAVY"
                    },
                    office_agency: null
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });
    });

    describe('filter removal', () => {
        it('should hide the top filter bar when all filters are cleared', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014'])
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters
            });

            expect(topBarContainer.find(TopFilterBar)).toHaveLength(1);

            // clear the filters
            topBarContainer.setProps({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.find(TopFilterBar)).toHaveLength(0);
        });

        it('should trigger a Redux action to update the time period when a FY time period filter is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            const expectedReduxArguments = {
                dateType: 'fy',
                fy: new Set(['2015']),
                start: null,
                end: null
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateTimePeriod: mockReduxAction
            });

            topBarContainer.instance().removeFilter('timePeriodFY', '2014');

            // the removeFilter function should call removeTimePeriodSpy
            expect(removeTimePeriodSpy.called).toBeTruthy();
            // the removeTimePeriod function should trigger a Redux action to remove the time period
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger a Redux action to update the time period when a date range is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'dr',
                timePeriodStart: '2016-01-01',
                timePeriodEnd: '2016-12-31'
            });

            const expectedReduxArguments = {
                dateType: 'dr',
                fy: new Set([]),
                start: null,
                end: null
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateTimePeriod: mockReduxAction
            });

            topBarContainer.instance().removeFilter('timePeriodDR');

            // the removeTimePeriodSpy function should call removeTimePeriodSpy
            expect(removeTimePeriodSpy.called).toBeTruthy();
            // the removeTimePeriod function should trigger a Redux action to remove the time period
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger a Redux action to update the award type when an award type filter is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                awardType: new Set(['07', '04'])
            });

            const expectedReduxArguments = {
                type: 'awardType',
                value: new Set(['04'])
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('awardType', '07');

            // the removeFilter function should call removeFromSet
            expect(removeFromSetSpy.called).toBeTruthy();
            // the removeFromSet function should trigger a Redux action to remove the award type
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger an appropriate Redux action when a single filter group is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                awardType: new Set(['07', '04'])
            });

            const expectedReduxArguments = 'awardType';

             // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function to reset a single filter group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });
            topBarContainer.instance().clearFilterGroup('awardType');

            // for non-time period fields, the resetGenericField function should be called
            expect(resetGenericFieldSpy.called).toBeTruthy();
            // this function doesn't really do anything but pass the arguments onto a Redux action
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger an appropriate Redux action when the time period fiscal year filter group is individually removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function the reset the single time period
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                resetTimeFilters: mockReduxAction
            });
            topBarContainer.instance().clearFilterGroup('timePeriodFY');

            // validate that the resetTimeFilters Redux action is called
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger an appropriate Redux action when the time period date range filter group is individually removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'dr',
                timePeriodStart: '2016-01-01',
                timePeriodEnd: '2016-12-31'
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to reset the single time period
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                resetTimeFilters: mockReduxAction
            });
            topBarContainer.instance().clearFilterGroup('timePeriodDR');

            // validate that the resetTimeFilters Redux action is called
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger a Redux action to update the Awarding Agency filter when an Agency is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                selectedAwardingAgencies: new OrderedMap({
                    "1788_subtier": {
                        id: 1788,
                        create_date: "2017-01-12T19:56:30.517000Z",
                        update_date: "2017-01-12T19:56:30.517000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1654,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1700",
                            name: "DEPT OF THE NAVY"
                        },
                        office_agency: null
                    },
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            });

            const expectedReduxArguments = {
                type: 'selectedAwardingAgencies',
                value: new OrderedMap({
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('selectedAwardingAgencies', '1788_subtier');
        });

        it('should trigger a Redux action to update the Funding Agency filter when an Agency is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                selectedFundingAgencies: new OrderedMap({
                    "1788_subtier": {
                        id: 1788,
                        create_date: "2017-01-12T19:56:30.517000Z",
                        update_date: "2017-01-12T19:56:30.517000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1654,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1700",
                            name: "DEPT OF THE NAVY"
                        },
                        office_agency: null
                    },
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            });

            const expectedReduxArguments = {
                type: 'selectedFundingAgencies',
                value: new OrderedMap({
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('selectedFundingAgencies', '1788_subtier');
        });

        it('should be able to trigger Redux actions that can reset the entire Awarding Agency Filter', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                selectedAwardingAgencies: new OrderedMap({
                    "1788_subtier": {
                        id: 1788,
                        create_date: "2017-01-12T19:56:30.517000Z",
                        update_date: "2017-01-12T19:56:30.517000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1654,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1700",
                            name: "DEPT OF THE NAVY"
                        },
                        office_agency: null
                    },
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });

            topBarContainer.instance().clearFilterGroup('selectedAwardingAgencies');

            // validate that the clearFilterType Redux action is called twice
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
        });

        it('should be able to trigger Redux actions that can reset the entire Funding Agency Filter', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                selectedFundingAgencies: new OrderedMap({
                    "1788_subtier": {
                        id: 1788,
                        create_date: "2017-01-12T19:56:30.517000Z",
                        update_date: "2017-01-12T19:56:30.517000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1654,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1700",
                            name: "DEPT OF THE NAVY"
                        },
                        office_agency: null
                    },
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });

            topBarContainer.instance().clearFilterGroup('selectedFundingAgencies');

            // validate that the clearFilterType Redux action is called twice
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
        });

        it('should be able to trigger Redux actions that can reset the entire location filter', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                locationDomesticForeign: 'domestic',
                selectedLocations: new OrderedMap({
                    '1,2_LOS ANGELES_CITY': {
                        matched_ids: [1, 2],
                        parent: 'CALIFORNIA',
                        place_type: 'CITY',
                        place: 'LOS ANGELES',
                        identifier: '1,2_LOS ANGELES_CITY'
                    }
                })
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });

            topBarContainer.instance().clearFilterGroup('selectedLocations');

            // validate that the clearFilterType Redux action is called twice
            expect(mockReduxAction).toHaveBeenCalledTimes(2);
        });

        it('should be able to trigger Redux actions that can reset the specific location filter values', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                locationDomesticForeign: 'domestic',
                selectedLocations: new OrderedMap({
                    '1,2_LOS ANGELES_CITY': {
                        matched_ids: [1, 2],
                        parent: 'CALIFORNIA',
                        place_type: 'CITY',
                        place: 'LOS ANGELES',
                        identifier: '1,2_LOS ANGELES_CITY'
                    },
                    '3,4_TORONTO_CITY': {
                        matched_ids: [3, 4],
                        parent: 'CANADA',
                        place_type: 'CITY',
                        place: 'TORONTO',
                        identifier: '3,4_TORONTO_CITY'
                    }
                })
            });

            const expectedReduxArguments = {
                type: 'selectedLocations',
                value: new OrderedMap({
                    '3,4_TORONTO_CITY': {
                        matched_ids: [3, 4],
                        parent: 'CANADA',
                        place_type: 'CITY',
                        place: 'TORONTO',
                        identifier: '3,4_TORONTO_CITY'
                    }
                })
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('selectedLocations', '1,2_LOS ANGELES_CITY');
        });

        it('should be able to trigger Redux actions that can overwrite entire filter group values', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                awardType: new Set(['03', '04'])
            });

            const expectedReduxArguments = {
                type: 'awardType',
                value: new Set(['01', '02'])
            };

            // validate that the Redux action receives the arguments it is expecting
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function the overwrite a filter
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });
            topBarContainer.instance().overwriteFilter('awardType', new Set(['01', '02']));

            // validate that the Redux function is called
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should be able to trigger Redux actions that can reset the entire Awarding Agency Filter', () => {

        });

        it('should be able to trigger Redux actions that can reset the entire Funding Agency Filter', () => {

        });
    });
});
