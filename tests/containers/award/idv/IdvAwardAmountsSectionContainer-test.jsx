/**
 * IdvAwardAmountsSectionContainer-test.js
 * Created by David Trinh 2/14/2019
 * */

import React from 'react';
import { shallow } from 'enzyme';

import { IdvAmountsContainer } from 'containers/award/idv/IdvAwardAmountsSectionContainer';
import BaseAwardAmounts from 'models/v2/award/BaseAwardAmounts';
import CoreAward from 'models/v2/award/CoreAward';

import { mockRedux, mockActions } from '../mockAward';
import { mockAwardAmounts } from '../../../models/award/mockAwardApi';

jest.mock('helpers/idvHelper', () => require('../awardHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/idv/amounts/AggregatedAwardAmountsSection.jsx', () => jest.fn(() => null));

const awardOverview = Object.create(CoreAward);
awardOverview.populateCore(mockRedux.award.overview);
mockRedux.award.overview = awardOverview;

describe('IdvAwardAmountsSectionContainer', () => {
    describe('didMount', () => {
        it('should make an API call for the award amounts on mount', async () => {
            const container = shallow(<IdvAmountsContainer
                {...mockActions}
                {...mockRedux} />);
    
            const parseChildAwardAmounts = jest.fn();
            container.instance().parseChildAwardAmounts = parseChildAwardAmounts;
            await container.instance().componentDidMount();
    
            expect(parseChildAwardAmounts).toHaveBeenCalled();
        });
    
        it('should make an API call when the award ID props changes', async () => {
            const container = shallow(<IdvAmountsContainer
                {...mockActions}
                {...mockRedux} />);
    
            const getIdvChildAwardAmounts = jest.fn();
            container.instance().getIdvChildAwardAmounts = getIdvChildAwardAmounts;
    
            await container.instance().componentDidMount();
            expect(getIdvChildAwardAmounts).toHaveBeenCalledTimes(1);
            expect(getIdvChildAwardAmounts).toHaveBeenCalledWith('1234');
    
            const updatedAward = Object.assign({}, mockRedux.award, {
                id: '222'
            });
    
            const prevProps = Object.assign({}, mockRedux, {
                award: updatedAward
            });
    
            await container.instance().componentDidUpdate(prevProps);
    
            expect(getIdvChildAwardAmounts).toHaveBeenCalledTimes(2);
            expect(getIdvChildAwardAmounts).toHaveBeenLastCalledWith('1234');
        });
    });

    describe('parseChildAwardAmounts', () => {
        it('should parse returned award amounts data and set data as the award amounts state', () => {
            const container = shallow(<IdvAmountsContainer
                {...mockRedux}
                {...mockActions} />);

            const expectedAwardAmounts = Object.create(BaseAwardAmounts);
            expectedAwardAmounts.populate(mockAwardAmounts, "idv_aggregated");

            container.instance().parseChildAwardAmounts(mockAwardAmounts);

            expect(container.state().awardAmounts).toEqual(expectedAwardAmounts);
        });
    });
});
