/**
 * ReferencedAwardsContainer-test.js
 * Created by Lizzie Salita 2/21/19
 **/

import React from 'react';
import { shallow } from 'enzyme';

import { ReferencedAwardsContainer } from 'containers/awardV2/idv/ReferencedAwardsContainer';

import { mockRedux } from '../mockAward';
import { mockReferencedAwards, mockReferencedAwardCounts } from '../../../models/awardsV2/mockAwardApi';

import BaseReferencedAwardResult from 'models/v2/awardsV2/BaseReferencedAwardResult';

jest.mock('helpers/idvHelper', () => require('./mockIdvHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/awardv2/idv/referencedAwards/ReferencedAwardsSection', () => jest.fn(() => null));

describe('ReferencedAwardsContainer', () => {
    it('should make an API call for the award counts on mount', async () => {
        const container = shallow(<ReferencedAwardsContainer
            {...mockRedux} />);

        const parseTabCounts = jest.fn();
        container.instance().parseTabCounts = parseTabCounts;

        container.instance().componentDidMount();
        await container.instance().countRequest.promise;

        expect(parseTabCounts).toHaveBeenCalledWith({ idvs: 45, contracts: 50 });
    });
    it('should make an API call for the award counts when the award id changes', async () => {
        const container = shallow(<ReferencedAwardsContainer
            {...mockRedux} />);

        const parseTabCounts = jest.fn();
        container.instance().parseTabCounts = parseTabCounts;

        const prevProps = {
            award: {
                id: 'abc123'
            }
        };

        container.instance().componentDidUpdate(prevProps);
        await container.instance().countRequest.promise;

        expect(parseTabCounts).toHaveBeenCalledWith(mockReferencedAwardCounts);
    });
    describe('parseTabCounts', () => {
        it('should make an API call for the referenced awards and update the state', async () => {
            const container = shallow(<ReferencedAwardsContainer
                {...mockRedux} />);

            const parseAwards = jest.fn();
            container.instance().parseAwards = parseAwards;

            container.instance().parseTabCounts(mockReferencedAwardCounts);
            await container.instance().request.promise;

            expect(parseAwards).toHaveBeenCalled();
            expect(container.state().counts).toEqual(mockReferencedAwardCounts);
        });
    });
    describe('parseAwards', () => {
        it('should use the model to parse each row and update the state', () => {
            const container = shallow(<ReferencedAwardsContainer
                {...mockRedux} />);
            container.instance().parseAwards(mockReferencedAwards.results);

            expect(Object.getPrototypeOf(container.state().results[0])).toEqual(BaseReferencedAwardResult);
        });
    });
    describe('updateSort', () => {
        it('should update the state and make an API call', async () => {
            const container = shallow(<ReferencedAwardsContainer
                {...mockRedux} />);

            const parseAwards = jest.fn();
            container.instance().parseAwards = parseAwards;

            container.instance().updateSort('obligated_amount', 'asc');
            await container.instance().request.promise;

            expect(container.state().sort).toEqual('obligated_amount');
            expect(container.state().order).toEqual('asc');
            expect(parseAwards).toHaveBeenCalled();
        });
    });
    describe('changePage', () => {
        it('should update the state and make an API call', async () => {
            const container = shallow(<ReferencedAwardsContainer
                {...mockRedux} />);

            const parseAwards = jest.fn();
            container.instance().parseAwards = parseAwards;

            container.instance().changePage(2);
            await container.instance().request.promise;

            expect(container.state().page).toEqual(2);
            expect(parseAwards).toHaveBeenCalled();
        });
    });
    describe('switchTab', () => {
        it('should update the state, reset the page to 1, and make an API call', async () => {
            const container = shallow(<ReferencedAwardsContainer
                {...mockRedux} />);

            const parseAwards = jest.fn();
            container.instance().parseAwards = parseAwards;

            container.instance().switchTab('contracts');
            await container.instance().request.promise;

            expect(container.state().tableType).toEqual('contracts');
            expect(parseAwards).toHaveBeenCalled();
        });
    });
});
