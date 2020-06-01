/**
 * ReferencedAwardsContainer-test.js
 * Created by Lizzie Salita 2/21/19
 **/

import React from 'react';
import { shallow } from 'enzyme';

import { ReferencedAwardsContainer } from 'containers/award/idv/ReferencedAwardsContainer';
import BaseReferencedAwardResult from 'models/v2/award/BaseReferencedAwardResult';
import { mockRedux } from '../mockAward';
import { mockReferencedAwards } from '../../../models/award/mockAwardApi';

jest.mock('helpers/idvHelper', () => require('./mockIdvHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/idv/referencedAwards/ReferencedAwardsSection', () => jest.fn(() => null));

describe('ReferencedAwardsContainer', () => {
    it('should call pickDefaultTab onMount', () => {
        const container = shallow(<ReferencedAwardsContainer
            {...mockRedux} />);

        const pickDefaultTab = jest.fn();
        container.instance().pickDefaultTab = pickDefaultTab;

        container.instance().componentDidMount();

        expect(pickDefaultTab).toHaveBeenCalled();
    });
    it('should call pickDefaultTab when the award ID changes', () => {
        const container = shallow(<ReferencedAwardsContainer
            {...mockRedux} />);

        const pickDefaultTab = jest.fn();
        container.instance().pickDefaultTab = pickDefaultTab;

        const prevProps = {
            award: {
                id: 'abc123'
            }
        };

        container.instance().componentDidUpdate(prevProps);

        expect(pickDefaultTab).toHaveBeenCalled();
    });
    describe('pickDefaultTab', () => {
        it('should make an API call for the referenced awards', async () => {
            const container = shallow(<ReferencedAwardsContainer
                {...mockRedux} />);

            const parseAwards = jest.fn();
            container.instance().parseAwards = parseAwards;

            container.instance().pickDefaultTab();
            await container.instance().request.promise;

            expect(parseAwards).toHaveBeenCalled();
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
            expect(container.state().sort.child_awards).toEqual('obligated_amount');
            expect(container.state().order.child_awards).toEqual('asc');
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

            expect(container.state().page.child_awards).toEqual(2);
            expect(parseAwards).toHaveBeenCalled();
        });
    });
});
