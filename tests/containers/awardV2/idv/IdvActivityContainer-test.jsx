/**
 * IdvActivityContainer-test.js
 * Created by Jonathan Hill 6/26/2019
**/

import React from 'react';
import { mount, shallow } from 'enzyme';

import { IdvActivityContainer } from 'containers/awardV2/idv/IdvActivityContainer';
import BaseIdvActivityBar from 'models/v2/awardsV2/BaseIdvActivityBar';
import { mockRedux, mockActions } from '../mockAward';
import { mockIdvActivity } from '../../../models/awardsV2/mockAwardApi';

jest.mock('helpers/idvHelper', () => require('../awardV2Helper'));

// mock the child component by replacing it with a function that returns a null element
// jest.mock('components/awardv2/idv/amounts/AggregatedAwardAmounts.jsx', () => jest.fn(() => null));

describe('IdvActivityContainer', () => {
    const loadAwards = jest.fn();
    const parseAwards = jest.fn();
    it('should make an API call for the awards on mount', async () => {
        const container = mount(<IdvActivityContainer {...mockActions} {...mockRedux} />);

        container.instance().loadAwards = loadAwards;
        container.instance().parseAwards = parseAwards;
        await container.instance().componentDidMount();

        expect(loadAwards).toHaveBeenCalled();
    });

    it('should make an API call when the award ID props changes', async () => {
        const container = shallow(<IdvActivityContainer awardId="1234" />);

        container.instance().loadAwards = loadAwards;

        await container.instance().componentDidMount();

        container.setProps({ awardId: "456" });

        expect(loadAwards).toHaveBeenCalled();
    });

    it('should parse returned awards and set the state', () => {
        const container = shallow(<IdvActivityContainer awardId="1234" />);

        const awards = mockIdvActivity.results.map((award) => {
            const idvActivityBar = Object.create(BaseIdvActivityBar);
            idvActivityBar.populate(award);
            return idvActivityBar;
        });

        container.instance().parseAwards(mockIdvActivity.results);

        expect(container.state().awards).toEqual(awards);
    });

    it('should change the page and update state and call api', () => {
        const container = shallow(<IdvActivityContainer awardId="1234" />);
        container.instance().loadAwards = loadAwards;
        container.instance().changePage(2);

        expect(container.state().page).toEqual(2);
        expect(loadAwards).toHaveBeenCalled();
    });
});
