/**
 * RecipientContainer-test.jsx
 * Created by Kevin Li 6/13/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import RecipientContainer from 'containers/agency/visualizations/RecipientContainer';
import * as AgencyHelper from 'helpers/agencyHelper';

import { mockRecipient } from './mocks/mockRecipient';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const loadDataSpy = sinon.spy(RecipientContainer.prototype, 'loadData');

const inboundProps = {
    id: '123',
    activeFY: '2017'
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/agency/visualizations/recipient/RecipientVisualization', () =>
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
    jest.unmock('helpers/accountHelper');
};

describe('RecipientContainer', () => {
    it('should make an API call for the selected account on mount', () => {
        mockAgencyHelper('fetchAwardRecipients', 'resolve', mockRecipient);

        mount(<RecipientContainer
            {...inboundProps} />);

        jest.runAllTicks();

        expect(loadDataSpy.callCount).toEqual(1);
        loadDataSpy.reset();
    });
});
