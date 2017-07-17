/**
 * AwardContainer-test.js
 * Created by Emily Gullo 03/03/2017
 **/

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { AwardContainer } from 'containers/award/AwardContainer';
import AwardSummary from 'models/results/award/AwardSummary';

import { mockAward } from './mockAward';

// spy on specific functions inside the component
const getAwardSpy = sinon.spy(AwardContainer.prototype, 'getSelectedAward');

const parameters = {
    awardId: 57557
};

jest.mock('helpers/searchHelper', () => require('./awardHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/Award', () =>
    jest.fn(() => null));

describe('AwardContainer', () => {
    it('should make an API call for the selected award on mount', async () => {
        // mount the container
        const container = mount(
            <AwardContainer
                params={parameters}
                setSelectedAward={jest.fn()} />);

        await container.instance().awardRequest.promise;

        // checking that it ran
        expect(getAwardSpy.callCount).toEqual(1);

        // reset the spies
        getAwardSpy.reset();
    });

    it('should make an API call when the award ID parameter changes', async () => {
        // mount the container
        const container = mount(
            <AwardContainer
                params={parameters}
                setSelectedAward={jest.fn()} />);

        await container.instance().awardRequest.promise;

        // checking that it ran
        expect(getAwardSpy.callCount).toEqual(1);

        container.setProps({
            params: {
                awardId: 222
            }
        });

        expect(getAwardSpy.callCount).toEqual(2);

        // reset the spies
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
