/**
 * AwardBreakdownContainer-test.jsx
 * Created by Lizzie Salita 5/22/18
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { AwardBreakdownContainer } from 'containers/state/visualizations/awardBreakdown/AwardBreakdownContainer';
import { mockBreakdownProps } from '../../mockData';

jest.mock('helpers/stateHelper', () => require('../../mockStateHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/state/visualizations/awardBreakdown/AwardBreakdownTable', () =>
    jest.fn(() => null));

jest.mock('components/state/visualizations/awardBreakdown/AwardBreakdownTreeMap', () =>
    jest.fn(() => null));

describe('AwardBreakdownContainer', () => {
    it('should make an API call for the awards amounts on mount', () => {
        const container = shallow(<AwardBreakdownContainer
            {...mockBreakdownProps} />);

        const fetchAwardBreakdown = jest.fn();
        container.instance().fetchAwardBreakdown = fetchAwardBreakdown;

        container.instance().componentDidMount();

        expect(fetchAwardBreakdown).toHaveBeenCalledTimes(1);
        expect(fetchAwardBreakdown).toHaveBeenCalledWith('06', 'latest');
    });

    it('should make a new API call when the inbound state ID prop changes', async () => {
        const container = mount(<AwardBreakdownContainer
            {...mockBreakdownProps} />);

        const fetchAwardBreakdown = jest.fn();
        container.instance().fetchAwardBreakdown = fetchAwardBreakdown;

        // Change the state id
        const stateProfile = Object.assign({}, mockBreakdownProps.stateProfile, {
            id: '07'
        });

        container.setProps ({
            stateProfile
        });

        await container.instance().searchRequest.promise;

        expect(fetchAwardBreakdown).toHaveBeenLastCalledWith('07', 'latest');
    });

    it('should correctly sum the total award amount', async () => {
        const container = shallow(<AwardBreakdownContainer
            {...mockBreakdownProps} />);

        container.instance().fetchAwardBreakdown('01', 'latest');

        await container.instance().searchRequest.promise;

        expect(container.instance().state.totalAmount).toEqual(50689.19);
    });

    it('should set the state to reflect the presence of negative obligations', async () => {
        const container = shallow(<AwardBreakdownContainer
            {...mockBreakdownProps} />);

        container.instance().fetchAwardBreakdown('06', 'latest');

        await container.instance().searchRequest.promise;

        expect(container.instance().state.hasNegatives).toEqual(true);
    });
});
