/**
 * SubawardsContainer-test.jsx
 * Created by Kevin Li 4/19/17
 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';


import { SubawardsContainer } from
    'containers/award/subawards/SubawardsContainer';

import * as SearchHelper from 'helpers/searchHelper';
import SubawardItem from 'models/results/award/SubawardItem';

import { mockAward } from '../mockAward';
import { mockSubawards } from '../mockSubawards';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const fetchDataSpy = sinon.spy(SubawardsContainer.prototype, 'fetchSubawards');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/subawards/SubawardsTable', () =>
    jest.fn(() => null));

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

const mockReduxActions = {
    setSubawards: jest.fn(),
    appendSubawards: jest.fn(),
    setSubawardMeta: jest.fn(),
    setSubawardSort: jest.fn()
};

const mockReduxValues = {
    subawards: [],
    meta: {
        hasNext: false,
        page: 1,
        render: '',
        group: ''
    },
    sort: {
        field: "subaward_number",
        direction: "desc"
    }
};

describe('SubawardsContainer', () => {
    it('should load data on mount', () => {
        mockSearchHelper('performSubawardSearch', 'resolve', mockSubawards);

        mount(<SubawardsContainer
            {...mockReduxActions}
            {...mockReduxValues}
            award={mockAward} />);

        jest.runAllTicks();

        expect(fetchDataSpy.callCount).toEqual(1);
        fetchDataSpy.reset();
    });

    it('should reload data when the award ID changes', () => {
        mockSearchHelper('performSubawardSearch', 'resolve', mockSubawards);

        const container = mount(<SubawardsContainer
            {...mockReduxActions}
            {...mockReduxValues}
            award={mockAward} />);

        jest.runAllTicks();
        expect(fetchDataSpy.callCount).toEqual(1);

        const newAward = Object.assign({}, mockAward, {
            id: 9999
        });
        container.setProps({
            award: newAward
        });

        jest.runAllTicks();
        expect(fetchDataSpy.callCount).toEqual(2);
        fetchDataSpy.reset();
    });

    it('should reload data when the subaward sort props change', () => {
        mockSearchHelper('performSubawardSearch', 'resolve', mockSubawards);

        const container = mount(<SubawardsContainer
            {...mockReduxActions}
            {...mockReduxValues}
            award={mockAward} />);

        jest.runAllTicks();
        expect(fetchDataSpy.callCount).toEqual(1);

        const newSort = {
            field: 'new_field',
            direction: 'asc'
        };
        container.setProps({
            sort: newSort
        });

        jest.runAllTicks();
        expect(fetchDataSpy.callCount).toEqual(2);
        fetchDataSpy.reset();
    });

    describe('loadNextPage', () => {
        it('should load the next page when available', () => {
            mockSearchHelper('performSubawardSearch', 'resolve', mockSubawards);

            const customProps = Object.assign({}, mockReduxActions, mockReduxValues, {
                meta: {
                    hasNext: true,
                    page: 2,
                    render: '',
                    group: ''
                }
            });

            const container = shallow(<SubawardsContainer
                {...customProps}
                award={mockAward} />);

            container.instance().loadNextPage();

            jest.runAllTicks();
            expect(fetchDataSpy.callCount).toEqual(1);
            fetchDataSpy.reset();
        });

        it('should do nothing there are no pages to load', () => {
            mockSearchHelper('performSubawardSearch', 'resolve', mockSubawards);

            const customProps = Object.assign({}, mockReduxActions, mockReduxValues, {
                meta: {
                    hasNext: false,
                    page: 2,
                    render: '',
                    group: ''
                }
            });

            const container = shallow(<SubawardsContainer
                {...customProps}
                award={mockAward} />);

            container.instance().loadNextPage();

            jest.runAllTicks();
            expect(fetchDataSpy.callCount).toEqual(0);
            fetchDataSpy.reset();
        });
    });

    describe('parseSubawards', () => {
        it('should parse API responses into SubawardItem objects', () => {
            // reset all the mock redux actions
            Object.keys(mockReduxActions).forEach((key) => {
                mockReduxActions[key].mockClear();
            });

            mockSearchHelper('performSubawardSearch', 'resolve', mockSubawards);

            const container = shallow(<SubawardsContainer
                {...mockReduxActions}
                {...mockReduxValues}
                award={mockAward} />);

            container.instance().parseSubawards(mockSubawards, true);

            const parsedItem = new SubawardItem(mockSubawards.results[0]);
            // delete the uniquely generated key so we know the exact output
            delete parsedItem._jsid;

            const setSubawardsArgs = mockReduxActions.setSubawards.mock.calls[0];
            expect(setSubawardsArgs).toHaveLength(1);

            // delete the parsed item's unique key (first item in an array that is passed as the
            // first argument)
            delete setSubawardsArgs[0][0]._jsid;
            expect(setSubawardsArgs[0]).toEqual([parsedItem]);


            const expectedMeta = {
                page: 1,
                hasNext: false
            };

            const metaArgs = mockReduxActions.setSubawardMeta.mock.calls[0];
            expect(metaArgs).toHaveLength(1);

            // remove the uniquely generated IDs from the arguments
            delete metaArgs[0].render;
            delete metaArgs[0].group;

            expect(metaArgs[0]).toEqual(expectedMeta);
        });

        it('should append items rather than overwrite items when the reset flag is false', () => {
            // reset all the mock redux actions
            Object.keys(mockReduxActions).forEach((key) => {
                mockReduxActions[key].mockClear();
            });

            const customResponse = Object.assign({}, mockSubawards, {
                page_metadata: {
                    page: 2,
                    has_next_page: false
                }
            });

            mockSearchHelper('performSubawardSearch', 'resolve', customResponse);

            const customReduxValues = Object.assign({}, mockReduxValues, {
                meta: {
                    hasNext: true,
                    page: 1,
                    render: '-40',
                    group: '-20'
                }
            });

            const container = shallow(<SubawardsContainer
                {...mockReduxActions}
                {...customReduxValues}
                award={mockAward} />);

            container.instance().parseSubawards(customResponse, false);

            const parsedItem = new SubawardItem(mockSubawards.results[0]);
            // delete the uniquely generated key so we know the exact output
            delete parsedItem._jsid;

            expect(mockReduxActions.appendSubawards).toHaveBeenCalledTimes(1);
            expect(mockReduxActions.setSubawards).toHaveBeenCalledTimes(0);

            expect(container.props().meta.page).toEqual(1);
            expect(container.props().meta.hasNext).toBeTruthy();

            // get the arguments being sent to Redux
            const metaArgs = mockReduxActions.setSubawardMeta.mock.calls[0];
            expect(metaArgs).toHaveLength(1);
            expect(metaArgs[0].page).toEqual(2);
            expect(metaArgs[0].hasNext).toBeFalsy();
            expect(metaArgs[0].render).not.toEqual('-40');
        });
    });
});
