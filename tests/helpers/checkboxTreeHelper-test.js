import {
    addSearchResultsToTree,
    sortNodes,
    getHighestAncestorNaicsCode,
    getImmediateAncestorNaicsCode,
    getNodeFromTree,
    expandAllNodes,
    showAllTreeItems
} from 'helpers/checkboxTreeHelper';
import * as mockData from '../containers/search/filters/naics/mockNAICS';

// overwriting this because it makes life easier
const mockSearchResults = [{
    ...mockData.searchResults[0],
    children: [{
        ...mockData.searchResults[0].children[0],
        children: [{
            value: 'pretend',
            naics: 'pretend',
            description: 'this is not real, but pretend',
            count: 0
        }]
    }]
}];

describe('checkboxTree Helpers', () => {
    describe('mergeChildren & addSearchResultsToTree', () => {
        it('does NOT overwrite existing grand-children', () => {
            const existingNodes = mockData.treeWithPlaceholdersAndRealData;
            const [newChildren] = addSearchResultsToTree(existingNodes, mockSearchResults);
            const grandChildrenWithSearch = newChildren.children[0].children;
            const existingGrandChildren = existingNodes[0].children[0].children;
            expect(grandChildrenWithSearch.length).toEqual(existingGrandChildren.length + 1);
        });
    });
    describe('expandAllNodes', () => {
        it('returns an array containing all values from tree', () => {
            const result = expandAllNodes(mockData.searchResults);
            // does not expand grand children as they have no children.
            expect(result).toEqual(["11", "1111"]);
        });
    });
    describe('getNodeFromTree', () => {
        it('grabs the correct node from the tree at every level', () => {
            // parent
            const parent = getNodeFromTree(mockData.reallyBigTree, '21', 'naics');
            expect(parent.naics_description).toEqual("Mining, Quarrying, and Oil and Gas Extraction");
            // child
            const child = getNodeFromTree(mockData.reallyBigTree, '1113', 'naics');
            expect(child.naics_description).toEqual("Fruit and Tree Nut Farming");

            // grandchild
            const granchild = getNodeFromTree(mockData.reallyBigTree, '115310', 'naics');
            expect(granchild.naics_description).toEqual("Support Activities for Forestry");
        });
    });
});
