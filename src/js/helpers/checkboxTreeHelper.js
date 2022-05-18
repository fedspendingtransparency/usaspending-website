/*
  * checkboxTreeHelper.js
  * Created by Jonathan Hill 10/01/2019
*/

import { difference, cloneDeep, isEqual } from 'lodash';

export const doesMeetMinimumCharsRequiredForSearch = (str = '', charMinimum = 3) => (
    str &&
    str.length >= charMinimum
);

const getChildren = (node, keyMap) => {
    if (!node.children && keyMap.isParent(node)) {
        const value = node[keyMap.value]
            ? node[keyMap.value]
            : node.id || '';
        return {
            children: [{
                isPlaceHolder: true,
                label: 'Placeholder Child',
                value: `children_of_${value}`
            }]
        };
    }
    else if (node.children && node.children.length > 0) {
        return {
            children: node.children.map((child) => ({
                ...child,
                label: child[keyMap.label] || child.label || '',
                value: child[keyMap.value] || child.value || '',
                ...getChildren(child, keyMap)
            }))
        };
    }
    return {};
};
/**
 * @param {string} key
 * @param {Array.Object} codesWithCheckedAncestor
 * @param {Array.Object} nodes
 * @param {function} traverseTreeByCodeFn
 * @returns {number} the sum count of the given node's (represented by its key or node.value) descendants
*/
const getCountOfCheckedDescendants = (key, codesWithCheckedAncestor, nodes, traverseTreeByCodeFn) => {
    const hasCheckedDescendants = codesWithCheckedAncestor.some((obj) => obj.checkedAncestor === key);

    if (hasCheckedDescendants) {
        const nodesUnderPlaceholder = codesWithCheckedAncestor
            .filter((code) => code.checkedAncestor === key);
        const sumOfCheckedDescendants = nodesUnderPlaceholder
            .map((obj) => traverseTreeByCodeFn(nodes, obj.code))
            .reduce((agg, descendantToBeCounted) => {
                if (descendantToBeCounted.count === 0) {
                    return agg + 1;
                }
                return agg + descendantToBeCounted.count;
            }, 0);

        return sumOfCheckedDescendants;
    }
    return 0;
};

export const removePlaceholderString = (str) => {
    if (str.includes('children_of_')) return str.split('children_of_')[1];
    return str;
};

export const getAllDescendants = (node, blackList = []) => {
    if (blackList.includes(node.value)) return [];
    if (!node.children || node?.children?.length === 0) return [node.value];
    return [
        ...node.children
            .filter((child) => !blackList.includes(child.value))
            .reduce((acc, descendant) => ([...acc, ...getAllDescendants(descendant, blackList)]), [])
    ];
};

export const removeStagedFilter = (
    nodes,
    checkedNodes,
    removedNode,
    traverseTreeByCodeFn,
    getHighestAncestorFn,
    getImmediateAncestorFn
) => checkedNodes
    .filter((checked) => {
        const checkedNode = traverseTreeByCodeFn(nodes, removePlaceholderString(checked));
        if (getHighestAncestorFn(checkedNode) === removedNode) return false;
        if (getImmediateAncestorFn(checkedNode) === removedNode) return false;
        if (checkedNode.value === removedNode) return false;
        return true;
    });

export const getCountOfAllCheckedDescendants = (
    nodes,
    ancestorKey,
    checkedNodes,
    traverseTreeByCodeFn
) => checkedNodes
    .map((checked) => removePlaceholderString(checked))
    .filter((checkedNode) => checkedNode.includes(ancestorKey))
    .reduce((ancestorCount, checkedAncestor) => {
        const nodeCount = traverseTreeByCodeFn(nodes, checkedAncestor).count;
        if (nodeCount === 0) {
            return ancestorCount + 1;
        }
        return ancestorCount + nodeCount;
    }, 0);

const removeFromUnchecked = (
    checkedCode,
    unchecked,
    checked,
    nodes,
    traverseTreeByCodeFn,
    getImmediateAncestorFn,
    getHighestAncestorFn
) => {
    // we only want to remove from unchecked if...
    const key = checkedCode.includes('children_of_')
        ? checkedCode.split('children_of_')[1]
        : checkedCode;
    const currentNode = traverseTreeByCodeFn(nodes, key);
    const ancestorKey = getImmediateAncestorFn(currentNode);
    const parentKey = getHighestAncestorFn(currentNode);
    const parentNode = traverseTreeByCodeFn(nodes, parentKey);
    const ancestorNode = traverseTreeByCodeFn(nodes, ancestorKey);

    const uncheckedCodeToBeRemoved = unchecked
        .reduce((acc, uncheckedCode) => {
            if (uncheckedCode === checkedCode) {
                // (a) the unchecked array has the code/placeholder code we're currently checking.
                return checkedCode;
            }
            if (uncheckedCode === key) {
                // (a) applies here too.
                return key;
            }
            if (uncheckedCode === parentKey) {
                // (b) an ancestor of the code we're currently checking is in the unchecked array
                // AND the checked array has the other ancestors too.
                const sumOfCheckedDescendants = getCountOfAllCheckedDescendants(
                    nodes,
                    parentKey,
                    checked,
                    traverseTreeByCodeFn
                );
                if (sumOfCheckedDescendants === parentNode.count) {
                    return parentKey;
                }
            }

            if (uncheckedCode === ancestorKey) {
                // (b) applies here too
                const sumOfCheckedDescendants = getCountOfAllCheckedDescendants(
                    nodes,
                    ancestorKey,
                    checked,
                    traverseTreeByCodeFn
                );

                if (sumOfCheckedDescendants === ancestorNode.count) {
                    return ancestorKey;
                }
            }
            return acc;
        }, null);

    if (uncheckedCodeToBeRemoved) {
        return uncheckedCodeToBeRemoved;
    }
    return null;
};

export const decrementCountAndUpdateUnchecked = (
    uncheckedNode,
    unchecked,
    checked,
    counts,
    nodes,
    traverseTreeByCodeFn,
    getImmediateAncestorFn,
    getHighestAncestorFn
) => {
    const { value } = uncheckedNode;
    const nodeFromTree = traverseTreeByCodeFn(nodes, value);
    const parentKey = getHighestAncestorFn(nodeFromTree);
    const ancestorKey = getImmediateAncestorFn(nodeFromTree);
    const amountToDecrement = nodeFromTree.count > 0 ? nodeFromTree.count : 1;
    const shouldRemoveNode = counts.some((nodeFromCounts) => (
        !uncheckedNode.checked &&
        (
            (nodeFromCounts.value === value) ||
            (nodeFromCounts.count <= amountToDecrement && nodeFromCounts.value === parentKey)
        )
    ));
    let newCounts;
    if (shouldRemoveNode) {
        newCounts = counts.filter((nodeFromCounts) => nodeFromCounts.value !== parentKey);
    }
    else {
        newCounts = counts.map((nodeFromCounts) => {
            const newCount = nodeFromCounts.count - amountToDecrement;
            if (nodeFromCounts.value === parentKey) {
                return { ...nodeFromCounts, count: newCount };
            }
            return nodeFromCounts;
        });
    }
    // only update the unchecked array if...
    const shouldUpdateUnchecked = (
        (
        // (a): an ancestor of the unchecked node is checked
            checked.includes(parentKey) ||
            checked.includes(`children_of_${parentKey}`) ||
            checked.includes(ancestorKey) ||
            checked.includes(`children_of_${ancestorKey}`)
        ) && (
        // and (b): the unchecked node is not one of the highest ancestors.
            parentKey !== value
        )
    );

    const newUnchecked = shouldUpdateUnchecked
        ? [...unchecked, value]
        : unchecked;

    return [newCounts, newUnchecked];
};

// returns new counts array, newUnchecked array
export const incrementCountAndUpdateUnchecked = (
    newChecked,
    oldChecked,
    unchecked,
    nodes,
    currentCount,
    traverseTreeByCodeFn,
    getImmediateAncestorFn,
    getHighestAncestorFn
) => {
    const newlyChecked = difference(newChecked, oldChecked);
    const nodeTree = cloneDeep(nodes);
    const codesWithCheckedAncestor = [];
    const codesToBeRemovedFromUnchecked = [];

    newChecked
        .map((code) => removePlaceholderString(code))
        .forEach((code, i, arr) => {
            const node = traverseTreeByCodeFn(nodeTree, code);
            const immediateAncestorCode = getImmediateAncestorFn(node);
            const highestAncestorCode = getHighestAncestorFn(node);
            const isImmediateAncestorChecked = (
                immediateAncestorCode !== code &&
                arr.includes(immediateAncestorCode)
            );

            const isHighestAncestorChecked = (
                highestAncestorCode !== code &&
                arr.includes(highestAncestorCode)
            );
            if (node?.ancestors) {
                const checkedAncestors = node.ancestors.filter((ancestor) => arr.includes(ancestor));
                if (checkedAncestors.length > 0) {
                    // always use the nearest ancestor.
                    codesWithCheckedAncestor.push({ code, checkedAncestor: checkedAncestors.pop() });
                }
            }
            else if (isImmediateAncestorChecked) {
                codesWithCheckedAncestor.push({ code, checkedAncestor: immediateAncestorCode });
            }
            else if (isHighestAncestorChecked) {
                codesWithCheckedAncestor.push({ code, checkedAncestor: highestAncestorCode });
            }
        });

    const newCounts = [...new Set([...newlyChecked])]
        .reduce((newState, code) => {
            const key = removePlaceholderString(code);
            const currentNode = traverseTreeByCodeFn(nodeTree, key);
            const parentKey = getHighestAncestorFn(currentNode);
            const parentNode = traverseTreeByCodeFn(nodeTree, parentKey);

            // may need to remove this node or an ancestor node from the unchecked array
            const shouldCodeBeRemoved = removeFromUnchecked(
                code,
                unchecked,
                newChecked,
                nodeTree,
                traverseTreeByCodeFn,
                getImmediateAncestorFn,
                getHighestAncestorFn
            );
            if (shouldCodeBeRemoved) {
                codesToBeRemovedFromUnchecked.push(shouldCodeBeRemoved);
            }

            const indexInArray = newState.findIndex((node) => node.value === parentKey);
            const isParentInArray = indexInArray > -1;
            const countOfCheckedDescendants = getCountOfCheckedDescendants(key, codesWithCheckedAncestor, nodeTree, traverseTreeByCodeFn);
            const originalCount = currentNode.count === 0
                ? 1
                : currentNode.count;
            const amountToIncrement = originalCount - countOfCheckedDescendants;

            if (!isParentInArray) {
                newState.push({
                    label: parentNode.label,
                    value: parentNode.value,
                    count: amountToIncrement
                });
            }
            else if (isParentInArray) {
                // eslint-disable-next-line no-param-reassign
                newState[indexInArray].count += amountToIncrement;
            }
            if (isParentInArray && parentNode.count && parentNode.count < newState[indexInArray].count) {
                // eslint-disable-next-line no-param-reassign
                newState[indexInArray].count = parentNode.count;
            }
            else if (isParentInArray && newState[indexInArray].count < 1) {
                // eslint-disable-next-line no-param-reassign
                newState[indexInArray].count = 1;
            }
            return newState;
        }, [...currentCount]);
    return [
        newCounts,
        unchecked
            .filter((uncheckedNode) => {
                if (codesToBeRemovedFromUnchecked.includes(uncheckedNode)) {
                    return false;
                }
                return true;
            })
    ];
};

export const cleanTreeData = (nodes, keyMap) => nodes.map((node) => ({
    ...node,
    label: node[keyMap.label],
    value: node[keyMap.value],
    ...getChildren(node, keyMap)
}));


export const sortNodesByValue = (a, b) => {
    if (a.isPlaceHolder) return 1;
    if (b.isPlaceHolder) return -1;
    const nodeA = parseInt(a.value, 10);
    const nodeB = parseInt(b.value, 10);
    if (nodeA > nodeB) return 1;
    if (nodeB > nodeA) return -1;
    return 0;
};

// returns nodes that should go in the expanded array; meaning, no leaf nodes (as they have no reason to be considered expanded)
export const expandNodeAndAllDescendantParents = (nodes, propForNode = 'value', isNodeParentFn) => {
    const getValue = (acc, node) => {
        if (!isNodeParentFn(node)) return acc;
        acc.push(node[propForNode]);
        if (node.children) {
            acc.push(
                ...node.children.reduce(getValue, [])
            );
        }
        return acc;
    };

    return nodes
        .reduce(getValue, []);
};

export const doesNodeHaveGenuineChildren = (node) => (
    Object.keys(node).includes('children') &&
    node?.children?.length > 0 &&
    node.children.some((child) => !child.isPlaceHolder)
);

const removePlaceHolders = (children) => children.filter((child) => !child.isPlaceHolder);

export const areChildrenPartial = (count, children) => {
    if (!children) return false;
    const sumOfAllChildren = removePlaceHolders(children)
        .reduce((acc, child) => {
            const childCount = child.count || 1;
            return acc + childCount;
        }, 0);
    return sumOfAllChildren < count;
};

export const addChildrenAndPossiblyPlaceholder = (children, parent, hide = true) => {
    if (!children || !parent) return [];
    const hasGenuineGrandChildren = children.some((node) => doesNodeHaveGenuineChildren(node));
    const hasPlaceholderGrandChildren = children.some((child) => child?.children?.every((gc) => gc.isPlaceHolder));
    const placeHolderAlreadyExists = children.some((child) => child.isPlaceHolder);
    const isPlaceHolderNeeded = (
        areChildrenPartial(parent.count, children) &&
        !placeHolderAlreadyExists
    );

    if (isPlaceHolderNeeded && hasGenuineGrandChildren) {
        return children
            .map((child) => ({
                ...child,
                children: addChildrenAndPossiblyPlaceholder(child.children, child, hide)
            }))
            .concat([{
                isPlaceHolder: true,
                label: 'Child Placeholder',
                value: `children_of_${parent.value}`,
                className: hide ? 'hide' : ''
            }]);
    }
    if (isPlaceHolderNeeded) {
        return children.concat([{
            isPlaceHolder: true,
            label: 'Child Placeholder',
            value: `children_of_${parent.value}`,
            className: hide ? 'hide' : ''
        }]);
    }
    if (hasGenuineGrandChildren || hasPlaceholderGrandChildren) {
        return children
            .map((child) => ({
                ...child,
                children: addChildrenAndPossiblyPlaceholder(child.children, child, hide)
            }));
    }

    return children;
};

/**
 * NOTE: This fn is only used to populate the checkbox tree w/ search results. It handles the complexity of how to add new children w/o removing existing children or necessary placeholders to represent a partial tree
 * @wparam {<Object>} parentFromSearch an object representing part of the search results
 * @param {<Object>} existingParent an object representing the tree
 * @returns {Array.<Object>} a new array of Objects representing "merged" children constituting:
 * (a) the nodes from search results
 * (b) the pre-existing nodes not apart of search results that are hidden via the className obj property w/ the value "hide"
 * (c) placeholder nodes to represent the presence of partial children
*/
export const appendChildrenFromSearchResults = (parentFromSearch, existingParent) => {
    if (doesNodeHaveGenuineChildren(existingParent) && doesNodeHaveGenuineChildren(parentFromSearch)) {
        return parentFromSearch.children
            .reduce((acc, searchChild) => {
                const existingChildIndex = acc.findIndex((existingChild) => existingChild.value === searchChild.value);
                const childAlreadyExists = existingChildIndex !== -1;
                if (childAlreadyExists) {
                    const existingChild = acc[existingChildIndex];
                    // Show child if they are in the search results.
                    const existingChildHasRealChildren = doesNodeHaveGenuineChildren(existingChild);

                    if (existingChildHasRealChildren) {
                        return acc.map((node) => {
                            if (node.value === searchChild.value) {
                                return {
                                    ...existingChild,
                                    className: '',
                                    children: appendChildrenFromSearchResults(searchChild, existingChild)
                                };
                            }
                            return node;
                        });
                    }
                    else if (!existingChildHasRealChildren) {
                        // No existingChild to hide, just add it.
                        return acc.map((node) => {
                            if (node.value === searchChild.value) {
                                return {
                                    ...node,
                                    className: '',
                                    children: addChildrenAndPossiblyPlaceholder(searchChild.children, searchChild, true)
                                };
                            }
                            return node;
                        });
                    }
                    return acc;
                }

                // child from search is completely new, but not fully populated, add it w/ a placeholder.
                return acc.concat([{
                    ...searchChild,
                    children: addChildrenAndPossiblyPlaceholder(searchChild.children, searchChild, true)
                }]);
            }, existingParent
                .children
                .map((node) => ({ ...node, className: 'hide' })));
    }
    else if (doesNodeHaveGenuineChildren(existingParent) && !doesNodeHaveGenuineChildren(parentFromSearch)) {
        return addChildrenAndPossiblyPlaceholder(
            existingParent.children.map((child) => ({ ...child, className: 'hide' })),
            existingParent,
            true
        );
    }
    else if (!doesNodeHaveGenuineChildren(existingParent) && doesNodeHaveGenuineChildren(parentFromSearch)) {
        return addChildrenAndPossiblyPlaceholder(parentFromSearch.children, parentFromSearch);
    }
    else if (areChildrenPartial(existingParent.count, parentFromSearch.children)) {
        return addChildrenAndPossiblyPlaceholder(parentFromSearch.children, parentFromSearch);
    }
    return [];
};

/**
 * NOTE: This fn is only used to populate the checkbox tree w/ search results. It is not used to populate the tree from a dynamic expand from the user traversing the tree manually.
 * @param tree an array of objects
 * @param searchResults the code/value/id of the tree branch to populate
 * @param traverseTreeByCodeFn a fn used to get any node in the tree by the code/value/id of the node
 * @param sortNodes a fn used to sort the nodes after they've been added
 * @returns a new array of objects with the newNodes appended to the right place
*/
export const addSearchResultsToTree = (
    tree,
    searchResults,
    traverseTreeByCodeFn,
    sortNodes = sortNodesByValue
) => {
    const nodesFromSearchToBeReplaced = searchResults.map((node) => node.value);
    return tree
        .map((existingNode) => {
            const nodeKey = existingNode.value;
            if (nodesFromSearchToBeReplaced.includes(nodeKey)) {
                const nodeFromSearch = searchResults.find((node) => node.value === nodeKey);
                return {
                    ...nodeFromSearch,
                    children: appendChildrenFromSearchResults(nodeFromSearch, existingNode, traverseTreeByCodeFn)
                };
            }
            return { ...existingNode, className: 'hide' };
        })
        .sort(sortNodes);
};
/**
 * NOTE: This fn is only used to populate the checkbox tree on expand. It is not used to populate the tree with search results.
 * @param tree an array of objects
 * @param key the code/value/id of the tree branch to populate
 * @param newNodes the branch/leaf nodes
 * @param getHighestAncestorCode a fn used to get the highest ancestor of any node in the tree
 * @param traverseTreeByCodeFn a fn used to get any node in the tree by the code/value/id of the node
 * @returns a new array of objects with the newNodes appended to the right place
*/
export const populateChildNodes = (
    tree,
    key = '',
    newNodes = [],
    getHighestAncestorCode,
    getImmediateAncestorCode,
    traverseTreeByCodeFn
) => {
    // 1. add nodes to either branch (recursive) or leaf level of tree
    // 2. when adding nodes, don't remove any existing children that aren't placeholders as they are assumed to have and likely do have children of their own from search.
    const nodeWithNewChildren = key ? traverseTreeByCodeFn(tree, key) : '';
    const immediateAncestorCode = nodeWithNewChildren
        ? getImmediateAncestorCode(nodeWithNewChildren)
        : getImmediateAncestorCode(key);
    const highestAncestorCode = nodeWithNewChildren
        ? getHighestAncestorCode(nodeWithNewChildren)
        : getHighestAncestorCode(key);
    return tree.map((node) => {
        const [data] = newNodes;
        const shouldPopulateChildren = node.value === key;
        const shouldPopulateGrandChildren = (
            node.value === immediateAncestorCode ||
            node.value === highestAncestorCode
        );
        if (shouldPopulateChildren) {
            // we're populating an immediate descendant of the top-tier parent; AKA a "branch".
            return {
                ...node,
                children: data.children
                    .map((child) => {
                        const existingChild = node.children.find((olderChild) => olderChild.value === child.value);
                        const weHaveTheGrandChildren = (
                            existingChild &&
                            !areChildrenPartial(existingChild?.count, existingChild?.children)
                        );
                        const weHaveAtLeastOneGrandChild = (
                            existingChild &&
                            existingChild?.children?.filter((grand) => !grand.isPlaceHolder)?.length > 0
                        );
                        if (weHaveTheGrandChildren) {
                            return {
                                ...child,
                                children: existingChild.children
                                    ? existingChild.children
                                        .map((grand) => ({ ...grand, className: '' }))
                                        .sort(sortNodesByValue)
                                    : []
                            };
                        }
                        if (weHaveAtLeastOneGrandChild) {
                            return {
                                ...child,
                                children: [
                                    ...child.children,
                                    ...existingChild.children.filter((grand) => (!grand.isPlaceHolder))
                                ].sort(sortNodesByValue)
                            };
                        }
                        return child;
                    }).sort(sortNodesByValue)
            };
        }
        if (shouldPopulateGrandChildren) {
            return {
                ...node,
                className: '',
                children: populateChildNodes(
                    node.children,
                    key,
                    newNodes,
                    getHighestAncestorCode,
                    getImmediateAncestorCode,
                    traverseTreeByCodeFn
                )
            };
        }
        const shouldAddNewBranchToTree = (
            key &&
            data &&
            node.value === highestAncestorCode &&
            !node.children.some((child) => child.value === key)
        );
        if (shouldAddNewBranchToTree) {
            // top-tier parent only has a placeholder child and we're adding this branch on the fly from a url-hash.
            return {
                ...node,
                className: '',
                children: [
                    // leave the placeholder b/c we're only adding one child!
                    ...node.children,
                    data
                ]
            };
        }
        return node;
    });
};

export const autoCheckImmediateChildrenAfterDynamicExpand = (
    parentNode,
    checked,
    unchecked,
    keyForCode,
    shouldNodeHaveChildren
) => {
    const value = parentNode[keyForCode];
    // deselect placeholder values for node!
    const removeParentPlaceholders = checked
        .filter((code) => !code.includes(`children_of_${value}`));

    const newValues = parentNode
        .children
    // does unchecked have placeholders...?
        .filter((child) => !unchecked.includes(child[keyForCode]))
        .map((child) => {
            // at child level, check all grand children w/ the placeholder
            const willNodeHavePlaceholderChildren = (
                (
                    !Object.keys(child).includes('children') ||
                    !child?.children?.length ||
                    child?.children.some((grand) => grand.isPlaceHolder)
                ) &&
                shouldNodeHaveChildren(child)
            );
            if (willNodeHavePlaceholderChildren) {
                return `children_of_${child[keyForCode]}`;
            }
            return child[keyForCode];
        });

    return [...new Set([...removeParentPlaceholders, ...newValues])];
};

export const showAllNodes = (tree) => tree
    .map((node) => ({
        ...node,
        className: '',
        children: node.children
            ? showAllNodes(node.children)
            : []
    }))
    .sort(sortNodesByValue);
/**
 * @param checkedAncestorPaths 2d array, each item an ancestryPath with the last item in the array representing a checkedNode; ie, [[11, 1111, 111110]] to represented checked state for 111110
 * @param uncheckedAncestorPaths same as @param checkedAncestorPaths except for unchecked nodes
 * @returns a sorted list of unique ancestor paths delimited by a '/' to be used in an API call
 */
export const getUniqueAncestorPaths = (
    checkedAncestorPaths,
    uncheckedAncestorPaths = []
) => checkedAncestorPaths.concat(uncheckedAncestorPaths)
    .reduce((listOfUniqueAncestors, ancestryPath) => {
    // we don't need to fetch the last item of the array because we only need the *ancestors* of the ancestorPaths.
        const numberOfAncestors = ancestryPath.length === 1
            ? 1
            : ancestryPath.length - 1;
        const uniqueAncestors = [...new Array(numberOfAncestors)]
            .reduce((ancestors, _, i) => {
                const currentAncestor = ancestryPath[i];
                // already have this ancestor, move to the next.
                if (i === 0 && listOfUniqueAncestors.includes(currentAncestor)) {
                    return ancestors;
                }
                // top level ancestor does not exist, add it and move to the next.
                if (i === 0 && !listOfUniqueAncestors.includes(currentAncestor)) {
                    return ancestors.concat([currentAncestor]);
                }

                // ancestor string like parentX/parentY/parentZ
                const ancestorString = [...new Array(i + 1)]
                    .reduce((str, __, index) => {
                        if (index === 0) {
                            return `${ancestryPath[index]}`;
                        }
                        return `${str}/${ancestryPath[index]}`;
                    }, '');

                if (listOfUniqueAncestors.includes(ancestorString)) return ancestors;

                return ancestors.concat([ancestorString]);
            }, []);

        return listOfUniqueAncestors.concat(uniqueAncestors);
    }, [])
    .sort((param1, param2) => {
        const a = param1.split('/').length;
        const b = param2.split('/').length;
        // smaller the length, the higher up on the tree. Fetch the highest nodes first.
        if (b > a) return -1;
        if (a > b) return 1;
        return 0;
    });

export const getAncestryPathOfNodes = (checked, nodes, traverseTreeByCodeFn) => [
    ...new Set(
        checked.map((code) => removePlaceholderString(code))
    )]
    .map((code) => traverseTreeByCodeFn(nodes, code))
    .map((node) => ([...node.ancestors, node.value]));

export const trimCheckedToCommonAncestors = (arrayOfAncestryPaths) => arrayOfAncestryPaths
    .sort((a, b) => a.length - b.length)
    .reduce((leanArrayOfAncestryPaths, ancestryPath) => {
        const ancestorsForCheckedDescendant = ancestryPath.slice(0, ancestryPath.length - 1);
        const isSomeAncestorAlreadyChecked = ancestorsForCheckedDescendant
            .some((ancestor, i, listOfAncestors) => leanArrayOfAncestryPaths.some((arr) => (
                isEqual(arr, [ancestor]) ||
                isEqual(arr, listOfAncestors.slice(0, i + 1)) ||
                isEqual(arr, listOfAncestors)
            )));
        if (isSomeAncestorAlreadyChecked) {
            return leanArrayOfAncestryPaths;
        }
        return leanArrayOfAncestryPaths.concat([ancestryPath]);
    }, []);

export const setNodes = (key, nodes, treeName, cleanNodesFn) => ({
    type: `SET_${treeName}_NODES`,
    key,
    payload: cleanNodesFn(nodes)
});

export const showTree = (treeName) => ({
    type: `SHOW_${treeName}_TREE`
});

export const setExpanded = (expanded, type = 'SET_EXPANDED', treeName) => ({
    type: `${type}_${treeName}`,
    payload: expanded
});

export const addChecked = (nodeValue, treeName) => ({
    type: `ADD_CHECKED_${treeName}`,
    payload: nodeValue
});

export const setChecked = (nodes, treeName) => ({
    type: `SET_CHECKED_${treeName}`,
    payload: nodes
});

export const setUnchecked = (nodes, treeName) => ({
    type: `SET_UNCHECKED_${treeName}`,
    payload: nodes
});

export const setSearchedNodes = (nodes, treeName, cleanNodesFn) => ({
    type: `SET_SEARCHED_${treeName}`,
    payload: cleanNodesFn(nodes)
});

export const setCounts = (newCounts, treeName) => ({
    type: `SET_${treeName}_COUNTS`,
    payload: newCounts
});
