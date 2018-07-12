/**
 * StateLandingContainer-test.jsx
 * Created by Kevin Li 5/23/18
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import RecipientLandingContainer from 'containers/recipientLanding/RecipientLandingContainer';
import { fetchAllRecipients } from './mockRecipientHelper';
import { mockRecipientList } from './mockData';


//jest.mock('helpers/recipientHelper', () => require('./mockRecipientHelper'));


//import BaseStateLandingItem from 'models/v2/state/BaseStateLandingItem';


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

    describe('fetchRecipients', () => {
        it('should make an API call', () => {
            const container = shallow(
                <RecipientLandingContainer />
            );

            container.instance().fetchRecipients();
            expect(fetchAllRecipients).toHaveBeenCalledTimes(1);
        });
        it('should call parseRecipients on success', async () => {
            const container = shallow(
                <RecipientLandingContainer />
            );
            container.instance().parseRecipients = jest.fn();

            container.instance().fetchRecipients();
            await container.instance().recipientsRequest.promise;

            expect(container.instance().parseRecipients).toHaveBeenCalledTimes(1);
        });
    });

    // describe('parseData', () => {
    //     it('should return an array of BaseStateLandingItem objects', () => {
    //         const container = shallow(
    //             <StateLandingContainer />
    //         );
    //         container.instance().performSearch = jest.fn();
    //         container.instance().parseData(mockStateList);

    //         expect(container.state().fullData.length).toEqual(2);
    //         expect(Object.getPrototypeOf(container.state().fullData[0])).toEqual(BaseStateLandingItem);
    //     });
    //     it('should update the loading and error states to false', () => {
    //         const container = shallow(
    //             <StateLandingContainer />
    //         );
    //         container.instance().parseData(mockStateList);

    //         expect(container.state().loading).toBeFalsy();
    //         expect(container.state().error).toBeFalsy();
    //     });
    //     it('should trigger a search operation', () => {
    //         const container = shallow(
    //             <StateLandingContainer />
    //         );
    //         container.instance().performSearch = jest.fn();
    //         container.instance().parseData(mockStateList);

    //         expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
    //     });
    // });
});
