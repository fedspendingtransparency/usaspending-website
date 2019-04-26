/**
 * AgencyContainer-test.jsx
 * Created by Kevin Li 6/15/17
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { is } from 'immutable';

import { AgencyContainer } from 'containers/agency/AgencyContainer';
import * as AgencyHelper from 'helpers/agencyHelper';

import { mockApi, mockRedux } from './mockAgency';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/agency/AgencyPage', () =>
    jest.fn(() => null));

// mock the GlossaryButtonWrapper container because there's no Redux store to connect to
jest.mock('containers/glossary/GlossaryButtonWrapperContainer', () =>
    jest.fn(() => null));

// also mock the Glossary container for the same reason
jest.mock('containers/glossary/GlossaryContainer', () =>
    jest.fn(() => null));

const mockAgencyHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    AgencyHelper[functionName] = jest.fn(() => {
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

const unmockAgencyHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/accountHelper');
};

describe('AgencyContainer', () => {
    it('should make an API call for the selected agency on mount', () => {
        mockAgencyHelper('fetchAgencyOverview', 'resolve', mockApi);

        const container = shallow(<AgencyContainer
            {...mockRedux} />);
        const mockLoad = jest.fn();
        container.instance().loadAgencyOverview = mockLoad;

        container.instance().componentDidMount();
        jest.runAllTicks();

        expect(mockLoad).toHaveBeenCalledTimes(1);
        expect(mockLoad).toHaveBeenCalledWith('123');
    });

    it('should make a new API call when the URL award ID param changes', () => {
        mockAgencyHelper('fetchAgencyOverview', 'resolve', mockApi);

        const container = shallow(<AgencyContainer
            {...mockRedux} />);
        const mockLoad = jest.fn();
        container.instance().loadAgencyOverview = mockLoad;

        const prevProps = Object.assign({}, mockRedux, {
            params: {
                agencyId: '232'
            }
        });

        container.instance().componentDidUpdate(prevProps);
        jest.runAllTicks();

        expect(mockLoad).toHaveBeenCalledTimes(1);
        expect(mockLoad).toHaveBeenCalledWith('123');
    });

    describe('parseOverview', () => {
        it('should create a new AgencyOverviewModel instance based on the API response', () => {
            mockAgencyHelper('fetchAgencyOverview', 'resolve', mockApi);

            const mockSetAgency = jest.fn();

            const mockProps = Object.assign({}, mockRedux, {
                setAgencyOverview: mockSetAgency
            });

            const container = shallow(<AgencyContainer
                {...mockProps} />);
            container.instance().parseOverview(mockApi.results, '123');

            expect(mockSetAgency).toHaveBeenCalledTimes(1);

            const args = mockSetAgency.mock.calls[0];
            const expectedModel = mockRedux.agency.overview;

            expect(args[0]).toEqual(expectedModel);
        });
    });
});
