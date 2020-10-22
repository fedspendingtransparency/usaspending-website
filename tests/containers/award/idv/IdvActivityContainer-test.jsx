/**
 * IdvActivityContainer-test.js
 * Created by Jonathan Hill 6/26/2019
* */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { IdvActivityContainer } from 'containers/award/idv/IdvActivityContainer';
import BaseIdvActivityBar from 'models/v2/award/BaseIdvActivityBar';
import { mockRedux, mockActions } from '../mockAward';
import { mockIdvActivity } from '../../../models/award/mockAwardApi';

jest.mock('helpers/idvHelper', () => require('../awardHelper'));

// mock the child component by replacing it with a function that returns a null element
// jest.mock('components/award/idv/amounts/AggregatedAwardAmounts.jsx', () => jest.fn(() => null));

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

    it('should parse returned awards and remove any award with no start date and set the state', () => {
        const container = shallow(<IdvActivityContainer awardId="1234" />);

        const awards = mockIdvActivity.results.map((award) => {
            const idvActivityBar = Object.create(BaseIdvActivityBar);
            idvActivityBar.populate(award);
            return idvActivityBar;
        });
        mockIdvActivity.results[0].period_of_performance_start_date = null;
        container.instance().parseAwards(mockIdvActivity.results);

        expect(container.state().awards.length).toEqual(awards.length - 1);
    });

    it('should parse returned awards and remove any award with no end date and set the state', () => {
        const container = shallow(<IdvActivityContainer awardId="1234" />);

        const awards = mockIdvActivity.results.map((award) => {
            const idvActivityBar = Object.create(BaseIdvActivityBar);
            idvActivityBar.populate(award);
            return idvActivityBar;
        });
        mockIdvActivity.results[0].period_of_performance_start_date = '2016-01-14';
        mockIdvActivity.results[0].period_of_performance_potential_end_date = null;
        container.instance().parseAwards(mockIdvActivity.results);

        expect(container.state().awards.length).toEqual(awards.length - 1);
    });

    it('should parse returned awards and remove any award with no start and no end date and set the state', () => {
        const container = shallow(<IdvActivityContainer awardId="1234" />);

        const awards = mockIdvActivity.results.map((award) => {
            const idvActivityBar = Object.create(BaseIdvActivityBar);
            idvActivityBar.populate(award);
            return idvActivityBar;
        });
        mockIdvActivity.results[0].period_of_performance_start_date = null;
        container.instance().parseAwards(mockIdvActivity.results);

        expect(container.state().awards.length).toEqual(awards.length - 1);
    });

    it('should change the page and update state and call api', () => {
        const container = shallow(<IdvActivityContainer awardId="1234" />);
        container.instance().loadAwards = loadAwards;
        container.instance().changePage(2);

        expect(container.state().page).toEqual(2);
        expect(loadAwards).toHaveBeenCalled();
    });
});
