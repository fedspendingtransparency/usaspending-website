/**
 * NAICSSearchContainer-test.jsx => NAICSContainer-test.jsx
 * Created by Emily Gullo 07/26/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import { NAICSContainer } from 'containers/search/filters/naics/NAICSContainer';
import {
    defaultProps,
    treeWithPlaceholdersAndRealData,
    searchResults,
    reallyBigTree
} from './mockNaics_v2';

jest.mock('helpers/naicsHelper', () => require('./mockNAICSHelper'));

describe('NAICS Search Filter Container', () => {
    describe('Loading a stateful tree from url hash', () => {
        it('fetches the ancestor when a grandchild is in checked w/o any ancestor', async () => {
            const fetchNAICS = jest.fn(() => Promise.resolve());
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={reallyBigTree}
                checkedFromHash={["111110"]} />);
            container.instance().fetchNAICS = fetchNAICS;
            await container.instance().componentDidMount();
            expect(fetchNAICS).toHaveBeenCalledWith('1111');
        });
        it('fetches the children of the checked nodes from the hash and adds their grand children to checked array', () => {
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
            const updateCountOfSelectedTopTierNaicsCodes = jest.fn();
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={reallyBigTree}
                checkedFromHash={["1111"]}
                uncheckedFromHash={["111110"]} />);
            container.instance().updateCountOfSelectedTopTierNaicsCodes = updateCountOfSelectedTopTierNaicsCodes;
            await container.instance().componentDidMount();
            const allGrandchildrenExpectUnchecked = reallyBigTree[0].children[0]
                .children
                .map((child) => child.value)
                .filter((child) => child !== '111110');
            expect(updateCountOfSelectedTopTierNaicsCodes).toHaveBeenCalledWith(allGrandchildrenExpectUnchecked);
        });
    });
    describe('Counting the selected Checkboxes: with placeholder AND real data', () => {
        // NOTE: these also test the logic behind getCountWithPlaceholderOffset
        it('when both parent and child placeholders are checked, only count the value of the parent', async () => {
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={treeWithPlaceholdersAndRealData} />);

            await container.instance().updateCountOfSelectedTopTierNaicsCodes(["children_of_11", "children_of_1111"]);
            expect(container.instance().state.stagedNaicsFilters[0].count).toEqual(64);
        });
        it('when a placeholder is checked and a checked node under that placeholder is removed, decrement the count', async () => {
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={treeWithPlaceholdersAndRealData} />);
            // ensuring state is set...
            await container.instance().updateCountOfSelectedTopTierNaicsCodes(["children_of_1111", "111110", "111120"]);
            expect(container.instance().state.stagedNaicsFilters[0].count).toEqual(8);

            // now that state is set, remove one of the checked nodes
            await container.instance().onUncheck(["children_of_1111", "111120"], { checked: false, value: "111110" });
            expect(container.instance().state.stagedNaicsFilters[0].count).toEqual(7);
        });
        it('when a placeholder is checked and a checked node under that placeholder is removed, decrement the count', async () => {
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={treeWithPlaceholdersAndRealData} />);
            // ensuring state is set...
            await container.instance().updateCountOfSelectedTopTierNaicsCodes(["children_of_1111", "111110", "111120"]);
            expect(container.instance().state.stagedNaicsFilters[0].count).toEqual(8);

            // now that state is set, remove one of the checked nodes
            await container.instance().onUncheck(["children_of_1111", "111120"], { checked: false, value: "111110" });
            expect(container.instance().state.stagedNaicsFilters[0].count).toEqual(7);
        });
        it('checked place holders increment with an offset count when a descendent is also checked', async () => {
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={treeWithPlaceholdersAndRealData} />);

            // only grandchildren checked
            await container.instance().updateCountOfSelectedTopTierNaicsCodes(["111110", "111120"]);
            expect(container.instance().state.stagedNaicsFilters[0].count).toEqual(2);

            // ensuring the props are actually set (they would be by the app but the shallow rendering requires this)
            await container.setProps({ checked: ["111110", "111120"] });

            // updating the checked array with the same values, plus the child placeholder for those values doesnt over count
            await container.instance().updateCountOfSelectedTopTierNaicsCodes(["children_of_1111", "111110", "111120"]);
            expect(container.instance().state.stagedNaicsFilters[0].count).toEqual(8);
        });
    });
    describe('autoCheckImmediateChildrenAfterDynamicExpand fn', () => {
        it('auto checks unchecked descendants of selected parent', async () => {
            const setChecked = jest.fn();
            const container = shallow(<NAICSContainer
                {...defaultProps}
                checked={["children_of_11"]}
                setChecked={setChecked} />);
                
            await container.instance().autoCheckImmediateChildrenAfterDynamicExpand(treeWithPlaceholdersAndRealData[0]);

            // removing the placeholder selection for 11 and adding all the descendants grandchildren (placeholders) to checked. In this test case, we only have one immediate child of 11. Non-placeholder children should not be auto checked.
            expect(setChecked).toHaveBeenCalledWith(["children_of_1111", "children_of_1112"]);
        });
    });
    describe('autoCheckSearchedResultDescendants fn', () => {
        it('auto checks unchecked descendants of selected parent', async () => {
            const addChecked = jest.fn();
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={searchResults}
                addChecked={addChecked} />);
            const expanded = ["11", "1111", "111110", "144444"];
            await container.instance().autoCheckSearchedResultDescendants(["children_of_11"], expanded);

            expect(addChecked).toHaveBeenCalledWith("111110");
            expect(addChecked).not.toHaveBeenCalledWith("144444");
        });
    });
    describe('onUncheck fn', () => {
        it('removes stagedFilter when parent is unchecked', async () => {
            const container = shallow(<NAICSContainer {...defaultProps} />);

            await container.setState({ stagedNaicsFilters: [{ value: '11', count: '64', label: 'test' }] });
            // confirm state was successfully mocked as validity of test depends on this being removed...
            expect(container.instance().state.stagedNaicsFilters.length).toEqual(1);

            const uncheckedNode = { value: '11', count: 64, label: 'test' };

            await container.instance().onUncheck([], uncheckedNode);

            expect(container.instance().state.stagedNaicsFilters.length).toEqual(0);
        });
        it('removes stagedFilter when only child of parent is unchecked', async () => {
            const container = shallow(<NAICSContainer {...defaultProps} nodes={reallyBigTree} />);

            await container.setState({ stagedNaicsFilters: [{ value: '11', count: '8', label: 'test' }] });
            // confirm state was successfully mocked as validity of test depends on this being empty...
            expect(container.instance().state.stagedNaicsFilters.length).toEqual(1);

            const uncheckedNode = { value: '1111', count: 8, label: 'test' };

            await container.instance().onUncheck([], uncheckedNode);

            expect(container.instance().state.stagedNaicsFilters.length).toEqual(0);
        });
        it('removes stagedFilter when only grand child of parent is unchecked', async () => {
            const container = shallow(<NAICSContainer {...defaultProps} nodes={reallyBigTree} />);

            await container.setState({ stagedNaicsFilters: [{ value: '11', count: '8', label: 'test' }] });
            // confirm state was successfully mocked as validity of test depends on this being empty...
            expect(container.instance().state.stagedNaicsFilters.length).toEqual(1);

            const uncheckedNode = { value: '1111', count: 8, label: 'test' };
            await container.instance().onUncheck([], uncheckedNode);

            expect(container.instance().state.stagedNaicsFilters.length).toEqual(0);
        });
        it('decrements count of stagedFilter one of many children/grandchildren is unchecked', async () => {
            const container = shallow(<NAICSContainer {...defaultProps} nodes={reallyBigTree} />);
            await container.setState({ stagedNaicsFilters: [{ value: '11', count: '8', label: 'test' }] });

            const uncheckedNode = { value: '111110', count: 1, label: 'test' };
            await container.instance().onUncheck([], uncheckedNode);

            expect(container.instance().state.stagedNaicsFilters[0].count).toEqual(7);
        });
        it('updates the unchecked array when ancestor is checked and descendant is unchecked', async () => {
            // currently, this only happens in search.
            // This is because...
            // In the expand/collapse view, when you check a parent and expand to its children
            // the checkbox tree removes the parent from checked, and adds all the immediate children of the expanded node
            const setUnchecked = jest.fn();
            const container = shallow(<NAICSContainer
                {...defaultProps}
                setUnchecked={setUnchecked}
                checked={["children_of_11"]}
                nodes={reallyBigTree} />);

            const uncheckedNode = { value: '111110', count: 1, label: 'test' };
            await container.instance().onUncheck(["children_of_11"], uncheckedNode);

            expect(setUnchecked).toHaveBeenCalledWith([uncheckedNode.value]);
        });
    });
    describe('removeFromUnchecked', () => {
        it('removes items from unchecked array when all immediate children are checked', async () => {
            // ie, 1111 is unchecked, then all grand children underneath are checked.
            const allGrandchildren = reallyBigTree[0].children[0].children
                .map((grand) => grand.value);
            const lastGrandChild = allGrandchildren[allGrandchildren.length - 1];
            const container = shallow(<NAICSContainer
                {...defaultProps}
                checked={allGrandchildren.splice(0, allGrandchildren.length - 1)}
                unchecked={["1111"]}
                nodes={reallyBigTree} />);

            const result = container.instance().removeFromUnchecked(lastGrandChild);

            expect(result).toEqual("1111");
        });
        it('does NOT remove from unchecked array when less than all immediate children are checked', () => {
            // ie, 1111 is unchecked, then all but one grandchild underneath is checked.
            const allGrandchildren = reallyBigTree[0].children[0].children
                .map((grand) => grand.value);
            const lastGrandChild = allGrandchildren[allGrandchildren.length - 1];
            const container = shallow(<NAICSContainer
                {...defaultProps}
                checked={allGrandchildren.splice(0, allGrandchildren.length - 2)}
                unchecked={["1111"]}
                nodes={reallyBigTree} />);

            const result = container.instance().removeFromUnchecked(lastGrandChild);

            expect(result).toEqual(null);
        });
    });
});
