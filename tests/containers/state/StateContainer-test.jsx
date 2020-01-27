/**
 * StateContainer-test.jsx
 * Created by Lizzie Salita 5/7/18
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { StateContainer } from 'containers/state/StateContainer';
import BaseStateProfile from 'models/v2/state/BaseStateProfile';
import { mockActions, mockRedux, mockStateOverview } from './mockData';

// mock the state helper
jest.mock('helpers/stateHelper', () => require('./mockStateHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/state/StatePage', () => jest.fn(() => null));

describe('StateContainer', () => {
    it('should make an API call for the selected state on mount', async () => {
        const container = mount(<StateContainer
            {...mockRedux}
            {...mockActions} />);

        const loadStateOverview = jest.fn();
        container.instance().loadStateOverview = loadStateOverview;

        container.instance().componentDidMount();
        await container.instance().request.promise;

        expect(loadStateOverview).toHaveBeenCalledTimes(1);
        expect(mockActions.setStateFiscalYear).toHaveBeenCalledWith('latest');
        expect(loadStateOverview).toHaveBeenCalledWith('01', 'latest');
    });
    it('should update the center coordinates for the selected state on mount', async () => {
        const container = mount(<StateContainer
            {...mockRedux}
            {...mockActions} />);

        const setStateCenter = jest.fn();
        container.instance().setStateCenter = setStateCenter;

        container.instance().componentDidMount();
        await container.instance().request.promise;

        expect(setStateCenter).toHaveBeenCalledTimes(1);
        expect(setStateCenter).toHaveBeenCalledWith('01');
    });
    it('should make an API call when the state id changes', async () => {
        const container = mount(<StateContainer
            {...mockRedux}
            {...mockActions} />);

        const loadStateOverview = jest.fn();
        container.instance().loadStateOverview = loadStateOverview;

        container.setProps({
            params: {
                stateId: '02'
            }
        });

        await container.instance().request.promise;

        expect(loadStateOverview).toHaveBeenCalledTimes(1);
        expect(loadStateOverview).toHaveBeenCalledWith('02', 'latest');
    });
    it('should update the center coordinates when the state id changes', async () => {
        const container = mount(<StateContainer
            {...mockRedux}
            {...mockActions} />);

        const setStateCenter = jest.fn();
        container.instance().setStateCenter = setStateCenter;

        container.setProps({
            params: {
                stateId: '02'
            }
        });

        await container.instance().request.promise;

        expect(setStateCenter).toHaveBeenCalledTimes(1);
        expect(setStateCenter).toHaveBeenCalledWith('02');
    });
    it('should reset the fiscal year when the state id changes', async () => {
        // Use 'all' for the initial FY
        const stateProfile = Object.assign({}, mockRedux.stateProfile, {
            fy: 'all'
        });
        const updatedRedux = Object.assign({}, mockRedux, {
            stateProfile
        });

        const container = mount(<StateContainer
            {...updatedRedux}
            {...mockActions} />);

        const loadStateOverview = jest.fn();
        container.instance().loadStateOverview = loadStateOverview;

        container.setProps({
            params: {
                stateId: '02'
            }
        });

        await container.instance().request.promise;

        expect(loadStateOverview).toHaveBeenLastCalledWith('02', 'latest');
    });
    it('should make an API call when the fiscal year changes', async () => {
        const container = mount(<StateContainer
            {...mockRedux}
            {...mockActions} />);

        const loadStateOverview = jest.fn();
        container.instance().loadStateOverview = loadStateOverview;

        const stateProfile = Object.assign({}, mockRedux.stateProfile, {
            fy: '2018'
        });

        const nextProps = Object.assign({}, mockRedux, {
            stateProfile
        });

        container.setProps(nextProps);

        await container.instance().request.promise;

        expect(loadStateOverview).toHaveBeenCalledTimes(1);
        expect(loadStateOverview).toHaveBeenCalledWith('01', '2018');
    });
    describe('parseOverview', () => {
        it('should update the Redux state with a new BaseStateProfile', () => {
            const container = shallow(<StateContainer
                {...mockRedux}
                {...mockActions} />);

            // Reset the mock action's call count
            mockActions.setStateOverview.mockReset();

            container.instance().parseOverview(mockStateOverview.results);

            const expectedParam = Object.create(BaseStateProfile);
            expectedParam.populate(mockStateOverview.results);

            expect(mockActions.setStateOverview).toHaveBeenCalledTimes(1);
            expect(mockActions.setStateOverview).toHaveBeenCalledWith(expectedParam);
        });
    });
    describe('setStateCenter', () => {
       it('should update the Redux state with an array of center coordinates for the given state', () => {
           const container = mount(<StateContainer
               {...mockRedux}
               {...mockActions} />);

           // Expect the center coords for state with id '01'
           expect(mockActions.setStateCenter).toHaveBeenLastCalledWith([-86.703052, 32.525772]);
       });
    });
});
