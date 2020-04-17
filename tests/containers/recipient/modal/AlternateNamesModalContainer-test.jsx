/**
 * AlternateNamesModalContainer-test.jsx
 * Created by Seth Stoudenmier 4/17/20
 */

import React from 'react';
import { shallow } from 'enzyme';

// mock the state helper
jest.mock('helpers/recipientHelper', () => require('../mockRecipientHelper'));

import { AlternateNamesRecipientModalContainer } from 'containers/recipient/modal/AlternateNamesRecipientModalContainer';
import { mockModalActions, mockModalRedux } from '../mockData';

// mock the alternate names component by replacing it with a function that returns a null element
jest.mock('components/recipient/modal/AlternateNamesRecipientModal', () => jest.fn(() => null));

describe('AlternateNamesModalContainer', () => {
    describe('updateSort', () => {
        const container = shallow(<AlternateNamesRecipientModalContainer
            {...mockModalRedux}
            {...mockModalActions} />);

        // Add alternate recipient names to the props
        const alternateNames = ["GHI", "DEF", "ABC"];

        const overview = Object.assign({}, mockModalRedux.recipient.overview, {
            alternateNames
        });
        const recipient = Object.assign({}, mockModalRedux.recipient, {
            overview
        });
        const nextProps = Object.assign({}, mockModalRedux, {
            recipient
        });

        container.setProps(nextProps);
        it('should update the state and store alternate names in the asc order', () => {
            // Call updateSort
            container.instance().updateSort('alternateNames', 'asc');

            const expectedOrder = ["ABC", "DEF", "GHI"];

            expect(container.state().sortField).toEqual('alternateNames');
            expect(container.state().sortDirection).toEqual('asc');
            expect(container.props().alternateNames).toEqual(expectedOrder);
        });

        it('should update the state and store alternate names in the desc order', () => {
            // Call updateSort
            container.instance().updateSort('alternateNames', 'desc');

            const expectedOrder = ["GHI", "DEF", "ABC"];

            expect(container.state().sortField).toEqual('alternateNames');
            expect(container.state().sortDirection).toEqual('desc');
            expect(container.props().alternateNames).toEqual(expectedOrder);
        });
    });
});
