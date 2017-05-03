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

import  { mockReduxAccount, mockAwards, mockReduxAwards } from '../mockAccount';
import { defaultFilters } from '../defaultFilters';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const loadDataSpy = sinon.spy(AccountAwardsContainer.prototype, 'loadData');

const parameters = {
    accountId: 2507
};

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
    it('should fetch the awards associated with the federal account on mount', () => {
        mockSearchHelper('performSearch', 'resolve', mockAwards);

        const props = {
            account: mockReduxAccount,
            filters: defaultFilters,
            awards: new OrderedSet([]),
            meta: mockReduxAwards.awardsMeta,
            order: mockReduxAwards.awardsOrder,
            setAccountAwards: jest.fn()
        };

        mount(<AccountAwardsContainer {...props} />);

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toEqual(1);
        loadDataSpy.reset();
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
