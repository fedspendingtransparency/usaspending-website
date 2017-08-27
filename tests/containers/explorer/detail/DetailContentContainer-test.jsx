/**
 * DetailContentContainer-test.jsx
 * 
 */

import React from 'react';
import { shallow } from 'enzyme';

// mock the explorer helper
jest.mock('helpers/explorerHelper', () => require('./mockExplorerHelper'));

import { DetailContentContainer } from 'containers/explorer/detail/DetailContentContainer';
import { mockApiReponse, mockReducerRoot, mockReducerChild, mockActions } from './mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/explorer/detail/DetailContent', () => jest.fn(() => null));
jest.mock('components/explorer/detail/sidebar/ExplorerSidebar', () => jest.fn(() => null));

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
            expect(mockPrepareRoot).toHaveBeenCalledWith('agency', 1984);
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
            expect(mockPrepareRoot).toHaveBeenCalledWith('agency', 1984);
        });
    });
});
