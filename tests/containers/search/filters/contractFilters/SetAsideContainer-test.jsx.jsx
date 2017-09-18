/**
 * SetAsideContainer-test.jsx
 * Created by Emily Gullo on 06/27/2017
 */

import React from 'react';
import { shallow } from 'enzyme';

import { SetAsideContainer }
    from 'containers/search/filters/SetAsideContainer';

describe('SetAsideContainer', () => {
    describe('Handle adding and removing set aside items', () => {
        it('should add a predefined set aside that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('8AN');
            });

            // Set up container with mocked Set Aside action
            const setAsideContainer = shallow(
                <SetAsideContainer
                    updateSetAside={mockReduxAction} />);

            // Add Select Pricing to redux
            setAsideContainer.instance().selectSetAside('8AN');

            // everything should be updated now
            expect(mockReduxAction).toHaveBeenCalled();
        });
    });
});
