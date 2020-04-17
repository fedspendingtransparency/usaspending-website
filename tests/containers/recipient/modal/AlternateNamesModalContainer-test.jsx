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
        it('should update the state and store alternate names in the given order', () => {
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

            // Call updateSort
            container.instance().updateSort('alternateName', 'asc');

            const expectedOrder = ["ABC", "DEF", "GHI"];

            expect(container.state().sortField).toEqual('alternateName');
            expect(container.state().sortDirection).toEqual('asc');
            expect(container.state().alternateNames).toEqual(expectedOrder);
        });
    });
});
