/**
 * TopFiveContainer-test.jsx
 * Created by Kevin Li 5/21/18
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

// mock the state helper
jest.mock('helpers/searchHelper', () => require('./mockSearchHelper'));

import { TopFiveContainer } from 'containers/state/topFive/TopFiveContainer';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/state/topFive/TopFiveSection', () => jest.fn(() => null));


const mockRedux = {
    code: 'XX',
    total: 123.04,
    type: 'all'
};

describe('TopFiveContainer', () => {
    it('should reload data when the state code changes', () => {
        const container = mount(
            <TopFiveContainer
                {...mockRedux}
                category="awarding_agency" />
        );

        container.instance().loadCategory = jest.fn();

        container.setProps({
            code: 'ZZ'
        });

        expect(container.instance().loadCategory).toHaveBeenCalledTimes(1);
    });

    describe('dataParams', () => {
        it('should generate an API request filter set given the current props', () => {
            const container = shallow(
                <TopFiveContainer
                    {...mockRedux}
                    category="awarding_agency" />
            );
            const params = container.instance().dataParams();

            expect(params.filters).toEqual({
                place_of_performance_scope: 'domestic',
                place_of_performance_locations: [
                    {
                        country: 'USA',
                        state: 'XX'
                    }
                ]
            });
        });
        it('should provide a category in the API request body', () => {
            const container = shallow(
                <TopFiveContainer
                    {...mockRedux}
                    category="awarding_agency" />
            );
            const params = container.instance().dataParams();

            expect(params.category).toEqual('awarding_agency');
        });
        it('should always request five results', () => {
            const container = shallow(
                <TopFiveContainer
                    {...mockRedux}
                    category="awarding_agency" />
            );
            const params = container.instance().dataParams();

            expect(params.limit).toEqual(5);
        });
    });
});
