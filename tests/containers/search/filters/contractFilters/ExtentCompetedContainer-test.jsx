/**
 * ExtentCompetedContainer-test.jsx
 * Created by Emily Gullo on 06/27/2017
 */

import React from 'react';
import { shallow } from 'enzyme';

import { ExtentCompetedContainer }
    from 'containers/search/filters/ExtentCompetedContainer';

describe('ExtentCompetedContainer', () => {
    describe('Handle adding and removing extent competed items', () => {
        it('should add a predefined extent competed that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('F');
            });

            // Set up container with mocked Extent Competed action
            const extentCompetedContainer = shallow(
                <ExtentCompetedContainer
                    updateExtentCompeted={mockReduxAction} />);

            // Add Select Pricing to redux
            extentCompetedContainer.instance().selectExtentCompeted('F');

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalled();
        });
    });
});
