/**
 * ReferencedAwardsContainer-test.js
 * Created by Lizzie Salita 2/21/19
 **/

import React from 'react';
import { mount, shallow } from 'enzyme';

import { ReferencedAwardsContainer } from 'containers/awardV2/idv/ReferencedAwardsContainer';

import { mockRedux } from '../mockAward';
import { mockReferencedAwards, mockReferencedAwardsCounts } from '../../../models/awardsV2/mockAwardApi';

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

        expect(parseTabCounts).toHaveBeenCalledWith({ idvs: 45, contracts: 50 });
    });
});
