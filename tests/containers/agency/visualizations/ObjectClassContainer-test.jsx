/**
 * ObjectClassContainer-test.jsx
 * Created by michaelbray on 6/14/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import ObjectClassContainer from 'containers/agency/visualizations/ObjectClassContainer';
import * as AgencyHelper from 'helpers/agencyHelper';

import { mockMajorObjectClasses, mockMinorObjectClasses } from './mocks/mockObjectClasses';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const fetchMajorObjectClassesSpy = sinon.spy(
    ObjectClassContainer.prototype, 'fetchMajorObjectClasses');
const fetchMinorObjectClassesSpy = sinon.spy(
    ObjectClassContainer.prototype, 'fetchMinorObjectClasses');

const inboundProps = {
    id: '246',
    activeFY: '2017'
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/agency/visualizations/objectClass/ObjectClassTreeMap', () =>
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

describe('ObjectClassContainer', () => {
    it('should make an API call for the selected agency object classes on mount', () => {
        mockAgencyHelper('fetchAgencyMajorObjectClasses', 'resolve', mockMajorObjectClasses);

        mount(<ObjectClassContainer
            {...inboundProps} />);

        jest.runAllTicks();

        expect(fetchMajorObjectClassesSpy.callCount).toEqual(1);
        fetchMajorObjectClassesSpy.reset();

        unmockAgencyHelper();
    });

    it('should make a new API call for major object classes when the inbound agency ID prop' +
        ' changes', () => {
        mockAgencyHelper('fetchAgencyMajorObjectClasses', 'resolve', mockMajorObjectClasses);

        const container = mount(<ObjectClassContainer
            {...inboundProps} />);

        const fetchMajorObjectClassesMock = jest.fn();
        container.instance().fetchMajorObjectClasses = fetchMajorObjectClassesMock;

        // change the agency ID
        container.setProps({
            id: '555'
        });

        jest.runAllTicks();

        // expect(loadDataSpy.callCount).toEqual(1);
        expect(fetchMajorObjectClassesMock).toHaveBeenCalledWith('555', inboundProps.activeFY);
        fetchMajorObjectClassesSpy.reset();

        unmockAgencyHelper();
    });

    it('should make an API call for the minor object classes', () => {
        mockAgencyHelper('fetchAgencyMinorObjectClasses', 'resolve', mockMinorObjectClasses);

        const container = mount(<ObjectClassContainer
            {...inboundProps} />);

        container.instance().fetchMinorObjectClasses('00');

        jest.runAllTicks();

        expect(fetchMinorObjectClassesSpy.callCount).toEqual(1);
        fetchMinorObjectClassesSpy.reset();

        unmockAgencyHelper();
    });
});
