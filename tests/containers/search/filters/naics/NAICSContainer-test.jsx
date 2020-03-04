/**
 * NAICSSearchContainer-test.jsx => NAICSContainer-test.jsx
 * Created by Emily Gullo 07/26/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import { NAICSContainer } from 'containers/search/filters/naics/NAICSContainer';
import {
    defaultProps,
    treeWithPlaceholdersAndRealData
} from './mockNAICS';

jest.mock('helpers/naicsHelper', () => require('./mockNAICSHelper'));

describe('NAICS Search Filter Container', () => {
    describe('checked state: with placeholder AND real data', () => {
        it('when both parent and child placeholders are checked, only count the value of the parent', async () => {
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={treeWithPlaceholdersAndRealData} />);

            await container.instance().addCheckedNaics(["children_of_11", "children_of_1111"]);
            expect(container.instance().state.selectedNaicsData[0].count).toEqual(64);
        });
        it('when a placeholder is checked and a checked node under that placeholder is removed, decrement the count', async () => {
            const container = shallow(<NAICSContainer
                {...defaultProps}
                nodes={treeWithPlaceholdersAndRealData} />);
            // ensuring state is set...
            await container.instance().addCheckedNaics(["children_of_1111", "111110", "111120"]);
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
            await container.instance().addCheckedNaics(["children_of_1111", "111110", "111120"]);
            expect(container.instance().state.selectedNaicsData[0].count).toEqual(8);

            // now that state is set, remove one of the checked nodes
            await container.instance().onUncheck(["children_of_1111", "111120"], { checked: false, value: "111110" });
            expect(container.instance().state.selectedNaicsData[0].count).toEqual(7);
        });
    });
});
