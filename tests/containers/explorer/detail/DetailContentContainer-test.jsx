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
    mockActions, mockLevelData, mockRequest } from './mockData';

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
                    fy: 1985
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
                transitionSteps: 2
            });

            container.instance().parseRootData(mockApiReponse);

            expect(container.state().transition).toEqual('start');
        });
    });
});
