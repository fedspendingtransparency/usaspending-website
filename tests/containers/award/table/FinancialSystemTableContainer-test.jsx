/**
 * FinancialSystemTableContainer-test.jsx
 * Created by Kevin Li 3/9/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { FinancialSystemTableContainer } from
    'containers/award/table/FinancialSystemTableContainer';
import * as awardActions from 'redux/actions/award/awardActions';
import * as SearchHelper from 'helpers/searchHelper';

import FinancialSystemItem from 'models/results/other/FinancialSystemItem';

import { mockAward } from '../mockAward';
import mockFinancialSystemDetails from '../mockFinancialSystemDetails';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/table/FinancialSystemTable', () =>
    jest.fn(() => null));

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const mockActions = {};

// replace all the award actions with mocked functions
Object.keys(awardActions).forEach((key) => {
    mockActions[key] = jest.fn();
});

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

const loadDataSpy = sinon.spy(FinancialSystemTableContainer.prototype, 'loadFinancialSystemData');

describe('FinancialSystemTableContainer', () => {
    it('should perform an API request on mount', () => {
        mockSearchHelper('performFinancialSystemLookup', 'resolve', mockFinancialSystemDetails);

        mount(<FinancialSystemTableContainer
            {...mockActions}
            award={mockAward} />);

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toBe(1);
        unmockSearchHelper();
        loadDataSpy.reset();
    });

    it('should perform an API request when the award ID changes', () => {
        mockSearchHelper('performFinancialSystemLookup', 'resolve', mockFinancialSystemDetails);

        const container = mount(<FinancialSystemTableContainer
            {...mockActions}
            award={mockAward} />);

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toBe(1);

        container.setProps({
            award: Object.assign({}, mockAward, {
                selectedAward: {
                    id: 1
                }
            })
        });

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toBe(2);
        unmockSearchHelper();
        loadDataSpy.reset();
    });

    describe('loadFinancialSystemData', () => {
        it('should correctly parse API data into FinancialSystemItem objects', (done) => {
            const item = new FinancialSystemItem(mockFinancialSystemDetails.results[0]);
            delete item._jsid;

            mockSearchHelper('performFinancialSystemLookup', 'resolve', mockFinancialSystemDetails);

            const setFinSysData = (args) => {
                const output = args[0];
                delete output._jsid;

                expect([output]).toEqual([item]);

                loadDataSpy.reset();
                done();
            };

            const customActions = Object.assign({}, mockActions);
            delete mockActions.setFinSysData;

            mount(<FinancialSystemTableContainer
                {...customActions}
                setFinSysData={setFinSysData}
                award={mockAward} />);

            jest.runAllTicks();
        });

        it('should append the API data to the Redux store when the reset flag is false', (done) => {
            mockSearchHelper('performFinancialSystemLookup', 'resolve', mockFinancialSystemDetails);

            const appendFinSysData = jest.fn(() => {
                expect(appendFinSysData).toHaveBeenCalled();
                done();
            });

            const customActions = Object.assign({}, mockActions);
            delete mockActions.appendFinSysData;

            const container = mount(<FinancialSystemTableContainer
                {...customActions}
                appendFinSysData={appendFinSysData}
                award={mockAward} />);

            container.instance().loadFinancialSystemData(1, false);

            jest.runAllTicks();
        });
    });

    describe('nextPage', () => {
        it('should load the next page of data when available', () => {
            loadDataSpy.reset();

            mockSearchHelper('performFinancialSystemLookup', 'resolve', mockFinancialSystemDetails);

            const modifiedProps = Object.assign({}, mockAward, {
                finSysMeta: {
                    page: 1,
                    nextPage: true
                }
            });

            const container = shallow(<FinancialSystemTableContainer
                {...mockActions}
                award={modifiedProps} />);

            container.instance().nextPage();
            expect(loadDataSpy.callCount).toBe(1);
        });
        it('should not do load more data when it is on the last page', () => {
            loadDataSpy.reset();

            mockSearchHelper('performFinancialSystemLookup', 'resolve', mockFinancialSystemDetails);

            const modifiedProps = Object.assign({}, mockAward, {
                finSysMeta: {
                    page: 5,
                    nextPage: false
                }
            });

            const container = shallow(<FinancialSystemTableContainer
                {...mockActions}
                award={modifiedProps} />);

            container.instance().nextPage();
            expect(loadDataSpy.callCount).toBe(0);
        });
    });
});
