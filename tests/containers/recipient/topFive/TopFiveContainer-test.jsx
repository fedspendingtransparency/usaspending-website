/**
 * TopFiveContainer-test.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { TopFiveContainer } from 'containers/recipient/topFive/TopFiveContainer';

// mock the state helper
jest.mock('helpers/searchHelper', () => require('./mockSearchHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/recipient/topFive/TopFiveSection', () => jest.fn(() => null));


const mockRedux = {
    total: 123.04,
    fy: 'latest'
};

describe('TopFiveContainer', () => {
    describe('dataParams', () => {
        it('should reload data when the recipient id is recieved', () => {
            const container = mount(<TopFiveContainer
                {...mockRedux}
                category="awarding_agency" />);

            container.instance().loadCategory = jest.fn();

            container.setProps({
                recipientHash: '073b'
            });

            expect(container.instance().loadCategory).toHaveBeenCalledTimes(1);
        });
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
