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
});
