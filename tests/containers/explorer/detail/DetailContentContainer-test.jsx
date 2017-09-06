/**
 * DetailContentContainer-test.jsx
 * 
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { List } from 'immutable';
import sinon from 'sinon';

// mock the explorer helper
jest.mock('helpers/explorerHelper', () => require('./mockExplorerHelper'));

import { DetailContentContainer } from 'containers/explorer/detail/DetailContentContainer';
import { mockApiReponse, mockReducerRoot, mockReducerChild,
    mockActions, mockLevelData, mockDeeperRoot, mockActiveScreen } from './mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/explorer/detail/DetailContent', () => jest.fn(() => null));
jest.mock('components/explorer/detail/sidebar/ExplorerSidebar', () => jest.fn(() => null));

// spy on specific functions inside the component
const loadDataSpy = sinon.spy(DetailContentContainer.prototype, 'loadData');

describe('DetailContentContainer', () => {
    describe('validateRoot', () => {
        it('should reload from root when the root prop changes', () => {
            const mockPrepareRoot = jest.fn();

            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);
            container.instance().prepareRootRequest = mockPrepareRoot;

            container.instance().componentDidUpdate({
                explorer: {
                    root: 'object_class'
                }
            });

            expect(mockPrepareRoot).toHaveBeenCalledTimes(1);
            expect(mockPrepareRoot).toHaveBeenCalledWith('agency', '1984');
        });
        it('should reload from root when the fy prop changes', () => {
            const mockPrepareRoot = jest.fn();

            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);
            container.instance().prepareRootRequest = mockPrepareRoot;

            container.instance().componentDidUpdate({
                explorer: {
                    fy: '1985'
                }
            });

            expect(mockPrepareRoot).toHaveBeenCalledTimes(1);
            expect(mockPrepareRoot).toHaveBeenCalledWith('agency', '1984');
        });
    });
    it('should make an API call on mount', async () => {
        const container = mount(<DetailContentContainer
            {...mockActions}
            explorer={mockReducerRoot} />);

        await container.instance().request.promise;

        expect(loadDataSpy.callCount).toEqual(1);

        loadDataSpy.reset();
    });
    describe('parseRootData', () => {
        it('should build the root object and update the trail', () => {
            const mockTrail =
                [{
                    "subdivision": "agency",
                    "title": "",
                    "total": 100,
                    "within": "root"
                }];

            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);

            container.instance().parseRootData(mockApiReponse);

            expect(mockActions.overwriteExplorerTrail).toHaveBeenCalledWith(mockTrail);
            expect(container.state().data).toEqual(new List(mockApiReponse.results));
        });
        it ('should trigger the exit animation if there is going to be a transition', () => {
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);

            container.setState({
                transitionSteps: 1
            });

            container.instance().parseRootData(mockApiReponse);

            expect(container.state().transition).toEqual('start');
        });
    });
    describe('goDeeper', () => {
        it('should update the state, trail, and make an API call', () => {
            const mockRequest = {
                "subdivision": "federal_account",
                "title": "Third Agency",
                "within": "agency"
            };
            const mockLoadData = jest.fn();
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);
            container.instance().loadData = mockLoadData;

            container.setState({
               inFlight: false
            });
            container.instance().goDeeper('2', mockLevelData);

            expect(container.state().transitionSteps).toEqual(1);
            expect(mockLoadData).toHaveBeenCalledWith(mockRequest, false);
        });
        it('should not call loadData from the bottom of the path', () => {
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockDeeperRoot} />);

            container.setState({
                inFlight: false
            });
            container.instance().goDeeper('2', mockLevelData);

            expect(loadDataSpy.callCount).toEqual(0);
            loadDataSpy.reset();
        });
        it('should not call loadData when in flight', () => {
            const mockLoadData = jest.fn();
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockDeeperRoot} />);
            container.instance().loadData = mockLoadData;

            container.setState({
                inFlight: true
            });
            container.instance().goDeeper('2', mockLevelData);

            expect(loadDataSpy.callCount).toEqual(0);
            loadDataSpy.reset();
        });
    });
    describe('changeSubdivisionType', () => {
        it('should revisualize the data without changing the trail or filters', () => {
            const mockRequest = {
                "subdivision": "object_class",
                "total": 100,
                "within": "root"
            };
            const mockLoadData = jest.fn();
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);
            container.instance().loadData = mockLoadData;

            const expectedFilters = container.state().filters;

            container.instance().changeSubdivisionType('object_class');

            expect(container.state().transitionSteps).toEqual(0);
            expect(container.state().filters).toEqual(expectedFilters);
            expect(mockLoadData).toHaveBeenCalledWith(mockRequest, false);
        });
    });
    describe('rewindToFilter', () => {
        it ('should not rewind if it is called with the current filter', () => {
            const container = mount(<DetailContentContainer
                {...mockActions}
                explorer={mockDeeperRoot} />);

            container.instance().goDeeper('2', mockLevelData);
            const expectedSteps = container.instance().state.transitionSteps;

            container.instance().rewindToFilter(2);

            expect(container.instance().state.transitionSteps).toEqual(expectedSteps);
        });
        it ('should call prepareRootRequest if going back to the start', () => {
            const container = mount(<DetailContentContainer
                {...mockActions}
                explorer={mockDeeperRoot} />);

            const mockPrepareRoot = jest.fn();
            container.instance().prepareRootRequest = mockPrepareRoot;

            container.instance().goDeeper('2', mockLevelData);
            container.instance().rewindToFilter(0);

            expect(mockPrepareRoot).toHaveBeenCalledTimes(1);
        });
        it ('should overwrite the explorer trail and update the transition steps', () => {
            const container = mount(<DetailContentContainer
                {...mockActions}
                explorer={mockDeeperRoot} />);

            expect(container.instance().props.explorer.trail).toEqual(mockDeeperRoot.trail);

            container.instance().rewindToFilter(1);

            expect(container.instance().state.transitionSteps).toEqual(-1);
            expect(mockActions.overwriteExplorerTrail).toHaveBeenCalledWith([
                {
                    within: 'root',
                    subdivision: 'budget_function',
                    total: 100,
                    title: ''
                },
                {
                    within: 'budget_function',
                    subdivision: 'budget_subfunction',
                    total: 75,
                    title: 'Health'
                }
            ]);
        });
    });
});
