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
    searchResults
} from './mockNAICS';

jest.mock('helpers/naicsHelper', () => require('./mockNAICSHelper'));

describe('NAICS Search Filter Container', () => {
    describe('Counting the selected Checkboxes: with placeholder AND real data', () => {
        it('when both parent and child placeholders are checked, only count the value of the parent', async () => {
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={treeWithPlaceholdersAndRealData} />);

            await container.instance().updateCountOfSelectedTopTierNaicsCodes(["children_of_11", "children_of_1111"]);
            expect(container.instance().state.selectedNaicsData[0].count).toEqual(64);
        });
        it('when a placeholder is checked and a checked node under that placeholder is removed, decrement the count', async () => {
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={treeWithPlaceholdersAndRealData} />);
            // ensuring state is set...
            await container.instance().updateCountOfSelectedTopTierNaicsCodes(["children_of_1111", "111110", "111120"]);
            expect(container.instance().state.selectedNaicsData[0].count).toEqual(8);

            // now that state is set, remove one of the checked nodes
            await container.instance().onUncheck(["children_of_1111", "111120"], { checked: false, value: "111110" });
            expect(container.instance().state.selectedNaicsData[0].count).toEqual(7);
        });
        it('when a placeholder is checked and a checked node under that placeholder is removed, decrement the count', async () => {
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={treeWithPlaceholdersAndRealData} />);
            // ensuring state is set...
            await container.instance().updateCountOfSelectedTopTierNaicsCodes(["children_of_1111", "111110", "111120"]);
            expect(container.instance().state.selectedNaicsData[0].count).toEqual(8);

            // now that state is set, remove one of the checked nodes
            await container.instance().onUncheck(["children_of_1111", "111120"], { checked: false, value: "111110" });
            expect(container.instance().state.selectedNaicsData[0].count).toEqual(7);
        });
        it('checked place holders increment with an offset count when a descendent is also checked', async () => {
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={treeWithPlaceholdersAndRealData} />);

            // only grandchildren checked
            await container.instance().updateCountOfSelectedTopTierNaicsCodes(["111110", "111120"]);
            expect(container.instance().state.selectedNaicsData[0].count).toEqual(2);

            // ensuring the props are actually set (they would be by the app but the shallow rendering requires this)
            await container.setProps({ checked: ["111110", "111120"] });

            // updating the checked array with the same values, plus the child placeholder for those values doesnt over count
            await container.instance().updateCountOfSelectedTopTierNaicsCodes(["children_of_1111", "111110", "111120"]);
            expect(container.instance().state.selectedNaicsData[0].count).toEqual(8);
        });
    });
    describe('autoCheckChildrenOfParent fn', () => {
        it('auto checks unchecked descendents of selected parent', async () => {
            const setChecked = jest.fn();
            const container = shallow(<NAICSContainer
                {...defaultProps}
                checked={["children_of_11"]}
                setChecked={setChecked} />);
                
            await container.instance().autoCheckImmediateChildrenAfterDynamicExpand(treeWithPlaceholdersAndRealData[0]);

            // removing the placeholder selection for 11 and adding all the descendents grandchildren (placeholders) to checked. In this test case, we only have one immediate child of 11. Non-placeholder children should not be auto checked.
            expect(setChecked).toHaveBeenCalledWith(["children_of_1111"]);
        });
    });
});
