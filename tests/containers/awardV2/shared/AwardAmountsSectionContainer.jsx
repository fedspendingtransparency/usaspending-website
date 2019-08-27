/**
 * IdvAwardAmountsSectionContainer-test.js
 * Created by David Trinh 2/14/2019
 * */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { IdvAwardAmountsSectionContainer } from 'containers/awardV2/idv/IdvAwardAmountsSectionContainer';

import { mockRedux, mockActions } from '../mockAward';
import { mockAwardAmounts } from '../../../models/awardsV2/mockAwardApi';

import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';


jest.mock('helpers/idvHelper', () => require('../awardV2Helper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/awardv2/idv/amounts/AggregatedAwardAmounts.jsx', () => jest.fn(() => null));

describe('IdvAwardAmountsSectionContainer', () => {
    it('should make an API call for the award amounts on mount', async () => {
        const container = mount(<IdvAwardAmountsSectionContainer
            {...mockActions}
            {...mockRedux} />);

        const parseAward = jest.fn();
        container.instance().parseAward = parseAward;
        await container.instance().awardRequest.promise;

        expect(parseAward).toHaveBeenCalled();
    });

    it('should make an API call when the award ID props changes', () => {
        const container = shallow(<IdvAwardAmountsSectionContainer
            {...mockActions}
            {...mockRedux} />);

        const getIdvChildAwardAmounts = jest.fn();
        container.instance().getIdvChildAwardAmounts = getIdvChildAwardAmounts;

        container.instance().componentDidMount();
        expect(getIdvChildAwardAmounts).toHaveBeenCalledTimes(1);
        expect(getIdvChildAwardAmounts).toHaveBeenCalledWith('1234');

        const updatedAward = Object.assign({}, mockRedux.award, {
            id: '222'
        });

        const prevProps = Object.assign({}, mockRedux, {
            award: updatedAward
        });

        container.instance().componentDidUpdate(prevProps);

        expect(getIdvChildAwardAmounts).toHaveBeenCalledTimes(2);
        expect(getIdvChildAwardAmounts).toHaveBeenLastCalledWith('1234');
    });

    describe('parseAward', () => {
        it('should parse returned award amounts data and set data as the award amounts state', () => {
            const container = shallow(<IdvAwardAmountsSectionContainer
                {...mockRedux}
                {...mockActions} />);

            const expectedAwardAmounts = Object.create(BaseAwardAmounts);
            expectedAwardAmounts.populate(mockAwardAmounts);

            container.instance().parseAward(mockAwardAmounts);

            expect(container.state().awardAmounts).toEqual(expectedAwardAmounts);
        });
    });
});
