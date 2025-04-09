/**
 * @jest-environment jsdom
 */
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
    addChildrenAndPossiblyPlaceholder,
    areChildrenPartial,
    getUniqueAncestorPaths,
    trimCheckedToCommonAncestors,
    doesMeetMinimumCharsRequiredForSearch
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
    cleanPscData,
    getPscAncestryPathForChecked
} from 'helpers/pscHelper';
import { isEqual } from 'lodash';

import * as mockData from '../containers/search/filters/naics/mockNAICS';
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
        it('respects the blacklist', () => {
            const mock = getPscNodeFromTree(pscMockData.reallyBigTree, 'Research and Development');
            const result = getAllDescendants(mock, ['AC']);
            expect(result).toEqual([
                "children_of_AA",
                "children_of_AB",
                "children_of_AD",
                "children_of_AE",
                "children_of_AF",
                "children_of_AG",
                "children_of_AH",
                "children_of_AJ",
                "children_of_AK",
                "children_of_AL",
                "children_of_AM",
                "children_of_AN",
                "children_of_AP",
                "children_of_AQ",
                "children_of_AR",
                "children_of_AS",
                "children_of_AT",
                "children_of_AU",
                "children_of_AV",
                "children_of_AZ"
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
        it('adds a placeholder for nodes without all children if they don\'t have it (PSC Depth)', () => {
            const existingNodes = cleanPscData(pscMockData.topTierResponse.results);
            const searchResults = addSearchResultsToTree(existingNodes, [pscMockData.reallyBigTree[0]], getPscNodeFromTree);
            const secondTierWithPlaceholder = getPscNodeFromTree(searchResults, 'AA');
            const secondTierWithPartialChildrenAndPlaceholder = getPscNodeFromTree(searchResults, 'AC');
            const thirdTierWithPartialResultsAndPlaceholder = getPscNodeFromTree(searchResults, 'AC2');
            expect(secondTierWithPlaceholder.children[0].isPlaceHolder).toEqual(true);
            expect(secondTierWithPartialChildrenAndPlaceholder.children.some((node) => node.isPlaceHolder)).toEqual(true);
            expect(thirdTierWithPartialResultsAndPlaceholder.children.some((node) => node.isPlaceHolder)).toEqual(true);
        });
        it('adds a placeholder for nodes without zero children if they should have them', () => {
            const existingNodes = cleanPscData(pscMockData.topTierResponse.results);
            const topTierSearchResponseWithNoMatchingChildren = [{
                ...pscMockData.topTierResponse.results[0],
                children: []
            }];
            const searchResults = addSearchResultsToTree(existingNodes, topTierSearchResponseWithNoMatchingChildren, getPscNodeFromTree);
            const topTierNode = getPscNodeFromTree(searchResults, 'Research and Development');

            expect(topTierNode.children[0].isPlaceHolder).toEqual(true);

            // same test where the existingNodes have children
            const existingNodesWithChildren = cleanPscData(pscMockData.reallyBigTree);
            const searchResult = [{ ...pscMockData.topTierResponse.results[0], children: [] }];
            const result = addSearchResultsToTree(existingNodesWithChildren, searchResult, getPscNodeFromTree);
            const node = getPscNodeFromTree(result, 'Research and Development');

            expect(node.children.every((child) => child.className === 'hide')).toEqual(true);
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
        it('does not add to the unchecked array when the unchecked node is one of the highest ancestors', async () => {
            const [counts, newUnchecked] = decrementCountAndUpdateUnchecked(
                { checked: false, value: "11" },
                [],
                ["children_of_11"],
                [{ value: '11', count: 64 }],
                mockData.treeWithPlaceholdersAndRealData,
                getNaicsNodeFromTree,
                getImmediateAncestorNaicsCode,
                getHighestAncestorNaicsCode
            );

            expect(counts.length).toEqual(0);
            expect(newUnchecked.length).toEqual(0);
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
    describe('addChildrenAndPossiblyPlaceholder', () => {
        it('recursively adds placeholders to both partial children and partial grandchildren', () => {
            const nodeWithPartialChildren = getPscNodeFromTree(pscMockData.reallyBigTree, 'AC');

            const result = {
                ...nodeWithPartialChildren,
                children: addChildrenAndPossiblyPlaceholder(nodeWithPartialChildren.children, nodeWithPartialChildren)
            };

            expect(result.children.length).toEqual(2);
            expect(result.children.find((child) => child.isPlaceHolder).isPlaceHolder).toEqual(true);

            const childWithPartialChildren = result.children.find((child) => child.value === 'AC2');
            expect(childWithPartialChildren.children.find((child) => child.isPlaceHolder).isPlaceHolder).toEqual(true);
        });
        it('but does not add placeholders to fully populated children or grandchildren', () => {
            const fullyPopulatedNode = {
                count: 7,
                value: '999',
                children: getPscNodeFromTree(pscMockData.reallyBigTree, 'AC2').children
            };
            const partiallyPopulatedNode = getPscNodeFromTree(pscMockData.reallyBigTree, 'AC');
            const nodeWithFullyPopulatedGrandChild = {
                count: 1000000,
                value: 'test',
                children: [
                    fullyPopulatedNode,
                    partiallyPopulatedNode
                ]
            };
            const result = addChildrenAndPossiblyPlaceholder(nodeWithFullyPopulatedGrandChild.children, nodeWithFullyPopulatedGrandChild);
            // Not really part of the test, but this node I just created is partial so it has a placeholder.
            expect(result.filter((child) => child.isPlaceHolder).length).toEqual(1);

            const popoulatedChild = result.find((child) => child.value === '999');
            const partialChild = result.find((child) => child.value === 'AC');

            expect(popoulatedChild.children.filter((child) => child.isPlaceHolder).length).toEqual(0);
            expect(partialChild.children.find((child) => child.isPlaceHolder).isPlaceHolder).toEqual(true);
        });
    });
    describe('getUniqueAncestorPaths', () => {
        it('returns each ancestor path only once', () => {
            const result = getUniqueAncestorPaths([
                ['Products', '10', '1000'],
                ['Products', '10', '1001'],
                ['Products', '10', '1002'],
                ['Products', '10', '1003'],
                ['Products', '10', '1004']
            ]);
            expect(result).toEqual(['Products', 'Products/10']);
        });
        it('returns an array of sorted paths, the highest tier coming first', () => {
            const result = getUniqueAncestorPaths([
                ['Products'],
                ['Products', '10', '1000'],
                ['Products', '10', '1001'],
                ['Products', '10', '1002'],
                ['Products', '10', '1003'],
                ['Products', '10', '1004'],
                ['Service', 'B'],
                ['Service', 'B', 'B5'],
                ['Service', 'B', 'B5', 'B516']
            ]);
            expect(result).toEqual(['Products', 'Service', 'Products/10', 'Service/B', 'Service/B/B5']);
        });
        it('also returns the ancestor path required for the unchecked array', () => {
            const result = getUniqueAncestorPaths(
                [
                    ['Products'],
                    ['Products', '10', '1000'],
                    ['Products', '10', '1001'],
                    ['Products', '10', '1002'],
                    ['Products', '10', '1003'],
                    ['Products', '10', '1004'],
                    ['Service', 'B'],
                    ['Service', 'B', 'B5'],
                    ['Service', 'B', 'B5', 'B516']
                ],
                [
                    ['Research and Development', 'AA', 'AA9', 'AA91']
                ]
            );
            expect(result).toEqual([
                'Products',
                'Service',
                'Research and Development',
                'Products/10',
                'Service/B',
                'Research and Development/AA',
                'Service/B/B5',
                'Research and Development/AA/AA9'
            ]);
        });
        it('if the path has only one item, return it', () => {
            const result = getUniqueAncestorPaths([
                ['Products'],
                ['Research and Development'],
                ['Service']
            ]);
            expect(result).toEqual([
                'Products',
                'Research and Development',
                'Service'
            ]);
        });
    });
    describe('getAncestryPathOfNodes', () => {
        it('gives you a 2d array representing the ancestry path each node in the source array', () => {
            const result = getPscAncestryPathForChecked([
                'Research and Development',
                'AA',
                'Product',
                '10',
                'D316'
            ], pscMockData.reallyBigTree);

            expect(result).toEqual([
                ['Research and Development'],
                ['Research and Development', 'AA'],
                ['Product'],
                ['Product', '10'],
                ['Service', 'D', 'D3', 'D316']
            ]);
        });
        it('removes duplicates and placeholder strings', () => {
            const result = getPscAncestryPathForChecked([
                'Research and Development',
                'children_of_Research and Development',
                'AA',
                'AA',
                'Product',
                'children_of_Product',
                '10',
                'D316'
            ], pscMockData.reallyBigTree);

            expect(result).toEqual([
                ['Research and Development'],
                ['Research and Development', 'AA'],
                ['Product'],
                ['Product', '10'],
                ['Service', 'D', 'D3', 'D316']
            ]);
        });
    });
    describe('trimCheckedToCommonAncestors', () => {
        it('removes items that share a common ancestor', () => {
            const initialArray = [
                ['Product', '10'],
                ['Product', '11'],
                ['Product', '12'],
                ['Product', '13'],
                ['Product', '14'],
                ['Product', '15'],
                ['Product', '16'],
                ['Product', '17'],
                ['Product'],
                ['Service', 'D', 'D3', 'D316'],
                ['Service', 'D', 'D3', 'D317'],
                ['Service', 'D', 'D3', 'D318'],
                ['Service', 'D', 'D3', 'D319'],
                ['Service', 'D', 'D3', 'D320'],
                ['Service', 'D', 'D3', 'D330'],
                ['Service', 'D', 'D3', 'D340'],
                ['Service', 'D', 'D3']
            ];
            const leanArray = trimCheckedToCommonAncestors(initialArray);
            expect(leanArray.length).toEqual(2);
            expect(leanArray).toEqual([['Product'], ['Service', 'D', 'D3']]);
        });
        it('keeps items with no common ancestor', () => {
            const initialArray = [
                ['Product', '10'],
                ['Product', '11'],
                ['Product', '12'],
                ['Product', '13'],
                ['Product', '14'],
                ['Product', '15'],
                ['Product', '16'],
                ['Product', '17'],
                ['Product'],
                ['Service', 'D', 'D3', 'D316'],
                ['Service', 'D', 'D3', 'D317'],
                ['Service', 'D', 'D3', 'D318'],
                ['Service', 'D', 'D3', 'D319'],
                ['Service', 'D', 'D3', 'D320'],
                ['Service', 'D', 'D3', 'D330'],
                ['Service', 'D', 'D3'],
                ['Service', 'D', 'D3', 'D340'],
                ['Service', 'B', 'B5', 'B503'],
                ['Service', 'B', 'B5', 'B504'],
                ['Service', 'B', 'B5'],
                ['Research and Development', 'AA', 'AA09'],
                ['Research and Development', 'AA', 'AA10'],
                ['Research and Development', 'AA'],
                ['Research and Development', 'AB', 'AB05'],
                ['Research and Development', 'AB', 'AB06']
            ];
            const leanArray = trimCheckedToCommonAncestors(initialArray);
            expect(leanArray.length).toEqual(6);
            const expectedArray = [
                ['Product'],
                ['Research and Development', 'AA'],
                // "AB" ancestor not included, so it includes the partial list of 'AB's descendants.
                ['Research and Development', 'AB', 'AB06'],
                ['Research and Development', 'AB', 'AB05'],
                ['Service', 'B', 'B5'],
                ['Service', 'D', 'D3']
            ];
            expectedArray.forEach((arr) => {
                const result = leanArray.some((expectedArr) => isEqual(arr, expectedArr));
                expect(result).toEqual(true);
            });
        });
        it('handles arrays with a length of one', () => {
            const initialArray = [
                ['Research and Development']
            ];
            const leanArray = trimCheckedToCommonAncestors(initialArray);
            expect(leanArray.length).toEqual(1);
            expect(leanArray).toEqual([['Research and Development']]);
        });
    });
    describe('doesMeetMinimumCharsRequiredForSearch', () => {
        const mockFalse = doesMeetMinimumCharsRequiredForSearch('ab');
        const mockTrue = doesMeetMinimumCharsRequiredForSearch('abc');
        expect(mockFalse).toEqual(false);
        expect(mockTrue).toEqual(true);
    });
});

