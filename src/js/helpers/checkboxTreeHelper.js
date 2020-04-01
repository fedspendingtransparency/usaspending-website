/**
  * checkboxTreeHelper.js
  * Created by Jonathan Hill 10/01/2019
**/
import { difference, cloneDeep } from 'lodash';

const getChildren = (node, keyMap) => {
    if (!node.children && keyMap.isParent(node)) {
        return {
            children: [{
                isPlaceHolder: true,
                label: 'Placeholder Child',
                value: `children_of_${node[keyMap.value]}`
            }]
        };
    }
    else if (node.children && node.children.length > 0) {
        return {
            children: node.children.map((child) => ({
                ...child,
                label: child[keyMap.label],
                value: child[keyMap.value],
                ...getChildren(child, keyMap)
            }))
        };
    }
    return {};
};

export const getHighestAncestorNaicsCode = (naicsCode) => `${naicsCode[0]}${naicsCode[1]}`;

export const getImmediateAncestorNaicsCode = (naicsCode) => {
    if (naicsCode.length === 2) return naicsCode;
    else if (naicsCode.length === 4) return getHighestAncestorNaicsCode(naicsCode);
    return `${naicsCode[0]}${naicsCode[1]}${naicsCode[2]}${naicsCode[3]}`;
};

export const getNodeFromTree = (tree, nodeKey, treePropForKey = 'value') => {
    const parentKey = getHighestAncestorNaicsCode(nodeKey);
    const ancestorKey = getImmediateAncestorNaicsCode(nodeKey);
    if (nodeKey.length === 2) {
        return tree
            .find((node) => node[treePropForKey] === nodeKey);
    }
    if (nodeKey.length === 4) {
        return tree
            .find((node) => node[treePropForKey] === parentKey)
            ?.children
            .find((node) => node[treePropForKey] === nodeKey);
    }
    if (nodeKey.length === 6) {
        return tree
            .find((node) => node[treePropForKey] === parentKey)
            ?.children
            .find((node) => node[treePropForKey] === ancestorKey)
            ?.children
            .find((node) => node[treePropForKey] === nodeKey);
    }
    return { count: null };
};

export const getTasNodeFromTree = (tree, id) => {
    let selectedNode;
    tree
        .forEach((agency) => {
            if (agency.value === id) selectedNode = agency;
        });
    if (selectedNode) return selectedNode;
    tree
        .forEach((agency) => {
            if (agency.children) {
                agency.children
                    .forEach((federalAccount) => {
                        if (federalAccount.value === id) selectedNode = federalAccount;
                    });
            }
        });
    if (selectedNode) return selectedNode;
    tree
        .forEach((agency) => {
            if (agency.children) {
                agency.children
                    .forEach((federalAccount) => {
                        if (federalAccount.children) {
                            federalAccount.children
                                .forEach((tas) => {
                                    if (tas.value === id) selectedNode = tas;
                                });
                        }
                    });
            }
        });
    return selectedNode;
};

const getCountWithPlaceholderOffset = (key, codesUnderPlaceholder, nodes) => {
    // when the placeholder is counted, adjust the count to offset for the 'nodes under this placeholder' which will be counted.
    const hasSelectedButNotCounted = codesUnderPlaceholder.some((obj) => obj.placeholder === key);

    if (hasSelectedButNotCounted) {
        const nodesUnderPlaceholder = codesUnderPlaceholder
            .filter((code) => code.placeholder === key);
        const aggregateOffsetOfNodesUnderPlaceholder = nodesUnderPlaceholder
            .map((obj) => getTasNodeFromTree(nodes, obj.code))
            .reduce((agg, nodeTobeCounted) => {
                if (nodeTobeCounted.count === 0) {
                    return agg + 1;
                }
                return agg + nodeTobeCounted.count;
            }, 0);

        return aggregateOffsetOfNodesUnderPlaceholder;
    }
    return 0;
};

export const removePlaceholderString = (str) => {
    if (str.includes('children_of_')) return str.split('children_of_')[1];
    return str;
};

export const getCountOfAllCheckedDescendants = (nodes, ancestorKey, checkedNodes) => checkedNodes
    .map((checked) => removePlaceholderString(checked))
    .filter((checkedNode) => checkedNode.includes(ancestorKey))
    .reduce((ancestorCount, checkedAncestor) => {
        const nodeCount = getTasNodeFromTree(nodes, checkedAncestor).count;
        if (nodeCount === 0) {
            return ancestorCount + 1;
        }
        return ancestorCount + nodeCount;
    }, 0);

const removeFromUnchecked = (checkedCode, unchecked, checked, nodes) => {
    // we only want to remove from unchecked if...
    const key = checkedCode.includes('children_of_')
        ? checkedCode.split('children_of_')[1]
        : checkedCode;
    const currentNode = getTasNodeFromTree(nodes, key);
    const ancestorKey = currentNode.ancestors[currentNode.ancestors.length - 1];
    const parentKey = currentNode.ancestors[0];
    const parentNode = getTasNodeFromTree(nodes, parentKey);
    const ancestorNode = getTasNodeFromTree(nodes, ancestorKey);
    const { count } = currentNode;

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
                const countOfCheckedNode = count === 0 ? 1 : count;
                const countOfCheckedAncestors = getCountOfAllCheckedDescendants(nodes, parentKey, checked);
                if ((countOfCheckedAncestors + countOfCheckedNode) === parentNode.count) {
                    return parentKey;
                }
            }
            if (uncheckedCode === ancestorKey) {
                // (b) applies here too
                const countOfCheckedNode = count === 0 ? 1 : count;
                const countOfCheckedAncestors = getCountOfAllCheckedDescendants(nodes, ancestorKey, checked);
                if ((countOfCheckedAncestors + countOfCheckedNode) === ancestorNode.count) {
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

export const decrementCountUpdateUnchecked = (
    uncheckedNode,
    unchecked,
    checked,
    counts,
    nodes,
    traverseTreeByCodeFn
) => {
    const { value } = uncheckedNode;
    const nodeFromTree = traverseTreeByCodeFn(nodes, value);
    const parentKey = nodeFromTree.ancestors[0] || value;
    const ancestorKey = nodeFromTree.ancestors[1];
    const count = nodeFromTree.count ? nodeFromTree.count : 1;
    const shouldRemoveNode = counts.some((nodeFromCounts) => (
        !uncheckedNode.checked &&
        (nodeFromCounts.value === value || nodeFromCounts.count <= count)
    ));
    let newCounts;
    if (shouldRemoveNode) {
        newCounts = counts.filter((nodeFromCounts) => nodeFromCounts.value !== parentKey);
    }
    else {
        newCounts = counts.map((nodeFromCounts) => {
            const newCount = nodeFromCounts.count - count;
            if (nodeFromCounts.value === parentKey) {
                return { ...nodeFromCounts, count: newCount };
            }
            return nodeFromCounts;
        });
    }
    // we only update the unchecked array if an ancestor of the unchecked node is checked
    const shouldUpdateUnchecked = (
        checked.includes(parentKey) ||
        checked.includes(`children_of_${parentKey}`) ||
        checked.includes(ancestorKey) ||
        checked.includes(`children_of_${ancestorKey}`)
    );

    const newUnchecked = shouldUpdateUnchecked
        ? [...unchecked, value]
        : unchecked;

    return [newCounts, newUnchecked];
};

export const decrementTasCountAndUpdateUnchecked = (
    uncheckedNode,
    unchecked,
    checked,
    counts,
    nodes) => decrementCountUpdateUnchecked(uncheckedNode, unchecked, checked, counts, nodes, getTasNodeFromTree);

// returns new counts array, newUnchecked array
export const getNewCountsAndUnchecked = (
    newChecked,
    oldChecked,
    unchecked,
    nodes,
    currentCount,
    traverseTreeByCode
) => {
    // debugger;
    const newlyChecked = difference(newChecked, oldChecked);
    const nodeTree = cloneDeep(nodes);

    // child place holders reflect the count of their immediate ancestor
    const placeHoldersToBeCounted = newChecked
        .filter((node) => node.includes('children_of_'));

    const codesUnderPlaceholder = [];
    const codesWithoutPlaceholder = [];
    const codesToBeRemovedFromUnchecked = [];

    newChecked
        .filter((code) => !code.includes('children_of_'))
        .forEach((code) => {
            const node = traverseTreeByCode(nodeTree, code);
            const immediateAncestorCode = node.ancestors[node.ancestors.length - 1];
            const highestAncestorCode = node.ancestors[0];
            if (placeHoldersToBeCounted.includes(`children_of_${immediateAncestorCode}`)) {
                codesUnderPlaceholder.push({ code, placeholder: immediateAncestorCode });
            }
            else if (placeHoldersToBeCounted.includes(`children_of_${highestAncestorCode}`)) {
                codesUnderPlaceholder.push({ code, placeholder: highestAncestorCode });
            }
            else if (placeHoldersToBeCounted.includes(`children_of_${code}`)) {
                codesUnderPlaceholder.push({ code, placeholder: code });
            }
            else {
                codesWithoutPlaceholder.push(code);
            }
        });

    const newCounts = [...new Set([...newlyChecked])]
        .reduce((newState, code) => {
            const isPlaceholder = code.includes('children_of_');
            const key = isPlaceholder
                ? code.split('children_of_')[1]
                : code;
            
            const currentNode = traverseTreeByCode(nodeTree, key);
            const parentKey = currentNode.ancestors[0];
            const parentNode = traverseTreeByCode(nodeTree, parentKey);

            // may need to remove this node or an ancestor node from the unchecked array
            const shouldCodeBeRemoved = removeFromUnchecked(code, unchecked, newChecked, nodeTree);
            if (shouldCodeBeRemoved) {
                codesToBeRemovedFromUnchecked.push(shouldCodeBeRemoved);
            }

            const indexInArray = newState.findIndex((node) => node.value === parentKey);
            const isParentInArray = indexInArray > -1;

            const offsetCount = getCountWithPlaceholderOffset(key, codesUnderPlaceholder, nodeTree);
            const originalCount = currentNode.count === 0
                ? 1
                : currentNode.count;
            const amountToIncrement = originalCount - offsetCount;

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

    return [newCounts, codesToBeRemovedFromUnchecked];
};

export const getNewTasCountsAndUncheckedNodes = (
    newChecked,
    oldChecked,
    unchecked,
    nodes,
    currentCount
) => getNewCountsAndUnchecked(newChecked, oldChecked, unchecked, nodes, currentCount, getTasNodeFromTree);

export const getNewNaicsCountsAndUncheckedNodes = (
    newChecked,
    oldChecked,
    unchecked,
    nodes,
    currentCount
) => getNewCountsAndUnchecked(newChecked, oldChecked, unchecked, nodes, currentCount, getNodeFromTree);


const shouldNaicsNodeHaveChildren = (node) => node.naics.length < 6;
const shouldTasNodeHaveChildren = (node) => node.ancestors.length < 2;

// key map for traversing the naics-tree
const naicsKeyMap = { label: 'naics_description', value: 'naics', isParent: shouldNaicsNodeHaveChildren };

// key map for traversing the tas-tree
const tasKeyMap = { label: 'description', value: 'id', isParent: shouldTasNodeHaveChildren };

const cleanTreeData = (nodes, keyMap) => nodes.map((node) => ({
    ...node,
    label: node[keyMap.label],
    value: node[keyMap.value],
    ...getChildren(node, keyMap)
}));

export const isAgency = (tasNode) => tasNode.ancestors.length === 0;

export const cleanNaicsData = (nodes) => cleanTreeData(nodes, naicsKeyMap);
export const cleanTasData = (nodes) => cleanTreeData(nodes, tasKeyMap)
    .map((node) => {
        if (isAgency(node)) {
            return {
                ...node,
                count: null,
                showCheckbox: false,
                displayId: false
            };
        }
        return node;
    });

export const sortNodes = (a, b) => {
    if (a.isPlaceHolder) return 1;
    if (b.isPlaceHolder) return -1;
    const nodeA = parseInt(a.value, 10);
    const nodeB = parseInt(b.value, 10);
    if (nodeA > nodeB) return 1;
    if (nodeB > nodeA) return -1;
    return 0;
};

export const expandAllNodes = (nodes, propForNode = 'value') => {
    const getValue = (acc, node) => {
        acc.push(node[propForNode]);
        if (node.children) {
            acc.push(
                ...node.children.map((child) => child[propForNode])
            );
        }
        return acc;
    };

    return nodes
        .reduce(getValue, []);
};

export const mergeChildren = (parentFromSearch, existingParent) => {
    // 1. hide node not in search
    // 2. add placeholders if not there
    if (existingParent.children && parentFromSearch.children) {
        const existingChildArray = existingParent
            .children
            .filter((node) => {
                const childFromSearch = getNodeFromTree(parentFromSearch.children, node.value);
                if (node.isPlaceHolder && childFromSearch && childFromSearch.count === childFromSearch?.children?.length) {
                    return false;
                }
                return true;
            })
            .map((node) => ({ ...node, className: 'hide' }));

        const nodes = parentFromSearch.children
            .reduce((acc, searchChild) => {
                const existingChildIndex = acc
                    .findIndex((existingChild) => existingChild.value === searchChild.value);

                if (existingChildIndex !== -1) {
                    // show this child
                    acc[existingChildIndex].className = '';
                    if (acc[existingChildIndex].children) {
                        // hide this child's children
                        acc[existingChildIndex].children = acc[existingChildIndex].children.map((grand) => ({ ...grand, className: 'hide' }));
                    }

                    if (acc[existingChildIndex].children && searchChild.children) {
                        searchChild.children
                            .forEach((grandChild) => {
                                const existingGrandChildIndex = acc[existingChildIndex].children
                                    .findIndex((existingGC) => existingGC.value === grandChild.value);

                                if (existingGrandChildIndex !== -1) {
                                    // unless it's in the search array
                                    acc[existingChildIndex].children[existingGrandChildIndex].className = '';
                                }
                                else {
                                    // or we're adding a new node.
                                    acc[existingChildIndex].children.push(grandChild);
                                }
                            });
                    }
                    return acc;
                }
                // child added via search
                if (searchChild.count && searchChild.count === searchChild?.children?.length) {
                    acc.push(searchChild);
                }
                else {
                    const childrenFromSearch = searchChild.children ? searchChild.children : [];
                    acc.push({
                        ...searchChild,
                        children: [
                            ...childrenFromSearch,
                            {
                                isPlaceHolder: true,
                                label: "Child Placeholder",
                                value: `children_of_${searchChild.value}`,
                                className: 'hide'
                            }
                        ]
                    });
                }


                return acc;
            }, existingChildArray);

        return nodes;
    }
    else if (existingParent.children && !parentFromSearch.children) {
        return existingParent.children.map((child) => ({ ...child, className: 'hide' }));
    }
    else if (!existingParent.children && parentFromSearch.children && parentFromSearch.children.length !== parentFromSearch.count) {
        return [
            ...parentFromSearch.children,
            {
                className: 'hide',
                isPlaceHolder: true,
                label: 'Placeholder Child',
                value: `children_of_${parentFromSearch.value}`
            }
        ];
    }
    return [];
};

export const addSearchResultsToTree = (tree, searchResults) => {
    const nodesFromSearchToBeReplaced = searchResults.map((node) => node.value);
    return tree
        .map((existingNode) => {
            // nodeKey is naicsCode!
            const nodeKey = existingNode.value;
            if (nodesFromSearchToBeReplaced.includes(nodeKey)) {
                const nodeFromSearch = searchResults.find((node) => node.value === nodeKey);
                return {
                    ...nodeFromSearch,
                    children: [...mergeChildren(nodeFromSearch, existingNode)]
                };
            }
            return { ...existingNode, className: 'hide' };
        })
        .sort(sortNodes);
};

export const showAllTreeItems = (tree, key = '', newNodes = []) => tree
    .map((node) => {
        const parentKey = getHighestAncestorNaicsCode(key);
        const [data] = newNodes;
        const shouldAddNewChildToParent = (
            key &&
            data &&
            node.value === parentKey &&
            // no child exists
            !node.children.some((child) => child.value === key)
        );
        if (node.value === key) {
            return {
                ...data,
                children: data.children.map((child) => {
                    const existingChild = node.children.find((olderChild) => olderChild.value === child.value);
                    const weHaveTheGrandChildren = (
                        existingChild &&
                        existingChild?.children.length >= child.count &&
                        !existingChild?.children.some((existingGrand) => existingGrand?.isPlaceHolder)
                    );
                    const weHaveAtLeastOneGrandChild = (
                        existingChild &&
                        existingChild?.children.filter((grand) => !grand.isPlaceHolder).length > 0
                    );
                    if (weHaveTheGrandChildren) {
                        return {
                            ...child,
                            children: existingChild.children
                                .filter((grand) => !grand.isPlaceHolder)
                                .map((grand) => ({ ...grand, className: '' }))
                                .sort(sortNodes)
                        };
                    }
                    if (weHaveAtLeastOneGrandChild) {
                        return {
                            ...child,
                            children: [
                                ...child.children,
                                ...existingChild.children.filter((grand) => (!grand.isPlaceHolder))
                            ].sort(sortNodes)
                        };
                    }
                    return {
                        ...child,
                        children: child.children
                    };
                }).sort(sortNodes)
            };
        }
        else if (shouldAddNewChildToParent) {
            return {
                ...node,
                className: '',
                children: [
                    // leave the placeholder!
                    ...node.children,
                    data
                ]
            };
        }
        return {
            ...node,
            className: '',
            children: node.children
                ? node.children
                    .map((child) => {
                        if (child.value === key) {
                            if (child.children.length === child.count && !child.children.some((grandChild) => grandChild.isPlaceHolder)) {
                                // we already have the child data for this particular child, don't overwrite it w/ a placeholder.
                                return {
                                    ...child
                                };
                            }
                            return {
                                ...data
                            };
                        }
                        if (child.children && child.children.some((grand) => grand.className === 'hide')) {
                            return {
                                ...child,
                                className: '',
                                children: child.children.map((grand) => ({ ...grand, className: '' }))
                            };
                        }
                        return {
                            ...child,
                            className: ''
                        };
                    })
                    .sort(sortNodes)
                : []
        };
    });
