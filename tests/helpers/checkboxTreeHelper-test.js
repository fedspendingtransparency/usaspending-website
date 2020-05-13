import {
    addSearchResultsToTree,
    expandNodeAndAllDescendantParents,
    populateChildNodes,
    cleanTreeData,
    removePlaceholderString,
    removeStagedFilter,
    getCountOfAllCheckedDescendants,
    decrementCountAndUpdateUnchecked,
    incrementCountAndUpdateUnchecked,
    autoCheckImmediateChildrenAfterDynamicExpand,
    showAllNodes,
    getAllDescendants,
    doesNodeHaveGenuineChildren,
    addPlaceholder,
    areChildrenPartial
} from 'helpers/checkboxTreeHelper';
import {
    getHighestAncestorNaicsCode,
    getImmediateAncestorNaicsCode,
    getNaicsNodeFromTree,
    naicsKeyMap,
    shouldNaicsNodeHaveChildren
} from 'helpers/naicsHelper';

import {
    getPscNodeFromTree,
    getHighestPscAncestor,
    getImmediatePscAncestor,
    cleanPscData
} from 'helpers/pscHelper';

import * as mockData from '../containers/search/filters/naics/mockNaics_v2';
import * as pscMockData from '../containers/search/filters/psc/mockPSC';

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

describe('checkboxTree Helpers (using NAICS data)', () => {
    describe('getAllDescendants', () => {
        it('returns an array of lowest descendants in tree', () => {
            const mock = mockData.reallyBigTreePSCDepth[0].children[0];
            const result = getAllDescendants(mock);
            expect(result).toEqual([
                "111110",
                "great grandchild",
                "111130",
                "111140",
                "111150",
                "111160",
                "111191",
                "111199"
            ]);
        });
    });
    describe('addSearchResultsToTree & appendChildrenFromSearchResults', () => {
        it('does NOT overwrite existing grand-children', () => {
            const existingNodes = mockData.treeWithPlaceholdersAndRealData;
            const [newChildren] = addSearchResultsToTree(existingNodes, mockSearchResults, getNaicsNodeFromTree);
            const grandChildrenWithSearch = newChildren.children[0].children;
            const existingGrandChildren = existingNodes[0].children[0].children;
            expect(grandChildrenWithSearch.length).toEqual(existingGrandChildren.length + 1);
        });
        it('does NOT overwrite existing great-grand-children (PSC Depth)', () => {
            const existingNodes = mockData.treeWithPlaceholdersAndRealDataPSCDepth;
            const [newChildren] = addSearchResultsToTree(existingNodes, mockSearchResults, getNaicsNodeFromTree);
            const preExistingGreatGrandChild = newChildren
                .children
                .find((node) => node.value === '1111')
                .children
                .find((node) => node.value === '111120')
                .children
                .find((node) => node.value === 'dont-overwrite-me');
            const newGrandChild = newChildren
                .children
                .find((node) => node.value === '1111')
                .children
                .find((node) => node.value === 'pretend');

            expect(preExistingGreatGrandChild.naics_description).toEqual('real');
            expect(newGrandChild.value).toEqual('pretend');
        });
        it('adds the hide class to nodes not in search results (PSC Depth)', () => {
            const existingNodes = mockData.reallyBigTreePSCDepth;
            const searchResult = addSearchResultsToTree(existingNodes, mockData.searchResults, getNaicsNodeFromTree);
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

            const greatGrandChild = hiddenNodes.find((node) => {
                if (node.children) {
                    return node.children.some((child) => child.value === 'great grandchild');
                }
                return false;
            });
            expect(greatGrandChild.className).toEqual('hide');
        });
        it('(PSC DATA) -- removes the hide class based on search results and does not add the same node twice', () => {
            const matchingNode = getPscNodeFromTree(pscMockData.reallyBigTree, 'AC');
            const firstSearchResult = [{
                ...pscMockData.topTierResponse.results[0],
                children: [{
                    ...matchingNode,
                    children: [
                        {
                            ...matchingNode.children[0],
                            // the rest of the children will be hidden w/ the hide class
                            children: [matchingNode.children[0].children[0]]
                        }
                    ]
                }]
            }];

            // applies the hide class to the node...
            const existingNodes = addSearchResultsToTree(pscMockData.reallyBigTree, firstSearchResult, getPscNodeFromTree);
            const hiddenNode = getPscNodeFromTree(existingNodes, 'AC24');
            expect(hiddenNode.className).toEqual('hide');

            const secondSearchResult = [{
                ...pscMockData.topTierResponse.results[0],
                children: [matchingNode]
            }];

            // removes the hide class from the node...
            const searchResults = addSearchResultsToTree(existingNodes, secondSearchResult, getPscNodeFromTree);
            const previouslyHiddenNode = getPscNodeFromTree(searchResults, 'AC24');
            expect(previouslyHiddenNode.className).toEqual('');

            // when updating the tree, don't add duplicate nodes
            const parent = getPscNodeFromTree(searchResults, 'AC2');
            const childrenNamedAC24 = parent.children.filter((node) => node.value === 'AC24');
            expect(childrenNamedAC24.length).toEqual(1);
        });
        it('removes placeholder grandchildren for nodes with all grandchildren', () => {
            const existingNodes = mockData.placeholderNodes;
            const searchResult = addSearchResultsToTree(existingNodes, [mockData.reallyBigTree[0]], getNaicsNodeFromTree);
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
            const [searchResults] = addSearchResultsToTree(existingNodes, mockSearchResults, getNaicsNodeFromTree);
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
        it('keeps placeholder children/grandchildren for nodes without all children (PSC Depth)', () => {
            const existingNodes = mockData.treeWithPlaceholdersAndRealDataPSCDepth;
            const [searchResults] = addSearchResultsToTree(existingNodes, mockSearchResults, getNaicsNodeFromTree);
            const childFromSearch = searchResults.children[0];
            const childPlaceHolderExists = searchResults
                .children
                .some((child) => child.isPlaceHolder);

            const grandPlaceHolderExists = childFromSearch
                .children
                .some((grand) => grand.isPlaceHolder);
            
            const greatGrandNotOverwritten = childFromSearch
                .children
                .find((grand) => grand.value === '111120')
                .children
                .some((greatGrand) => greatGrand.value === 'dont-overwrite-me');

            const greatGrandPlaceholderNotOverwritten = childFromSearch
                .children
                .find((grand) => grand.value === '111120')
                .children
                .some((greatGrand) => greatGrand.isPlaceHolder === true);

            expect(grandPlaceHolderExists).toEqual(true);
            expect(childPlaceHolderExists).toEqual(true);
            expect(greatGrandNotOverwritten).toEqual(true);
            expect(greatGrandPlaceholderNotOverwritten).toEqual(true);
        });
        it('adds a placeholder for nodes without all children if they dont have it (PSC Depth)', () => {
            const existingNodes = cleanPscData(pscMockData.topTierResponse.results);
            const searchResults = addSearchResultsToTree(existingNodes, [pscMockData.reallyBigTree[0]], getPscNodeFromTree);
            const secondTierWithPlaceholder = getPscNodeFromTree(searchResults, 'AA');
            const secondTierWithPartialChildrenAndPlaceholder = getPscNodeFromTree(searchResults, 'AC');
            const thirdTierWithPartialResultsAndPlaceholder = getPscNodeFromTree(searchResults, 'AC2');

            expect(secondTierWithPlaceholder.children[0].isPlaceHolder).toEqual(true);
            expect(secondTierWithPartialChildrenAndPlaceholder.children.some((node) => node.isPlaceHolder)).toEqual(true);
            expect(thirdTierWithPartialResultsAndPlaceholder.children.some((node) => node.isPlaceHolder)).toEqual(true);
        });
    });
    describe('expandNodeAndAllDescendantParents', () => {
        it('returns an array containing all values from tree', () => {
            const result = expandNodeAndAllDescendantParents(
                mockData.searchResults,
                'value',
                shouldNaicsNodeHaveChildren
            );
            // does not expand grand children as they have no children.
            expect(result).toEqual(["11", "1111"]);
        });
    });
    describe('showAllNodes (PSC Depth)', () => {
        it('removes the hide class from all nodes', () => {
            const result = showAllNodes(mockData.reallyBigTreePSCDepth);
            const nodeWithHideClass = getNaicsNodeFromTree(result, '111120', 'naics').children[0];
            expect(nodeWithHideClass.className).toEqual('');
        });
    });
    describe('populateChildNodes', () => {
        it('adds new children and removes the loading placeholder if we have all the nodes', () => {
            const result = populateChildNodes(
                mockData.placeholderNodes,
                '11',
                [mockData.reallyBigTree[0]],
                getHighestAncestorNaicsCode,
                getImmediateAncestorNaicsCode,
                getNaicsNodeFromTree
            );
            const lengthWithoutPlaceholderNodes = mockData.reallyBigTree[0].children.length;
            const nodeWithPlaceHolderChildren = getNaicsNodeFromTree(result, '11', 'value');
            expect(nodeWithPlaceHolderChildren.children.length).toEqual(lengthWithoutPlaceholderNodes);
        });
        it('adds new children as a sibling to the loading placeholder if we have a new node to add', () => {
            // Should be node 1111
            const newNode = mockData.reallyBigTree
                .find((node) => node.value === '11')
                .children
                .find((node) => node.value === '1111');

            const result = populateChildNodes(
                mockData.treeWithPlaceholdersAndRealData,
                '1111',
                [newNode],
                getHighestAncestorNaicsCode,
                getImmediateAncestorNaicsCode,
                getNaicsNodeFromTree
            );

            const node = getNaicsNodeFromTree(result, '11');
            const grandChildCodeNotInInitialTree = '111130';

            // node has the placeholder child (1112 placeholder)
            expect(node.children.some((child) => child.isPlaceHolder)).toEqual(true);
            const grandChildWasAdded = node.children
                .find((child) => child.value === '1111')
                .children
                .some((grandChild) => grandChild.value === grandChildCodeNotInInitialTree);

            // node also has the new child
            expect(grandChildWasAdded).toEqual(true);
        });
        it('keeps children when real data is present (PCS Depth)', () => {
            // Should be node 1111
            const newNode = mockData.reallyBigTreePSCDepth
                .find((node) => node.value === '11')
                .children
                .find((node) => node.value === '1111');

            const result = populateChildNodes(
                mockData.treeWithPlaceholdersAndRealDataPSCDepth,
                '1111',
                [newNode],
                getHighestAncestorNaicsCode,
                getImmediateAncestorNaicsCode,
                getNaicsNodeFromTree
            );

            const node = getNaicsNodeFromTree(result, '11');

            const greatGrandChildWasNotOverwritten = node.children
                .find((child) => child.value === '1111')
                .children
                .find((grand) => grand.value === '111120')
                .children
                .find((greatGrand) => greatGrand.value === 'dont-overwrite-me');
            expect(greatGrandChildWasNotOverwritten.naics_description).toEqual('real');
        });
    });
    describe('cleanTreeData', () => {
        it('object property mapping: (A) naics_description --> label & (B) naics --> value', () => {
            const [mock] = [{ naics: '11', naics_description: 'test1' }];
            const [cleanData] = cleanTreeData([mock], naicsKeyMap);
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
            const [cleanData] = cleanTreeData([mock], naicsKeyMap);
            expect(cleanData.label).toEqual(mock.naics_description);
            expect(cleanData.value).toEqual(mock.naics);
            expect(cleanData.children[0].value).toEqual(cleanData.children[0].naics);
            expect(cleanData.children[0].label).toEqual(cleanData.children[0].naics_description);
            expect(cleanData.children[0].children[0].value).toEqual(cleanData.children[0].children[0].naics);
            expect(cleanData.children[0].children[0].label).toEqual(cleanData.children[0].children[0].naics_description);
        });
    });
    describe('removePlaceholderString', () => {
        const result = removePlaceholderString('children_of_123');
        expect(result).toEqual('123');
    });
    describe('removeStagedFilter', () => {
        const result = removeStagedFilter(
            mockData.reallyBigTree,
            ['1111', '21', '1112', '1113'],
            '11',
            getNaicsNodeFromTree,
            getHighestAncestorNaicsCode,
            getImmediateAncestorNaicsCode
        );
        expect(result.length).toEqual(1);
        expect(result.some((checked) => checked.includes('11'))).toEqual(false);
    });
    describe('getCountOfAllCheckedDescendants', () => {
        const result = getCountOfAllCheckedDescendants(
            mockData.reallyBigTree,
            '11',
            ['1111', '1112', '1113'],
            getNaicsNodeFromTree
        );
        expect(result).toEqual(19);
    });
    describe('decrementCountAndUpdateUnchecked', () => {
        it('decrements the count and updates the unchecked array as appropriate', () => {
            const [newCount, newUnchecked] = decrementCountAndUpdateUnchecked(
                { value: '1111' },
                [],
                ['11'],
                [{ value: '11', count: 64 }],
                mockData.reallyBigTree,
                getNaicsNodeFromTree,
                getImmediateAncestorNaicsCode,
                getHighestAncestorNaicsCode
            );
            expect(newCount[0].count).toEqual(56);
            expect(newUnchecked.length).toEqual(1);
        });
        it('decrements the appropriate count object when more than one exists', () => {
            const [newCount] = decrementCountAndUpdateUnchecked(
                { value: '1111' },
                [],
                ['11'],
                [{ value: '11', count: 64 }, { value: '21', count: 8 }],
                mockData.reallyBigTree,
                getNaicsNodeFromTree,
                getImmediateAncestorNaicsCode,
                getHighestAncestorNaicsCode
            );
            expect(newCount[0].count).toEqual(56);
        });
        it('when a placeholder is checked and a checked node under that placeholder is unchecked, decrement the count and update the unchecked array', async () => {
            const [counts, newUnchecked] = decrementCountAndUpdateUnchecked(
                { checked: false, value: "111110" },
                [],
                ["children_of_1111"],
                [{ value: '11', count: 8 }],
                mockData.treeWithPlaceholdersAndRealData,
                getNaicsNodeFromTree,
                getImmediateAncestorNaicsCode,
                getHighestAncestorNaicsCode
            );

            // now that state is set, remove one of the checked nodes
            expect(counts[0].count).toEqual(7);
            expect(newUnchecked[0]).toEqual("111110");
        });
    });
    describe('incrementCountAndUpdateUnchecked', () => {
        it('increments the count and updates the unchecked array when appropriate', () => {
            const [newCount, newUnchecked] = incrementCountAndUpdateUnchecked(
                ['11', '1111'],
                ['11'],
                ['1111'],
                mockData.reallyBigTree,
                [{ value: '11', count: 56 }],
                getNaicsNodeFromTree,
                getImmediateAncestorNaicsCode,
                getHighestAncestorNaicsCode
            );
            expect(newCount[0].count).toEqual(64);
            expect(newUnchecked.length).toEqual(0);
        });
        it('when both parent and child placeholders are checked, only count the value of the parent', () => {
            const [counts] = incrementCountAndUpdateUnchecked(
                ["children_of_11", "children_of_1111"],
                [''],
                [],
                mockData.treeWithPlaceholdersAndRealData,
                [],
                getNaicsNodeFromTree,
                getImmediateAncestorNaicsCode,
                getHighestAncestorNaicsCode
            );
            expect(counts[0].count).toEqual(64);
        });
        it('PSC Depth: when both parent and child placeholders are checked, only count the value of the parent', () => {
            const [counts] = incrementCountAndUpdateUnchecked(
                ["children_of_AC", "AC21", "children_of_AC2"],
                [''],
                [],
                pscMockData.reallyBigTree,
                [],
                getPscNodeFromTree,
                getImmediatePscAncestor,
                getHighestPscAncestor
            );
            expect(counts[0].count).toEqual(56);
        });
        it('checked place holders increment with an offset count when a descendent is also checked', async () => {
            const [counts] = incrementCountAndUpdateUnchecked(
                ["111110", "111120", 'children_of_1111'],
                ["111110", "111120"],
                [],
                mockData.treeWithPlaceholdersAndRealData,
                [{ value: '11', count: 2 }],
                getNaicsNodeFromTree,
                getImmediateAncestorNaicsCode,
                getHighestAncestorNaicsCode
            );

            expect(counts[0].count).toEqual(8);
        });

        it('removes items from unchecked array when all immediate children are checked', async () => {
            // ie, 1111 is unchecked, then all grand children underneath are checked.
            const allGrandchildrenOf1111 = mockData.reallyBigTree[0]
                .children[0]
                .children
                .map((grand) => grand.value);
    
            const [newCounts, newUnchecked] = incrementCountAndUpdateUnchecked(
                allGrandchildrenOf1111,
                allGrandchildrenOf1111.filter((grand) => grand !== '111110'),
                ['1111'],
                mockData.reallyBigTree,
                [{ value: '11', count: 7 }],
                getNaicsNodeFromTree,
                getImmediateAncestorNaicsCode,
                getHighestAncestorNaicsCode
            );
    
            expect(newCounts[0].count).toEqual(8);
            expect(newUnchecked.length).toEqual(0);
        });
        it('does NOT remove from unchecked array when less than all immediate children are checked', () => {
            // ie, 1111 is unchecked, then all but one grandchild underneath is checked.
            const allGrandchildrenOf1111 = mockData.reallyBigTree[0]
                .children[0]
                .children
                .map((grand) => grand.value);

            const [newCounts, newUnchecked] = incrementCountAndUpdateUnchecked(
                allGrandchildrenOf1111
                    .filter((grand) => grand !== '111110'),
                ['111130', '111140'],
                ['1111'],
                mockData.reallyBigTree,
                [{ value: '11', count: 2 }],
                getNaicsNodeFromTree,
                getImmediateAncestorNaicsCode,
                getHighestAncestorNaicsCode
            );

            expect(newCounts[0].count).toEqual(7);
            expect(newUnchecked[0]).toEqual('1111');
        });
    });
    describe('autoCheckImmediateChildrenAfterDynamicExpand', () => {
        it('returns an array that replaces placeholders w/ real checked codes', () => {
            // naics code 1111
            const mockParentNode = mockData.reallyBigTree[0].children[0];
            const newChecked = autoCheckImmediateChildrenAfterDynamicExpand(
                mockParentNode,
                ["children_of_1111", 'children_of_21'],
                [],
                'naics',
                shouldNaicsNodeHaveChildren
            );
            expect(newChecked).toEqual([
                "children_of_21",
                "111110",
                "111120",
                "111130",
                "111140",
                "111150",
                "111160",
                "111191",
                "111199"
            ]);
        });
        it('does not add codes descendant from placeholder that are in the unchecked array', () => {
            // naics code 1111
            const mockParentNode = mockData.reallyBigTree[0].children[0];
            const newChecked = autoCheckImmediateChildrenAfterDynamicExpand(
                mockParentNode,
                ["children_of_1111"],
                ['111120'],
                'naics',
                shouldNaicsNodeHaveChildren
            );
            expect(newChecked).toEqual([
                "111110",
                "111130",
                "111140",
                "111150",
                "111160",
                "111191",
                "111199"
            ]);
        });
    });
    describe('doesNodeHaveGenuineChildren', () => {
        const nodeWithOnlyPlaceholderChildren = getPscNodeFromTree(pscMockData.reallyBigTree, 'AA');
        const nodeWithMixedChildren = getPscNodeFromTree(pscMockData.reallyBigTree, 'AC');
        it('GENUINE: nodes w/ both genuine and placeholder children', () => {
            expect(doesNodeHaveGenuineChildren(nodeWithMixedChildren)).toEqual(true);
        });
        it('NOT GENUINE: nodes w/ only placeholder', () => {
            expect(doesNodeHaveGenuineChildren(nodeWithOnlyPlaceholderChildren)).toEqual(false);
        });
        it('NOT GENUINE: nodes w/ no children property', () => {
            expect(doesNodeHaveGenuineChildren({ test: 'this node doesnt even have a children property at all' })).toEqual(false);
        });
        it('NOT GENUINE: nodes w/ an empty children array', () => {
            expect(doesNodeHaveGenuineChildren({
                children: [],
                test: 'this node doesnt even have a children property at all'
            })).toEqual(false);
        });
    });
    describe('areChildrenPartial', () => {
        it('FULL CHILDREN: ', () => {
            const fullyPopulatedNode = {
                count: 7,
                children: getPscNodeFromTree(pscMockData.reallyBigTree, 'AC2').children
            };
            const nodeWithMixedChildren = getPscNodeFromTree(pscMockData.reallyBigTree, 'AC');
            
            expect(areChildrenPartial(nodeWithMixedChildren.count, nodeWithMixedChildren.children)).toEqual(true);
            expect(areChildrenPartial(fullyPopulatedNode.count, fullyPopulatedNode.children)).toEqual(false);
        });
        it('PARTIAL CHILDREN: ', () => {
            const nodeWithOnlyPlaceholderChildren = getPscNodeFromTree(pscMockData.reallyBigTree, 'AA');
            const nodeWithMixedChildren = getPscNodeFromTree(pscMockData.reallyBigTree, 'AC');
            expect(areChildrenPartial(nodeWithOnlyPlaceholderChildren.count, nodeWithOnlyPlaceholderChildren.children)).toEqual(true);
            expect(areChildrenPartial(nodeWithMixedChildren.count, nodeWithMixedChildren.children)).toEqual(true);
        });
    });
    describe('addPlaceholder', () => {
        it('recursively adds placeholders to partial children and partial grandchildren', () => {
            const nodeWithPartialChildren = getPscNodeFromTree(pscMockData.reallyBigTree, 'AC');

            const result = {
                ...nodeWithPartialChildren,
                children: addPlaceholder(nodeWithPartialChildren.children, nodeWithPartialChildren.value)
            };

            expect(result.children.length).toEqual(2);
            expect(result.children.find((child) => child.isPlaceHolder).isPlaceHolder).toEqual(true);

            const childWithPartialChildren = result.children.find((child) => child.value === 'AC2');
            expect(childWithPartialChildren.children.find((child) => child.isPlaceHolder).isPlaceHolder).toEqual(true);
        });
        it('does not add placeholders to grandchildren if they are fully populated', () => {
            const fullyPopulatedNode = {
                count: 7,
                value: '999',
                children: getPscNodeFromTree(pscMockData.reallyBigTree, 'AC2').children
            };
            const testNode = {
                count: 100,
                value: 'test',
                children: [
                    fullyPopulatedNode,
                    getPscNodeFromTree(pscMockData.reallyBigTree, 'AC21')
                ]
            };
            const result = addPlaceholder(testNode.children, testNode.value);

            expect(result.filter((child) => child.isPlaceHolder).length).toEqual(1);

            const grandChild = result.find((child) => child.value === '999');
            expect(grandChild.children.filter((grand) => grand.isPlaceHolder).length).toEqual(0);
        });
    });
});
