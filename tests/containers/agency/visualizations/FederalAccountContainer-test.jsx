/**
 * FederalAccountContainer-test.jsx
 * Created by Kevin Li 6/30/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import FederalAccountContainer from 'containers/agency/visualizations/FederalAccountContainer';
import * as AgencyHelper from 'helpers/agencyHelper';

import { mockAccount, parsedSeries } from './mocks/mockFederalAccount';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const loadDataSpy = sinon.spy(FederalAccountContainer.prototype, 'loadData');

const inboundProps = {
    id: '123',
    activeFY: '2017',
    obligatedAmount: 123456
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/agency/visualizations/federalAccount/FederalAccountVisualization', () =>
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
    jest.unmock('helpers/agencyHelper');
};

describe('FederalAccountContainer', () => {
    it('should make an API call for the selected agency on mount', () => {
        mockAgencyHelper('fetchAgencyFederalAccounts', 'resolve', mockAccount);

        mount(<FederalAccountContainer
            {...inboundProps} />);

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toEqual(1);
        loadDataSpy.reset();

        unmockAgencyHelper();
    });

    it('should make a new API call when the inbound agency ID prop changes', () => {
        mockAgencyHelper('fetchAgencyFederalAccounts', 'resolve', mockAccount);

        const container = mount(<FederalAccountContainer
            {...inboundProps} />);

        const loadDataMock = jest.fn();
        container.instance().loadData = loadDataMock;

        // change the agency ID
        container.setProps({
            id: '555'
        });

        jest.runAllTicks();

        expect(loadDataMock).toHaveBeenCalledWith('555', inboundProps.activeFY);
        loadDataSpy.reset();

        unmockAgencyHelper();
    });

    describe('parseData', () => {
        it('should parse the returned API response', () => {
            mockAgencyHelper('fetchAgencyFederalAccounts', 'resolve', mockAccount);
            const container = shallow(<FederalAccountContainer
                {...inboundProps} />);

            container.instance().parseData(mockAccount.results);

            expect(container.state().dataSeries).toEqual(parsedSeries.dataSeries);
            expect(container.state().labelSeries).toEqual(parsedSeries.labelSeries);
            expect(container.state().linkSeries).toEqual(parsedSeries.linkSeries);
        });
    });
});
