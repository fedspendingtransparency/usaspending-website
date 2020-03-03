/**
 * DetailContentContainer-test.jsx
 * 
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { List } from 'immutable';
import sinon from 'sinon';

import { DetailContentContainer } from 'containers/explorer/detail/DetailContentContainer';
import {
    mockApiResponse,
    mockAwardResponse,
    mockReducerRoot,
    mockActions,
    mockLevelData,
    mockDeeperRoot
} from './mockData';

import { encodedAwardId, decodedAwardId } from "../../../mockData";

// mock the explorer helper
jest.mock('helpers/explorerHelper', () => require('./mockExplorerHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/explorer/detail/DetailContent', () => jest.fn(() => null));
jest.mock('components/explorer/detail/sidebar/ExplorerSidebar', () => jest.fn(() => null));

// spy on specific functions inside the component
const loadDataSpy = sinon.spy(DetailContentContainer.prototype, 'loadData');

describe('DetailContentContainer', () => {
    describe('componentDidUpdate', () => {
        it('should reload from root when the root prop changes', () => {
            const mockPrepareRoot = jest.fn();

            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);
            container.instance().prepareRootRequest = mockPrepareRoot;

            container.instance().componentDidUpdate({
                explorer: Object.assign({}, mockReducerRoot, {
                    root: 'object_class'
                })
            });

            expect(mockPrepareRoot).toHaveBeenCalledTimes(1);
            expect(mockPrepareRoot).toHaveBeenCalledWith('agency', '1984', '4');
        });
        it('should reload from root when the fy prop changes', () => {
            const mockPrepareRoot = jest.fn();

            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);
            container.instance().prepareRootRequest = mockPrepareRoot;

            container.instance().componentDidUpdate({
                explorer: Object.assign({}, mockReducerRoot, {
                    fy: '1985'
                })
            });

            expect(mockPrepareRoot).toHaveBeenCalledTimes(1);
            expect(mockPrepareRoot).toHaveBeenCalledWith('agency', '1984', '4');
        });
        it('should reload from root when the quarter prop changes', () => {
            const mockPrepareRoot = jest.fn();

            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);
            container.instance().prepareRootRequest = mockPrepareRoot;

            container.instance().componentDidUpdate({
                explorer: Object.assign({}, mockReducerRoot, {
                    quarter: '5'
                })
            });

            expect(mockPrepareRoot).toHaveBeenCalledTimes(1);
            expect(mockPrepareRoot).toHaveBeenCalledWith('agency', '1984', '4');
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
    describe('prepareRootRequest', () => {
        it('should create a filterset that consists of the provided fiscal year and quarter', () => {
            const container = shallow(
                <DetailContentContainer
                    {...mockActions}
                    explorer={mockReducerRoot} />
            );

            container.instance().loadData = jest.fn();

            container.instance().prepareRootRequest('agency', '1984', '4');
            expect(container.state().filters.fy).toEqual('1984');
            expect(container.state().filters.quarter).toEqual('4');
        });
        it('should make a root-level API call with the provided subdivision type', () => {
            const container = shallow(
                <DetailContentContainer
                    {...mockActions}
                    explorer={mockReducerRoot} />
            );

            container.instance().loadData = jest.fn();

            container.instance().prepareRootRequest('agency', '1984', '4');
            expect(container.instance().loadData).toHaveBeenCalledTimes(1);
            expect(container.instance().loadData).toHaveBeenCalledWith({
                within: 'root',
                subdivision: 'agency'
            }, true);
        });
    });
    describe('parseRootData', () => {
        it('should build the root object and update the trail', () => {
            const mockTrail =
                [{
                    subdivision: 'agency',
                    title: '',
                    total: 100,
                    within: 'root',
                    id: ''
                }];

            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);

            container.instance().parseRootData(mockApiResponse);

            expect(mockActions.overwriteExplorerTrail).toHaveBeenCalledWith(mockTrail);
            expect(container.state().data).toEqual(new List(mockApiResponse.results));
        });
        it ('should trigger the exit animation if there is going to be a transition', () => {
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);

            container.setState({
                transitionSteps: 1
            });

            container.instance().parseRootData(mockApiResponse);

            expect(container.state().transition).toEqual('start');
        });
    });
    describe('parseData', () => {
        it('should set the isTruncated state to true only at the award level', () => {
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);

            const request = {
                within: 'recipient',
                subdivision: 'award'
            };

            container.instance().parseData(mockAwardResponse, request);
            expect(container.state().isTruncated).toBeTruthy();
        });
        it('should never set the isTruncated state to true if not at the award level', () => {
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);

            const request = {
                within: 'recipient',
                subdivision: 'something else'
            };

            container.instance().parseData(mockAwardResponse, request);
            expect(container.state().isTruncated).toBeFalsy();
        });
        it('should set the isTruncated state to true if the API response total differs from the sum of the results by more than 10', () => {
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);

            const request = {
                within: 'recipient',
                subdivision: 'award'
            };

            container.instance().parseData(mockAwardResponse, request);
            expect(container.state().isTruncated).toBeTruthy();
        });
        it('should not set the isTruncated state to true if the API response total differs from the sum of the results by 10 or less', () => {
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);

            const request = {
                within: 'recipient',
                subdivision: 'award'
            };

            const mockAward = Object.assign({}, mockAwardResponse, {
                total: 4
            });

            container.instance().parseData(mockAward, request);
            expect(container.state().isTruncated).toBeFalsy();
        });

        it('should limit the API response to the first 1,000 items as a safety check', () => {
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);

            const request = {
                within: 'recipient',
                subdivision: 'award'
            };

            const mockAPI = Object.assign({}, mockAPI, {
                results: new Array(15000).fill('filler', 0, 15000)
            });

            container.instance().parseData(mockAPI, request);
            expect(container.state().data.count()).toEqual(1000);
        });

        it('should encode generated_unique_award_ids w/ special characters', () => {
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);

            const request = {
                within: 'recipient',
                subdivision: 'award'
            };

            const mockResponse = {
                ...mockAwardResponse,
                results: [{ ...mockAwardResponse.results[0], generated_unique_award_id: decodedAwardId }]
            };

            container.instance().parseData(mockResponse, request);
            expect(container.state().data.toJS()[0].id).toEqual(encodedAwardId);
        });
    });

    describe('goDeeper', () => {
        it('should update the state, trail, and make an API call', () => {
            const mockRequest = {
                subdivision: 'federal_account',
                title: 'Third Agency',
                within: 'agency',
                id: '3',
                accountNumber: ''
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
            container.instance().loadData = jest.fn();

            container.setState({
                inFlight: false
            });
            container.instance().goDeeper('2', mockLevelData);

            expect(container.instance().loadData).toHaveBeenCalledTimes(0);
        });
        it('should not call loadData when in flight', () => {
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockDeeperRoot} />);
            container.instance().loadData = jest.fn();

            container.setState({
                inFlight: true
            });
            container.instance().goDeeper('2', mockLevelData);

            expect(container.instance().loadData).toHaveBeenCalledTimes(0);
        });
    });
    describe('goToUnreported', () => {
        it('should update the state and trail after goToUnreported has finished running', () => {
            jest.useFakeTimers();
            const container = shallow(<DetailContentContainer
                {...mockActions}
                explorer={mockReducerRoot} />);
            container.instance().loadData = jest.fn();

            container.instance().goToUnreported(mockLevelData);
            jest.runAllTimers();

            expect(container.state().transitionSteps).toEqual(1);
            expect(container.state().transition).toEqual('end');
        });
    });
    describe('changeSubdivisionType', () => {
        it('should revisualize the data without changing the trail or filters', () => {
            const mockRequest = {
                subdivision: 'object_class',
                total: 100,
                within: 'root',
                accountNumber: ''
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
            expect(mockPrepareRoot).toHaveBeenCalledWith('agency', '1984', '2');
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
