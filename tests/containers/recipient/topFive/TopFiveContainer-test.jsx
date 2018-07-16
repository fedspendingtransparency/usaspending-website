/**
 * TopFiveContainer-test.jsx
 * Created by Kevin Li 5/21/18
 */

import React from 'react';
import { shallow } from 'enzyme';

import { TopFiveContainer } from 'containers/recipient/topFive/TopFiveContainer';

// mock the state helper
jest.mock('helpers/searchHelper', () => require('./mockSearchHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/state/topFive/TopFiveSection', () => jest.fn(() => null));


const mockRedux = {
    total: 123.04,
    fy: 'latest'
};

describe('TopFiveContainer', () => {
    describe('dataParams', () => {
        it('should provide a category in the API request body', () => {
            const container = shallow(<TopFiveContainer
                {...mockRedux}
                category="awarding_agency" />);
            const params = container.instance().dataParams();

            expect(params.category).toEqual('awarding_agency');
        });
        it('should always request five results', () => {
            const container = shallow(<TopFiveContainer
                {...mockRedux}
                category="awarding_agency" />);
            const params = container.instance().dataParams();

            expect(params.limit).toEqual(5);
        });
    });
});
