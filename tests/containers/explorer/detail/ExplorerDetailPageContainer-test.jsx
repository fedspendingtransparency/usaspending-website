/**
 * ExplorerDetailPageContainer-test.jsx
 * Created by Kevin Li 8/27/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { ExplorerDetailPageContainer } from 'containers/explorer/detail/ExplorerDetailPageContainer';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/explorer/detail/ExplorerDetailPage', () => jest.fn(() => null));


describe('ExplorerDetailPageContainer', () => {
    describe('validateRoot', () => {
        it('should allow a root type of agency', () => {
            const mockParams = {
                params: {
                    root: 'agency'
                }
            };

            const mockSetRoot = jest.fn();

            mount(<ExplorerDetailPageContainer
                {...mockParams}
                setExplorerRoot={mockSetRoot} />);

            expect(mockSetRoot).toHaveBeenCalledTimes(1);
            expect(mockSetRoot).toHaveBeenCalledWith('agency');
        });

        it('should allow a root type of budget_function', () => {
            const mockParams = {
                params: {
                    root: 'budget_function'
                }
            };

            const mockSetRoot = jest.fn();

            mount(<ExplorerDetailPageContainer
                {...mockParams}
                setExplorerRoot={mockSetRoot} />);

            expect(mockSetRoot).toHaveBeenCalledTimes(1);
            expect(mockSetRoot).toHaveBeenCalledWith('budget_function');
        });

        it('should allow a root type of object_class', () => {
            const mockParams = {
                params: {
                    root: 'object_class'
                }
            };

            const mockSetRoot = jest.fn();

            mount(<ExplorerDetailPageContainer
                {...mockParams}
                setExplorerRoot={mockSetRoot} />);

            expect(mockSetRoot).toHaveBeenCalledTimes(1);
            expect(mockSetRoot).toHaveBeenCalledWith('object_class');
        });


        it('should not allow any other root type', () => {
            const mockParams = {
                params: {
                    root: 'fake_thing'
                }
            };

            const mockSetRoot = jest.fn();

            shallow(<ExplorerDetailPageContainer
                {...mockParams}
                setExplorerRoot={mockSetRoot} />);

            expect(mockSetRoot).toHaveBeenCalledTimes(0);
        });
    });
});
