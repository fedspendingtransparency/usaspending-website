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

const getCountWithPlaceholderOffset = (key, codesUnderPlaceholder, nodes, traverseTreeByCodeFn) => {
    // when the placeholder is counted, adjust the count to offset for the 'nodes under this placeholder' which will be counted.
    const hasSelectedButNotCounted = codesUnderPlaceholder.some((obj) => obj.placeholder === key);

    if (hasSelectedButNotCounted) {
        const nodesUnderPlaceholder = codesUnderPlaceholder
            .filter((code) => code.placeholder === key);
        const aggregateOffsetOfNodesUnderPlaceholder = nodesUnderPlaceholder
            .map((obj) => traverseTreeByCodeFn(nodes, obj.code))
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

export const removeStagedFilter = (
    nodes,
    checkedNodes,
    removedNode,
    traverseTreeByCodeFn,
    getHighestAncestorFn,
    getImmediateAncestorFn
) => checkedNodes
    .map((checkedCode) => removePlaceholderString(checkedCode))
    .filter((checked) => {
        const checkedNode = traverseTreeByCodeFn(nodes, checked);
        if (getHighestAncestorFn(checkedNode) === removedNode) return false;
        if (getImmediateAncestorFn(checkedNode) === removedNode) return false;
        if (checkedNode === removedNode) return false;
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

    // child place holders reflect the count of their immediate ancestor
    const placeHoldersToBeCounted = newChecked
        .filter((node) => node.includes('children_of_'));

    const codesUnderPlaceholder = [];
    const codesWithoutPlaceholder = [];
    const codesToBeRemovedFromUnchecked = [];

    newChecked
        .filter((code) => !code.includes('children_of_'))
        .forEach((code) => {
            const node = traverseTreeByCodeFn(nodeTree, code);
            const immediateAncestorCode = getImmediateAncestorFn(node);
            const highestAncestorCode = getHighestAncestorFn(node);
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

            const offsetCount = getCountWithPlaceholderOffset(key, codesUnderPlaceholder, nodeTree, traverseTreeByCodeFn);
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

export const mergeChildren = (parentFromSearch, existingParent, traverseTreeByCodeFn) => {
    // 1. hide node not in search
    // 2. add placeholders if not there
    if (existingParent.children && parentFromSearch.children) {
        const existingChildArray = existingParent
            .children
            .filter((node) => {
                const childFromSearch = traverseTreeByCodeFn(parentFromSearch.children, node.value);
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

export const addSearchResultsToTree = (tree, searchResults, traverseTreeByCodeFn) => {
    const nodesFromSearchToBeReplaced = searchResults.map((node) => node.value);
    return tree
        .map((existingNode) => {
            // nodeKey is naicsCode!
            const nodeKey = existingNode.value;
            if (nodesFromSearchToBeReplaced.includes(nodeKey)) {
                const nodeFromSearch = searchResults.find((node) => node.value === nodeKey);
                return {
                    ...nodeFromSearch,
                    children: [...mergeChildren(nodeFromSearch, existingNode, traverseTreeByCodeFn)]
                };
            }
            return { ...existingNode, className: 'hide' };
        })
        .sort(sortNodes);
};

export const showAllTreeItems = (tree, key = '', newNodes = [], getHighestAncestorCode) => tree
    .map((node) => {
        const parentKey = getHighestAncestorCode(key);
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
                    !child?.children?.length
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
