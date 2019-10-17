/**
 * SubawardsContainer-test.jsx
 * Created by Kevin Li 4/19/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { SubawardsContainer } from
    'containers/awardV2/table/SubawardsContainer';

import BaseSubawardRow from 'models/v2/awards/subawards/BaseSubawardRow';

import { mockSubawards } from '../mockSubawards';
import { mockParams } from '../mockAward';

jest.mock('helpers/searchHelper', () => require('../mockSearchHelper'));

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/awardv2/subawards/SubawardsTable', () =>
    jest.fn(() => null));

const mockAward = mockParams.award;

describe('SubawardsContainer', () => {
    it('should reload data when the award ID changes', () => {
        const container = mount(<SubawardsContainer
            awardId="123"
            award={mockAward} />);

        container.instance().fetchSubawards = jest.fn();

        container.setProps({
            awardId: "999"
        });

        expect(container.instance().fetchSubawards).toHaveBeenCalledTimes(1);
    });

    describe('loadNextPage', () => {
        it('should load the next page when available', () => {
            const container = shallow(<SubawardsContainer
                award={mockAward} />);

            container.instance().fetchSubawards = jest.fn();

            container.setState({
                nextPage: true,
                inFlight: false,
                page: 1
            });

            container.instance().loadNextPage();
            expect(container.instance().fetchSubawards).toHaveBeenCalledTimes(1);
            expect(container.instance().fetchSubawards).toHaveBeenCalledWith(2, false);
        });
        it('should do nothing when there are no more pages', () => {
            const container = shallow(<SubawardsContainer
                    award={mockAward} />);

            container.instance().fetchSubawards = jest.fn();

            container.setState({
                nextPage: false,
                inFlight: false,
                page: 2
            });

            container.instance().loadNextPage();
            expect(container.instance().fetchSubawards).toHaveBeenCalledTimes(0);
        });
        it('should do nothing when another request is currently in flight', () => {
            const container = shallow(<SubawardsContainer
                    award={mockAward} />);

            container.instance().fetchSubawards = jest.fn();

            container.setState({
                nextPage: true,
                inFlight: true,
                page: 1
            });

            container.instance().loadNextPage();
            expect(container.instance().fetchSubawards).toHaveBeenCalledTimes(0);
        });
    });
    describe('parseSubawards', () => {
        it('should parse API responses into SubawardRow objects', () => {
            const container = shallow(<SubawardsContainer
                    award={mockAward} />);

            container.instance().parseSubawards(mockSubawards, true);
            const expectedSubaward = Object.create(BaseSubawardRow);
            expectedSubaward.populate(mockSubawards.results[0]);

            expect(container.instance().state.subawards.length).toEqual(mockSubawards.results.length);
            expect(container.instance().state.subawards[0]).toEqual(expectedSubaward);
        });

        it('should append items rather than overwrite items when the reset flag is false', () => {
            const container = shallow(<SubawardsContainer
                    award={mockAward} />);
            container.setState({
                subawards: [{}]
            });

            container.instance().parseSubawards(mockSubawards, false);

            expect(container.instance().state.subawards.length).toEqual(mockSubawards.results.length + 1);
        });
    });
    describe('changeSort', () => {
        it('should change the sort state', () => {
            const container = shallow(<SubawardsContainer
                    award={mockAward} />);
            container.instance().changeSort({
                field: 'test',
                direction: 'asc'
            });

            expect(container.state().sort).toEqual({
                field: 'test',
                direction: 'asc'
            });
        });

        it('should trigger a reset search', () => {
            const container = shallow(<SubawardsContainer
                    award={mockAward} />);
            container.instance().fetchSubawards = jest.fn();

            container.instance().changeSort({
                field: 'test',
                direction: 'asc'
            });

            expect(container.instance().fetchSubawards).toHaveBeenCalledTimes(1);
            expect(container.instance().fetchSubawards).toHaveBeenCalledWith(1, true);
        });
    });
});
