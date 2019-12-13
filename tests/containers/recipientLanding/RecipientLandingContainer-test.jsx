/**
 * RecipientLandingContainer-test.jsx
 * Created by David Trinh 7/12/18
 */

import React from 'react';
import { shallow } from 'enzyme';

import BaseRecipientLandingRow from 'models/recipient/BaseRecipientLandingRow';
import RecipientLandingContainer from 'containers/recipientLanding/RecipientLandingContainer';
import { fetchAllRecipients } from './mockRecipientLandingHelper';
import { mockRecipientList } from './mockData';

jest.mock('helpers/recipientLandingHelper', () => require('./mockRecipientLandingHelper'));

describe('RecipientLandingContainer', () => {
    describe('setRecipientSearchString', () => {
        it('should update the setRecipientSearchString state value to the provided input', () => {
            const container = shallow(
                <RecipientLandingContainer />
            );

            container.instance().fetchRecipients = jest.fn();

            container.instance().setRecipientSearchString('test');
            expect(container.state().searchString).toEqual('test');
        });
        it('should trigger a fetch operation after setRecipientSearchString gets a value', () => {
            const container = shallow(
                <RecipientLandingContainer />
            );

            container.instance().fetchRecipients = jest.fn();

            container.instance().setRecipientSearchString('test');
            expect(container.instance().fetchRecipients).toHaveBeenCalledTimes(1);
        });
    });

    describe('setSort', () => {
        it('should update the sortField and sortDirection state values to the provided input', () => {
            const container = shallow(
                <RecipientLandingContainer />
            );
            container.instance().fetchRecipients = jest.fn();

            container.instance().setSort('field', 'direction');
            expect(container.state().order.field).toEqual('field');
            expect(container.state().order.direction).toEqual('direction');
        });
        it('should trigger a fetch operation', () => {
            const container = shallow(
                <RecipientLandingContainer />
            );
            container.instance().fetchRecipients = jest.fn();

            container.instance().setSort('field', 'direction');
            expect(container.instance().fetchRecipients).toHaveBeenCalledTimes(1);
        });
    });

    describe('setTab', () => {
        it('should update the awardType state values to the provided input', () => {
            const container = shallow(
                <RecipientLandingContainer />
            );
            container.instance().fetchRecipients = jest.fn();

            container.instance().setTab('all');
            expect(container.state().awardType).toEqual('all');
        });
        it('should trigger a fetch operation', () => {
            const container = shallow(
                <RecipientLandingContainer />
            );
            container.instance().fetchRecipients = jest.fn();

            container.instance().setTab('contracts');
            expect(container.instance().fetchRecipients).toHaveBeenCalledTimes(1);
        });
    });

    describe('fetchRecipients', () => {
        it('should make an API call', () => {
            const container = shallow(
                <RecipientLandingContainer />
            );
            container.instance().fetchRecipients();
            expect(fetchAllRecipients).toHaveBeenCalledTimes(1);
        });
    });

    describe('parseRecipients', () => {
        it('should return an array of BaseStateLandingItem objects', () => {
            const container = shallow(
                <RecipientLandingContainer />
            );
            container.instance().performSearch = jest.fn();
            container.instance().parseRecipients(mockRecipientList);

            expect(container.state().results.length).toEqual(2);
            expect(Object.getPrototypeOf(container.state().results[0])).toEqual(BaseRecipientLandingRow);
        });
        it('should update the loading and error states to false', () => {
            const container = shallow(
                <RecipientLandingContainer />
            );
            container.instance().parseRecipients(mockRecipientList);

            expect(container.state().loading).toBeFalsy();
            expect(container.state().error).toBeFalsy();
        });
    });
});
