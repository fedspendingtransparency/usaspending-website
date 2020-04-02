import {
    addSearchResultsToTree,
    getHighestAncestorNaicsCode,
    getImmediateAncestorNaicsCode,
    getNodeFromTree,
    expandAllNodes,
    showAllTreeItems,
    cleanNaicsData
} from 'helpers/checkboxTreeHelper';

import * as mockData from '../containers/search/filters/naics/mockNaics_v2';

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

describe('naicsHelper', () => {
    describe('addSearchResultsToTree & mergeChildren & ', () => {
        it('does NOT overwrite existing grand-children', () => {
            const existingNodes = mockData.treeWithPlaceholdersAndRealData;
            const [newChildren] = addSearchResultsToTree(existingNodes, mockSearchResults);
            const grandChildrenWithSearch = newChildren.children[0].children;
            const existingGrandChildren = existingNodes[0].children[0].children;
            expect(grandChildrenWithSearch.length).toEqual(existingGrandChildren.length + 1);
        });
        it('adds a the hide class to nodes not in search results', () => {
            const existingNodes = mockData.reallyBigTree;
            const searchResult = addSearchResultsToTree(existingNodes, mockData.searchResults);
            const existingGrandChildren = existingNodes[0].children[0].children;
            const grandChildrenWithSearch = searchResult
                .find((node) => node.value === '11')
                .children[0].children;
            // not overwriting existing children
            expect(grandChildrenWithSearch.length).toEqual(existingGrandChildren.length);
            // adding class to all nodes not in search result
            const hiddenNodes = grandChildrenWithSearch.filter((node) => node.className === 'hide');
            const visibleNodes = grandChildrenWithSearch.filter((node) => node.className === '');
            expect(hiddenNodes.length).toEqual(7);
            expect(visibleNodes.length).toEqual(1);
            expect(visibleNodes[0].naics_description).toEqual('Soybean Farming');
        });
        it('removes placeholder grandchildren for nodes with all grandchildren', () => {
            const existingNodes = mockData.placeholderNodes;
            const searchResult = addSearchResultsToTree(existingNodes, [mockData.reallyBigTree[0]]);
            const childrenFromSearch = searchResult
                .find((node) => node.value === '11')
                .children;

            // 1111's children
            const grandChildrenFromSearch = childrenFromSearch
                .find((node) => node.value === '1111')
                .children;
            const grandChildrenWithPlaceholder = grandChildrenFromSearch
                .filter((node) => node.isPlaceHolder);

            expect(grandChildrenWithPlaceholder.length).toEqual(0);
        });
        it('keeps placeholder children/grandchildren for nodes without all children', () => {
            const existingNodes = mockData.treeWithPlaceholdersAndRealData;
            const [searchResults] = addSearchResultsToTree(existingNodes, mockSearchResults);
            const childFromSearch = searchResults.children[0];
            const childPlaceHolderExists = searchResults
                .children
                .some((child) => child.isPlaceHolder);

            const grandPlaceHolderExists = childFromSearch
                .children
                .some((grand) => grand.isPlaceHolder);
            expect(grandPlaceHolderExists).toEqual(true);
            expect(childPlaceHolderExists).toEqual(true);
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
    describe('getHighestAncestorNaicsCode', () => {
        const result = getHighestAncestorNaicsCode('111111');
        expect(result).toEqual('11');
    });
    describe('getImmediateAncestorNaicsCode', () => {
        const result = getImmediateAncestorNaicsCode('111111');
        expect(result).toEqual('1111');
    });
    describe('showAllTreeItems', () => {
        it('removes the hide class from all nodes', () => {
            const result = showAllTreeItems(mockData.reallyBigTree);
            const nodeWithHideClass = getNodeFromTree(result, '115310', 'naics');
            expect(nodeWithHideClass.className).toEqual('');
        });
        it('adds new children and removes the loading placeholder if we have all the nodes', () => {
            const result = showAllTreeItems(mockData.placeholderNodes, '11', [mockData.reallyBigTree[0]]);
            const lengthWithoutPlaceholderNodes = mockData.reallyBigTree[0].children.length;
            const nodeWithPlaceHolderChildren = getNodeFromTree(result, '11', 'naics');
            expect(nodeWithPlaceHolderChildren.children.length).toEqual(lengthWithoutPlaceholderNodes);
        });
        it('adds new children as a sibling to the loading placeholder if we have a new node to add', () => {
            // Should be node 1111
            const newNode = mockData.reallyBigTree[0].children[0];

            const result = showAllTreeItems(mockData.placeholderNodes, '1111', [newNode]);
            const node = getNodeFromTree(result, '11');

            // node has the placeholder child
            expect(node.children.some((child) => child.isPlaceHolder)).toEqual(true);
            const childrenWithNoPlaceHolder = node.children
                .find((child) => child.value === '1111');

            // node also has the new child
            expect(childrenWithNoPlaceHolder.value).toEqual('1111');
        });
    });
    describe('cleanNaicsData', () => {
        it('object property mapping: (A) naics_description --> label & (B) naics --> value', () => {
            const [mock] = [{ naics: '11', naics_description: 'test1' }];
            const [cleanData] = cleanNaicsData([mock]);
            expect(cleanData.label).toEqual(mock.naics_description);
            expect(cleanData.value).toEqual(mock.naics);
            expect(cleanData.children[0].isPlaceHolder).toEqual(true);
        });
        it('recursively cleans child objects objects', () => {
            const [mock] = [
                {
                    naics: '11',
                    naics_description: 'test1',
                    children: [{
                        naics: '1111',
                        naics_description: 'test2',
                        children: [{
                            naics: '111110',
                            naics_description: 'test3'
                        }]
                    }]
                }
            ];
            const [cleanData] = cleanNaicsData([mock]);
            expect(cleanData.label).toEqual(mock.naics_description);
            expect(cleanData.value).toEqual(mock.naics);
            expect(cleanData.children[0].value).toEqual(cleanData.children[0].naics);
            expect(cleanData.children[0].label).toEqual(cleanData.children[0].naics_description);
            expect(cleanData.children[0].children[0].value).toEqual(cleanData.children[0].children[0].naics);
            expect(cleanData.children[0].children[0].label).toEqual(cleanData.children[0].children[0].naics_description);
        });
    });
});
