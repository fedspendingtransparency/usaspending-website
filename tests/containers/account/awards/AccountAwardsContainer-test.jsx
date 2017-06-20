/**
 * AccountAwardsContainer-test.jsx
 * Created by Kevin Li 4/14/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { OrderedSet } from 'immutable';

import { AccountAwardsContainer } from 'containers/account/awards/AccountAwardsContainer';
import * as SearchHelper from 'helpers/searchHelper';
import FederalAccount from 'models/account/FederalAccount';

import { mockReduxAccount, mockAwards, mockReduxAwards, mockTabCount } from '../mockAccount';
import { defaultFilters } from '../defaultFilters';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const autoTabSpy = sinon.spy(AccountAwardsContainer.prototype, 'pickDefaultTab');
const loadDataSpy = sinon.spy(AccountAwardsContainer.prototype, 'loadData');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/account/awards/AccountAwardsSection', () =>
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

const unmockAccountHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/accountHelper');
};

describe('AccountAwardsContainer', () => {
    it('should pick a default tab for awards on mount', () => {
        mockSearchHelper('performSearch', 'resolve', mockAwards);
        mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);

        const props = {
            account: mockReduxAccount,
            filters: defaultFilters,
            awards: new OrderedSet([]),
            meta: mockReduxAwards.awardsMeta,
            order: mockReduxAwards.awardsOrder,
            setAccountAwards: jest.fn(),
            setAccountAwardType: jest.fn()
        };

        mount(<AccountAwardsContainer {...props} />);

        jest.runAllTicks();

        expect(autoTabSpy.callCount).toEqual(1);
        autoTabSpy.reset();
    });

    it('should pick a default tab when the Redux filters change', () => {
        mockSearchHelper('performSearch', 'resolve', mockAwards);
        mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);

        const props = {
            account: mockReduxAccount,
            filters: defaultFilters,
            awards: new OrderedSet([]),
            meta: mockReduxAwards.awardsMeta,
            order: mockReduxAwards.awardsOrder,
            setAccountAwards: jest.fn(),
            setAccountAwardType: jest.fn()
        };

        autoTabSpy.reset();
        const container = mount(<AccountAwardsContainer {...props} />);

        jest.runAllTicks();
        expect(autoTabSpy.callCount).toEqual(1);

        // change the filters
        const newFilters = Object.assign({}, defaultFilters, {
            obectClass: new OrderedSet(['10'])
        });
        container.setProps({
            filters: newFilters
        });

        jest.runAllTicks();
        expect(autoTabSpy.callCount).toEqual(2);
        autoTabSpy.reset();
    });

    it('should make an API call for new awards whenever the Redux table type changes', () => {
        mockSearchHelper('performSearch', 'resolve', mockAwards);
        mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);

        const props = {
            account: mockReduxAccount,
            filters: defaultFilters,
            awards: new OrderedSet([]),
            meta: mockReduxAwards.awardsMeta,
            order: mockReduxAwards.awardsOrder,
            setAccountAwards: jest.fn(),
            setAccountAwardType: jest.fn()
        };

        const container = mount(<AccountAwardsContainer {...props} />);

        jest.runAllTicks();
        loadDataSpy.reset();
        autoTabSpy.reset();
        expect(loadDataSpy.callCount).toEqual(0);

        // change the table type
        const newMeta = Object.assign({}, mockReduxAwards.awardsMeta, {
            type: 'loans'
        });
        container.setProps({
            meta: newMeta
        });

        jest.runAllTicks();
        expect(loadDataSpy.callCount).toEqual(1);
        expect(autoTabSpy.callCount).toEqual(0);
        loadDataSpy.reset();
    });

    describe('parseTabCounts', () => {
        it('should select the first tab (left to right) with a non-zero aggregate value', () => {
            mockSearchHelper('performSearch', 'resolve', mockAwards);
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);

            const props = {
                account: mockReduxAccount,
                filters: defaultFilters,
                awards: new OrderedSet([]),
                meta: mockReduxAwards.awardsMeta,
                order: mockReduxAwards.awardsOrder,
                setAccountAwards: jest.fn(),
                setAccountAwardType: jest.fn()
            };

            const container = shallow(<AccountAwardsContainer {...props} />);

            const mockSwitchTab = jest.fn();
            container.instance().switchTab = mockSwitchTab;

            container.instance().parseTabCounts(mockTabCount);
            expect(mockSwitchTab).toHaveBeenLastCalledWith('contracts');


            const secondTabResponse = Object.assign({}, mockTabCount, {
                results: [
                    {
                        type: 'A',
                        aggregate: '0.0'
                    },
                    {
                        type: '02',
                        aggregate: '500.0'
                    }
                ]
            });

            container.instance().parseTabCounts(secondTabResponse);
            expect(mockSwitchTab).toHaveBeenLastCalledWith('grants');
        });
    });

    describe('parseData', () => {
        it('should parse the API response and overwrite the Redux account awards on the first page', () => {
            const apiResponse = mockAwards;
            apiResponse.page_metadata.has_next_page = true;

            const mockReduxAction = jest.fn();

            const props = {
                account: mockReduxAccount,
                filters: defaultFilters,
                awards: new OrderedSet([]),
                meta: mockReduxAwards.awardsMeta,
                order: mockReduxAwards.awardsOrder,
                setAccountAwards: mockReduxAction
            };

            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().parseData(apiResponse, 1);

            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // extract the arguments passed to Redux
            const args = mockReduxAction.mock.calls[0];
            const reduxArg = args[0];
            expect(reduxArg.hasNext).toBeTruthy();
            expect(reduxArg.awards).toHaveLength(1);
        });
        it('should parse the API response and append the Redux account awards on subsequent pages', () => {
            const apiResponse = mockAwards;
            apiResponse.page_metadata.page = 2;
            apiResponse.page_metadata.has_next_page = false;

            const mockReduxAction = jest.fn();

            const props = {
                account: mockReduxAccount,
                filters: defaultFilters,
                awards: new OrderedSet([]),
                meta: mockReduxAwards.awardsMeta,
                order: mockReduxAwards.awardsOrder,
                appendAccountAwards: mockReduxAction
            };

            const container = shallow(<AccountAwardsContainer {...props} />);
            container.instance().parseData(apiResponse, 2);

            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // extract the arguments passed to Redux
            const args = mockReduxAction.mock.calls[0];
            const reduxArg = args[0];
            expect(reduxArg.hasNext).toBeFalsy();
            expect(reduxArg.page).toEqual(2);
            expect(reduxArg.awards).toHaveLength(1);
        });
    });

    describe('loadNextPage', () => {
        it('should load the next page when there are more pages available', () => {
            const meta = Object.assign({}, mockReduxAwards.awardsMeta, {
                page: 1,
                hasNext: true
            });

            const props = {
                meta,
                account: mockReduxAccount,
                filters: defaultFilters,
                awards: new OrderedSet([]),
                order: mockReduxAwards.awardsOrder,
                setAccountAwards: jest.fn()
            };

            const container = shallow(<AccountAwardsContainer {...props} />);

            const mockedLoadData = jest.fn();
            container.instance().loadData = mockedLoadData;

            container.instance().loadNextPage();
            expect(mockedLoadData).toHaveBeenCalledTimes(1);
        });
        it('should not load the next page when there are no more pages available', () => {
            const meta = Object.assign({}, mockReduxAwards.awardsMeta, {
                page: 1,
                hasNext: false
            });

            const props = {
                meta,
                account: mockReduxAccount,
                filters: defaultFilters,
                awards: new OrderedSet([]),
                order: mockReduxAwards.awardsOrder,
                setAccountAwards: jest.fn()
            };

            const container = shallow(<AccountAwardsContainer {...props} />);

            const mockedLoadData = jest.fn();
            container.instance().loadData = mockedLoadData;

            container.instance().loadNextPage();
            expect(mockedLoadData).not.toHaveBeenCalled();
        });
    });
});
