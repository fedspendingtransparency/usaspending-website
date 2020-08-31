/**
 * RecipientContainer-test.jsx
 * Created by Lizzie Salita 6/25/18
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { RecipientContainer } from 'containers/recipient/RecipientContainer';
import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';
import { mockActions, mockProps } from './mockData';
import { mockRecipientOverview } from '../../models/recipient/mockRecipientApi';

// mock the state helper
jest.mock('helpers/recipientHelper', () => require('./mockRecipientHelper'));


// mock the child component by replacing it with a function that returns a null element
jest.mock('components/recipient/RecipientPage', () => jest.fn(() => null));

describe('RecipientContainer', () => {
    it('on mount: should make an API call for the selected recipient & set fiscal year based on url params', async () => {
        const container = mount(<RecipientContainer
            {...mockProps}
            {...mockActions} />);

        const loadRecipientOverview = jest.fn();
        container.instance().loadRecipientOverview = loadRecipientOverview;

        container.instance().componentDidMount();
        await container.instance().request.promise;

        expect(loadRecipientOverview).toHaveBeenCalledTimes(1);
        expect(mockActions.setRecipientFiscalYear).toHaveBeenCalledWith(mockProps.match.params.fy);
        expect(loadRecipientOverview).toHaveBeenCalledWith('0123456-ABC-P', 'latest');
    });
    it('should make an API call when the id changes', async () => {
        const container = mount(<RecipientContainer
            {...mockProps}
            {...mockActions} />);

        const loadRecipientOverview = jest.fn();
        container.instance().loadRecipientOverview = loadRecipientOverview;

        container.setProps({
            match: {
                params: {
                    recipientId: '098765-XYZ-P'
                }
            }
        });

        await container.instance().request.promise;

        expect(loadRecipientOverview).toHaveBeenCalledTimes(1);
        expect(loadRecipientOverview).toHaveBeenCalledWith('098765-XYZ-P', 'latest');
    });
    it('should reset the fiscal year when the id changes', async () => {
        // Use 'all' for the initial FY
        const recipient = Object.assign({}, mockProps.recipient, {
            fy: 'all'
        });
        const updatedRedux = Object.assign({}, mockProps, {
            recipient
        });

        const container = mount(<RecipientContainer
            {...updatedRedux}
            {...mockActions} />);

        const loadRecipientOverview = jest.fn();
        container.instance().loadRecipientOverview = loadRecipientOverview;

        container.setProps({
            match: {
                params: {
                    recipientId: '876543-ABC-R'
                }
            }
        });

        await container.instance().request.promise;

        expect(loadRecipientOverview).toHaveBeenLastCalledWith('876543-ABC-R', 'latest');
    });
    it('should handle changes in the new fy url param', () => {
        // Use 'all' for the initial FY
        jest.clearAllMocks();
        const container = mount(<RecipientContainer
            {...mockProps}
            {...mockActions} />);

        container.setProps({
            match: {
                params: {
                    recipientId: '876543-ABC-R'
                }
            }
        });

        expect(mockActions.setRecipientFiscalYear).toHaveBeenCalledWith('latest');

        container.setProps({
            match: {
                params: {
                    fy: '2009'
                }
            }
        });

        expect(mockActions.setRecipientFiscalYear).toHaveBeenCalledWith('2009');
    });
    it('should make an API call when the fiscal year changes', async () => {
        const container = mount(<RecipientContainer
            {...mockProps}
            {...mockActions} />);

        const loadRecipientOverview = jest.fn();
        container.instance().loadRecipientOverview = loadRecipientOverview;

        const recipient = Object.assign({}, mockProps.recipient, {
            fy: '2018'
        });

        const nextProps = Object.assign({}, mockProps, {
            recipient
        });

        container.setProps(nextProps);

        await container.instance().request.promise;

        expect(loadRecipientOverview).toHaveBeenCalledTimes(1);
        expect(loadRecipientOverview).toHaveBeenCalledWith('0123456-ABC-P', '2018');
    });
    describe('parseOverview', () => {
        it('should update the Redux state with a new BaseRecipientOverview', () => {
            const container = shallow(<RecipientContainer
                {...mockProps}
                {...mockActions} />);

            // Reset the mock action's call count
            mockActions.setRecipientOverview.mockReset();

            container.instance().parseRecipient(mockRecipientOverview);

            const expectedParam = Object.create(BaseRecipientOverview);
            expectedParam.populate(mockRecipientOverview);

            expect(mockActions.setRecipientOverview).toHaveBeenCalledTimes(1);
            expect(mockActions.setRecipientOverview).toHaveBeenCalledWith(expectedParam);
        });
    });
});
