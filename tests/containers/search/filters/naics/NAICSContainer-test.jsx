/**
 * NAICSSearchContainer-test.jsx => NAICSContainer-test.jsx
 * Created by Emily Gullo 07/26/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import { NAICSContainer } from 'containers/search/filters/naics/NAICSContainer';
import { cleanNaicsData } from 'helpers/naicsHelper';

import {
    defaultProps,
    searchResults,
    reallyBigTree
} from './mockNaics_v2';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));

describe('NAICS Search Filter Container', () => {
    describe('Loading a stateful tree from url hash', () => {
        it('fetches the immediate ancestor when only a grandchild is in checked', async () => {
            const mockFetchNaics = jest.fn(() => Promise.resolve());
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={reallyBigTree}
                checkedFromHash={["111110"]} />);
            container.instance().fetchNAICS = mockFetchNaics;
            await container.instance().componentDidMount();
            expect(mockFetchNaics).toHaveBeenCalledWith('1111');
        });
        it('fetches the children of the checked nodes from the hash and adds their placeholder children to checked array', () => {
            const fetchNaics = jest.fn(() => Promise.resolve());
            const updateCountOfSelectedTopTierNaicsCodes = jest.fn();
            const container = shallow(<NAICSContainer
                {...defaultProps}
                checkedFromHash={["11"]} />);
            container.instance().fetchNAICS = fetchNaics;
            container.instance().updateCountOfSelectedTopTierNaicsCodes = updateCountOfSelectedTopTierNaicsCodes;
            container.instance().componentDidMount()
                .then(() => {
                    // once for regular mount, once for the checked node.
                    expect(fetchNaics).toHaveBeenCalledTimes(2);
                    // second time it was called, it was called with the checked node from the hash
                    expect(fetchNaics).toHaveBeenLastCalledWith('11');
                    expect(updateCountOfSelectedTopTierNaicsCodes).toHaveBeenCalledWith(['children_of_11']);
                });
        });
        it('does not add nodes to checked which are in the unchecked array', async () => {
            const mockFn = jest.fn();
            const container = shallow(<NAICSContainer
                {...defaultProps}
                setCheckedNaics={mockFn}
                nodes={reallyBigTree}
                checkedFromHash={["1111"]}
                uncheckedFromHash={["111110"]} />);
            await container.instance().componentDidMount();
            const allGrandChildrenExceptUnchecked = reallyBigTree
                .find((node) => node.value === '11')
                .children
                .find((node) => node.value === '1111')
                .children
                .map((child) => child.value)
                .filter((child) => child !== '111110');
            expect(mockFn).toHaveBeenLastCalledWith(allGrandChildrenExceptUnchecked);
        });
        it('updates the count from hash', async () => {
            const testNode = reallyBigTree.find((node) => node.value === '11');
            const naicsWithPlaceholders = [
                ...reallyBigTree.filter((node) => node.value !== '11'),
                {
                    ...testNode,
                    children: cleanNaicsData(testNode.children)
                }
            ];
            const mockFn = jest.fn();
            const countsFromHash = [{ label: '11', description: 'test', count: 63 }];
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={naicsWithPlaceholders}
                setNaicsCounts={mockFn}
                countsFromHash={countsFromHash}
                checkedFromHash={["11"]}
                uncheckedFromHash={["111110"]} />);
            await container.instance().componentDidMount();
            expect(mockFn).toHaveBeenCalledWith(countsFromHash);
        });
        it('only fetches each code once', async () => {
            const mockFetchNaics = jest.fn(() => Promise.resolve());
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={reallyBigTree}
                checkedFromHash={["111110", "111120", "111199", "111140", "111150", "111160", "111191"]} />);
            container.instance().fetchNAICS = mockFetchNaics;
            await container.instance().componentDidMount();
            expect(mockFetchNaics).toHaveBeenCalledWith('11');
            expect(mockFetchNaics).toHaveBeenLastCalledWith('1111');
            expect(mockFetchNaics).toHaveBeenCalledTimes(3);
        });
    });
    describe('autoCheckSearchedResultDescendants fn', () => {
        it('auto checks unchecked descendants of selected parent', async () => {
            const addCheckedNaics = jest.fn();
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={searchResults}
                addCheckedNaics={addCheckedNaics} />);
            const expanded = ["11", "1111", "111110", "144444"];
            await container.instance().autoCheckSearchedResultDescendants(["children_of_11"], expanded);

            expect(addCheckedNaics).toHaveBeenCalledWith("111110");
            expect(addCheckedNaics).not.toHaveBeenCalledWith("144444");
        });
    });
    describe('onUncheck fn', () => {
        it.each([
            [64, { value: '11', count: 64, label: 'test' }, []],
            [8, { value: '1111', count: 8, label: 'test' }, []],
            [8, { value: '111110', count: 1, label: 'test' }, [{ value: '11', count: 7, label: 'test' }]]
        ])('when count is %i and unchecked node is %o the new count is correct', async (initialCount, uncheckedNode, expectedParam) => {
            const mockFn = jest.fn();
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={reallyBigTree}
                counts={[{ value: '11', label: 'test', count: initialCount }]}
                setNaicsCounts={mockFn} />);
            await container.instance().onUncheck([], uncheckedNode);
            expect(mockFn).toHaveBeenCalledWith(expectedParam);
        });
        it('updates the unchecked array when ancestor is checked and descendant is unchecked', async () => {
            // currently, this only happens in search.
            // This is because...
            // In the expand/collapse view, when you check a parent and expand to its children
            // the checkbox tree removes the parent from checked, and adds all the immediate children of the expanded node
            const setUnchecked = jest.fn();
            const container = shallow(<NAICSContainer
                {...defaultProps}
                setUncheckedNaics={setUnchecked}
                checked={["children_of_11"]}
                nodes={reallyBigTree} />);

            const uncheckedNode = { value: '111110', count: 1, label: 'test' };
            await container.instance().onUncheck(["children_of_11"], uncheckedNode);

            expect(setUnchecked).toHaveBeenCalledWith([uncheckedNode.value]);
        });
    });
});
