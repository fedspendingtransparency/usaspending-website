/**
 * ObligatedContainer-test.jsx
 * Created by Lizzie Salita 6/14/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import ObligatedContainer from 'containers/agency/visualizations/ObligatedContainer';
import * as AgencyHelper from 'helpers/agencyHelper';

import { mockObligatedAmounts, mockCgacCode, mockFiscalQuarter } from './mocks/mockObligatedAmounts';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const loadDataSpy = sinon.spy(ObligatedContainer.prototype, 'loadData');
const fetchCgacCodeSpy = sinon.spy(
    ObligatedContainer.prototype, 'fetchCgacCode');
const fetchFiscalQuarterSpy = sinon.spy(
    ObligatedContainer.prototype, 'fetchFiscalQuarter');

const inboundProps = {
    id: '246',
    activeFY: '2017'
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/agency/visualizations/obligated/ObligatedVisualization', () =>
    jest.fn(() => null));

// mock the GuideButtonWrapper container because there's no Redux store to connect to
jest.mock('containers/guide/GuideButtonWrapperContainer', () =>
    jest.fn(() => null));

// also mock the Guide container for the same reason
jest.mock('containers/guide/GuideContainer', () =>
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

describe('ObligatedContainer', () => {
    it('should make an API call for the selected agency obligated amounts on mount', () => {
        mockAgencyHelper('fetchAgencyObligatedAmounts', 'resolve', mockObligatedAmounts);

        mount(<ObligatedContainer
            {...inboundProps} />);

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toEqual(1);
        loadDataSpy.reset();

        unmockAgencyHelper();
    });

    it('should make a new API call for obligated amounts when the inbound agency ID prop' +
        ' changes', () => {
        mockAgencyHelper('fetchAgencyObligatedAmounts', 'resolve', mockObligatedAmounts);

        const container = mount(<ObligatedContainer
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

    it('should make an API call for the cgac code', () => {
        mockAgencyHelper('fetchCgacCode', 'resolve', mockCgacCode);

        const container = mount(<ObligatedContainer
            {...inboundProps} />);

        container.instance().fetchCgacCode(inboundProps.id);

        jest.runAllTicks();

        expect(fetchCgacCodeSpy.callCount).toEqual(1);
        fetchCgacCodeSpy.reset();

        unmockAgencyHelper();
    });

    it('should make an API call for the fiscal quarter', () => {
        mockAgencyHelper('fetchFiscalQuarter', 'resolve', mockFiscalQuarter);

        const container = mount(<ObligatedContainer
            {...inboundProps} />);

        container.instance().fetchFiscalQuarter(`123`);

        jest.runAllTicks();

        expect(fetchFiscalQuarterSpy.callCount).toEqual(1);
        fetchFiscalQuarterSpy.reset();

        unmockAgencyHelper();
    });
});
