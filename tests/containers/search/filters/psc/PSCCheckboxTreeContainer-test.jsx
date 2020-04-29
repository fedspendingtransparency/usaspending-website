/**
 * Created by Max Kendall
 * 03/25/2020
 */
import React from 'react';
import { shallow } from 'enzyme';

import { fetchPsc } from "helpers/searchHelper";

import { PSCCheckboxTreeContainer } from "../../../../../src/js/containers/search/filters/psc/PSCCheckboxTreeContainer";

import {
    topTierResponse,
    secondTierResponse,
    thirdTierResponse,
    fourthTierResponse,
    defaultProps
} from './mockPSC';

jest.mock("helpers/searchHelper", () => ({
    fetchPsc: jest.fn()
}));

describe('PscCheckboxTreeContainer', () => {
    describe('fetchPsc', () => {
        const mockFn = jest.fn();
        const container = shallow(<PSCCheckboxTreeContainer {...defaultProps} setPscNodes={mockFn} />);
        beforeEach(async () => {
            mockFn.mockReset();
        });
        it('appends placeholder children to the nodes at the trunk level', async () => {
            fetchPsc.mockImplementation(() => ({
                promise: Promise.resolve({ data: topTierResponse })
            }));
            await container.instance().componentDidMount();
            const newNodes = mockFn.mock.calls[0][1];
            expect(newNodes.length).toEqual(3);

            newNodes
                .forEach((topTier) => {
                    expect(topTier.children.length).toEqual(1);
                    expect(topTier.children[0].isPlaceHolder).toEqual(true);
                });
        });
        it('appends placeholder children to the first branch level (tier 2)', async () => {
            fetchPsc.mockImplementation(() => ({
                promise: Promise.resolve({ data: secondTierResponse })
            }));
            await container.instance().fetchPsc('Service');
            const newNodes = mockFn.mock.calls[0][1];
            expect(newNodes.length).toEqual(23);
            
            newNodes
                .forEach((secondTier) => {
                    expect(secondTier.children.length).toEqual(1);
                    expect(secondTier.children[0].isPlaceHolder).toEqual(true);
                });
        });
        it('appends placeholder children to the second branch level (tier 3)', async () => {
            fetchPsc.mockImplementation(() => ({
                promise: Promise.resolve({ data: thirdTierResponse })
            }));
            await container.instance().fetchPsc('Service/B');
            const newNodes = mockFn.mock.calls[0][1];
            expect(newNodes.length).toEqual(1);

            newNodes
                .forEach((thirdTier) => {
                    expect(thirdTier.children.length).toEqual(1);
                    expect(thirdTier.children[0].isPlaceHolder).toEqual(true);
                });
        });
        it('no placeholder children to the leaf level (tier 4)', async () => {
            fetchPsc.mockImplementation(() => ({
                promise: Promise.resolve({ data: fourthTierResponse })
            }));
            await container.instance().fetchPsc('Service/B/B5');
            const newNodes = mockFn.mock.calls[0][1];
            expect(newNodes.length).toEqual(48);
            newNodes
                .forEach((fourthTier) => {
                    expect(fourthTier.children).toEqual(null);
                });
        });
    });
    // describe('onExpand', () => {
    //     let container;
    //     const mockSetExpanded = jest.fn();
    //     const mockFetchTas = jest.fn();

    //     beforeEach(async () => {
    //         mockSetExpanded.mockReset();
    //         mockFetchTas.mockReset();
    //         container = shallow(<PSCCheckboxTreeContainer
    //             {...defaultProps}
    //             nodes={treePopulatedToFederalAccountLevel}
    //             setExpandedTas={mockSetExpanded} />);
    //         container.instance().fetchPsc = mockFetchTas;
    //     });
    //     it('calls fetchPsc w/ agency & federal account when necessary', async () => {
    //         container.instance().onExpand('012-8226', ['012', '012-8226'], true, { treeDepth: 1 });

    //         expect(mockFetchTas).toHaveBeenLastCalledWith('012/012-8226');
    //     });
    //     it('calls fetchPsc w/ only agency when necessary', () => {
    //         container.instance().onExpand('012', ['012'], true, { treeDepth: 0 });

    //         expect(mockFetchTas).toHaveBeenLastCalledWith('012');
    //     });
    //     it('always sets the expanded state', () => {
    //         container.instance().onExpand('012', ['012'], true, { treeDepth: 0 });
    //         let newExpanded = mockSetExpanded.mock.calls[0][0];
    //         // 1. When we expand an agency
    //         expect(newExpanded).toEqual(['012']);
    //         // 2. When we expand a federal account
    //         container.instance().onExpand('012-8226', ['012', '012-8226'], true, { treeDepth: 1 });
    //         newExpanded = mockSetExpanded.mock.calls[1][0];
    //         expect(newExpanded).toEqual(['012', '012-8226']);
    //     });
    // });
    // describe('onCollapse', () => {
    //     it('updates the state.expanded array', () => {
    //         const mockFn = jest.fn();
    //         const container = shallow(
    //             <PSCCheckboxTreeContainer
    //                 {...defaultProps}
    //                 expanded={['1', '11']}
    //                 setExpandedTas={mockFn} />);
    //         container.instance().onCollapse(['11']);
    //         const newExpanded = mockFn.mock.calls[0][0];
    //         expect(newExpanded).toEqual(['11']);
    //     });
    // });
    // describe('onCheck', () => {
    //     it('updates the checked array', async () => {
    //         const mockFn = jest.fn();
    //         const container = shallow(<PSCCheckboxTreeContainer
    //             {...defaultProps}
    //             setCheckedTas={mockFn}
    //             nodes={treePopulatedToFederalAccountLevel} />);
    //         container.instance().onCheck(['012']);
    //         const newChecked = mockFn.mock.calls[0][0];
    //         expect(newChecked).toEqual(['012']);
    //     });
    // });
    // describe('onUncheck', () => {
    //     it('updates the checked array', async () => {
    //         const mockFn = jest.fn();
    //         const container = shallow(<PSCCheckboxTreeContainer
    //             {...defaultProps}
    //             setCheckedTas={mockFn}
    //             nodes={treePopulatedToFederalAccountLevel}
    //             checked={['012']} />);

    //         container.instance().onUncheck([], { value: '012', checked: false });

    //         const newChecked = mockFn.mock.calls[0][0];
    //         expect(newChecked).toEqual([]);
    //     });
    // });
});
