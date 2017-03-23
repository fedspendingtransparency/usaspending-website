/**
 * AwardContainer-test.js
 * Created by Emily Gullo 03/03/2017
 **/

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { AwardContainer } from 'containers/award/AwardContainer';
import * as SearchHelper from 'helpers/searchHelper';
import AwardSummary from 'models/results/award/AwardSummary';

import { mockAward } from './mockAward';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const getAwardSpy = sinon.spy(AwardContainer.prototype, 'getSelectedAward');

const parameters = {
    awardId: 57557
};

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/Award', () =>
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

describe('AwardContainer', () => {
    it('should make an API call for the selected award on mount', () => {
        // Mock the api call
        mockSearchHelper('fetchAward', 'resolve', mockAward);

        // mount the container
        mount(<AwardContainer params={parameters} />);

        // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
        jest.runAllTicks();

        // checking that it ran
        expect(getAwardSpy.callCount).toEqual(1);

        // reset the spies
        unmockSearchHelper();
        getAwardSpy.reset();
    });

    it('should make an API call when the award ID parameter changes', () => {
        // Mock the api call
        mockSearchHelper('fetchAward', 'resolve', mockAward);

        // mount the container
        const container = mount(<AwardContainer params={parameters} />);

        // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
        jest.runAllTicks();

        // checking that it ran
        expect(getAwardSpy.callCount).toEqual(1);

        container.setProps({
            params: {
                awardId: 222
            }
        });

        jest.runAllTicks();
        expect(getAwardSpy.callCount).toEqual(2);

        // reset the spies
        unmockSearchHelper();
        getAwardSpy.reset();
    });

    // parse award
    it('should parse the returned award and send to redux store', () => {
        const expectedAward = new AwardSummary(mockAward);
        delete expectedAward._jsid;

         // Mock the call and validate it matches the expected award summary
        const mockReduxAward = jest.fn((args) => {
            const output = args;
            delete output._jsid;
            expect(output).toEqual(expectedAward);
        });

        // Set up container with mocked award action
        const awardContainer = shallow(
            <AwardContainer
                params={parameters}
                award={mockAward}
                setSelectedAward={mockReduxAward} />);

        const parseAwardSpy = sinon.spy(awardContainer.instance(),
            'parseAward');

        // Run function on instance of container
        awardContainer.instance().parseAward(mockAward);

        // checking that it ran
        expect(parseAwardSpy.callCount).toEqual(1);
        expect(mockReduxAward).toHaveBeenCalledTimes(1);

        // reset the spies
        parseAwardSpy.reset();
    });
});
