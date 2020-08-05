/**
 * NAICSSearchContainer-test.jsx => NAICSCheckboxTree-test.jsx
 * Created by Emily Gullo 07/26/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import { NAICSCheckboxTree } from 'containers/search/filters/naics/NAICSCheckboxTree';

import {
    defaultProps,
    searchResults,
    reallyBigTree
} from './mockNAICS';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));

describe('NAICS Search Filter Container', () => {
    describe('Loading a stateful tree from url hash', () => {
        it('fetches the ancestors when only a grandchild is in checked', async () => {
            const mockFetchNaics = jest.fn(() => Promise.resolve());
            const container = shallow(<NAICSCheckboxTree
                {...defaultProps}
                nodes={[]}
                checkedFromHash={["111110"]} />);
            container.instance().fetchNAICS = mockFetchNaics;
            await container.instance().componentDidMount();
            expect(mockFetchNaics).toHaveBeenCalledWith('11', false);
            expect(mockFetchNaics).toHaveBeenCalledWith('1111', false);
        });
        it('fetches the children of the checked nodes from the hash and adds their placeholder children to checked array', () => {
            const fetchNaics = jest.fn(() => Promise.resolve());
            const updateCountOfSelectedTopTierNaicsCodes = jest.fn();
            const container = shallow(<NAICSCheckboxTree
                nodes={[]}
                {...defaultProps}
                checkedFromHash={["11"]} />);
            container.instance().fetchNAICS = fetchNaics;
            container.instance().updateCountOfSelectedTopTierNaicsCodes = updateCountOfSelectedTopTierNaicsCodes;
            container.instance().componentDidMount()
                .then(() => {
                    // once for regular mount, once for the checked node.
                    expect(fetchNaics).toHaveBeenCalledTimes(2);
                    // second time it was called, it was called with the checked node from the hash
                    expect(fetchNaics).toHaveBeenLastCalledWith('11', false);
                    expect(updateCountOfSelectedTopTierNaicsCodes).toHaveBeenCalledWith(['children_of_11']);
                });
        });
        it('updates the count from hash', async () => {
            const mockFn = jest.fn();
            const countsFromHash = [{ label: '11', description: 'test', count: 63 }];
            const container = shallow(<NAICSCheckboxTree
                {...defaultProps}
                nodes={[]}
                setNaicsCounts={mockFn}
                countsFromHash={countsFromHash}
                checkedFromHash={["11"]}
                uncheckedFromHash={["111110"]} />);
            await container.instance().componentDidMount();
            expect(mockFn).toHaveBeenCalledWith(countsFromHash);
        });
        it('only fetches each code once', async () => {
            const mockFetchNaics = jest.fn(() => Promise.resolve());
            const container = shallow(<NAICSCheckboxTree
                {...defaultProps}
                nodes={[]}
                checkedFromHash={["111110", "111120", "111199", "111140", "111150", "111160", "111191"]} />);
            container.instance().fetchNAICS = mockFetchNaics;
            await container.instance().componentDidMount();
            expect(mockFetchNaics).toHaveBeenCalledWith('11', false);
            expect(mockFetchNaics).toHaveBeenLastCalledWith('1111', false);
            expect(mockFetchNaics).toHaveBeenCalledTimes(3);
        });
    });
    describe('autoCheckSearchedResultDescendants fn', () => {
        it('auto checks unchecked descendants of selected parent', async () => {
            const addCheckedNaics = jest.fn();
            const container = shallow(<NAICSCheckboxTree
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
            const container = shallow(<NAICSCheckboxTree
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
            const container = shallow(<NAICSCheckboxTree
                {...defaultProps}
                setUncheckedNaics={setUnchecked}
                checked={["children_of_11"]}
                nodes={reallyBigTree} />);

            const uncheckedNode = { value: '111110', count: 1, label: 'test' };
            await container.instance().onUncheck(["children_of_11"], uncheckedNode);

            expect(setUnchecked).toHaveBeenCalledWith([uncheckedNode.value]);
        });
    });
    describe('handleTextInputChange', () => {
        it('only calls onSearchChange if search string is greater than or equal to 3 chars', () => {
            const mockFn = jest.fn();
            const container = shallow(<NAICSCheckboxTree {...defaultProps} nodes={reallyBigTree} />);
            container.instance().onSearchChange = mockFn;
            container.instance().handleTextInputChange({ target: { value: 'a' }, persist: () => {} });
            container.instance().handleTextInputChange({ target: { value: 'ab' }, persist: () => {} });
            expect(mockFn).not.toHaveBeenCalled();
            container.instance().handleTextInputChange({ target: { value: 'abc' }, persist: () => {} });
            expect(mockFn).toHaveBeenCalledTimes(1);
        });
    });
});
