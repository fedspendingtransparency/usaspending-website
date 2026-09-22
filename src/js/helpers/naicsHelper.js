/**
  * naicsHelper.js
  * Created by Jonathan Hill 10/03/2019
  **/

import {
    cleanTreeData,
    incrementCountAndUpdateUnchecked,
    decrementCountAndUpdateUnchecked,
    removeStagedFilter,
    autoCheckImmediateChildrenAfterDynamicExpand,
    expandNodeAndAllDescendantParents,
    getFormattedDataForCheckboxTree
} from './checkboxTreeHelper';

export const formatSelectedNaics = (value, description, count) => `${value} | ${description} | ${count}`;

export const shouldNaicsNodeHaveChildren = (node) => node.naics?.length < 6;
// key map for traversing the naics-tree
export const naicsKeyMap = { label: 'naics_description', value: 'naics', isParent: shouldNaicsNodeHaveChildren };

export const cleanNaicsData = (nodes) => cleanTreeData(nodes, naicsKeyMap);

const getHighestAncestorFromString = (naicsCode) => `${naicsCode[0]}${naicsCode[1]}`;
const getImmediateAncestorFromString = (naicsCode) => {
    if (naicsCode.length === 2) return naicsCode;
    else if (naicsCode.length === 4) return getHighestAncestorFromString(naicsCode);
    return `${naicsCode[0]}${naicsCode[1]}${naicsCode[2]}${naicsCode[3]}`;
};

export const getHighestAncestorNaicsCode = (naicsCode) => {
    if (typeof naicsCode === 'string') return getHighestAncestorFromString(naicsCode);
    return getHighestAncestorFromString(naicsCode.value);
};

export const getImmediateAncestorNaicsCode = (naicsCode) => {
    if (typeof naicsCode === 'string') return getImmediateAncestorFromString(naicsCode);
    return getImmediateAncestorFromString(naicsCode.value);
};

export const getNaicsNodeFromTree = (tree, nodeKey, treePropForKey = 'value') => {
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

export const getFormattedAncestors = (node) => {
    const ancestors = [];
    let naicsCode = node;
    if (typeof node !== 'string') {
        naicsCode = node.value;
    }

    // parse naicsCode
    if (!naicsCode || naicsCode.length === 2 || naicsCode.includes('children_of_')) {
        return ancestors;
    }

    if (naicsCode.length === 4) {
        ancestors.push(naicsCode.substring(0, 2));
    }
    else {
        ancestors.push(naicsCode.substring(0, 2), naicsCode.substring(0, 4));
    }

    return ancestors;
};

export const getFormattedChildren = (node) => {
    if (node?.children?.length) {
        return node.children.map((child) => (
            {
                ...child,
                ancestors: getFormattedAncestors(child),
                id: child.id || child.value,
                children: getFormattedChildren(child)
            }
        ));
    }
    return [];
};

export const getAllUniqueAncestors = (ancestorArray) => {
    const allUniqueAncestors = ancestorArray.reduce((uniqueAncestors, code) => {
        const highestAncestor = getHighestAncestorNaicsCode(code);
        const immediateAncestor = getImmediateAncestorNaicsCode(code);
        if (uniqueAncestors.includes(highestAncestor)) {
            if (!uniqueAncestors.includes(immediateAncestor)) {
                return uniqueAncestors.concat([immediateAncestor]);
            }
            return uniqueAncestors;
        }
        return uniqueAncestors.concat(
            [highestAncestor, immediateAncestor]
                .filter((ancestor) => !uniqueAncestors.includes(ancestor))
        );
    }, []).sort((a, b) => {
        if (b.length > a.length) return -1;
        if (a.length > b.length) return 1;
        return 0;
    });

    // ensure unique values
    return [...new Set(allUniqueAncestors)];
};


export const getFormattedNaicsDataForCheckboxTree = (nodes) => getFormattedDataForCheckboxTree(nodes, 'naics', getFormattedChildren, getFormattedAncestors);

export const decrementNaicsCountAndUpdateUnchecked = (
    uncheckedNode,
    unchecked,
    checked,
    counts,
    nodes) => decrementCountAndUpdateUnchecked(
    uncheckedNode,
    unchecked,
    checked,
    counts,
    nodes,
    getNaicsNodeFromTree,
    getImmediateAncestorNaicsCode,
    getHighestAncestorNaicsCode
);

export const incrementNaicsCountAndUpdateUnchecked = (
    newChecked,
    oldChecked,
    unchecked,
    nodes,
    currentCount
) => incrementCountAndUpdateUnchecked(
    newChecked,
    oldChecked,
    unchecked,
    nodes,
    currentCount,
    getNaicsNodeFromTree,
    getImmediateAncestorNaicsCode,
    getHighestAncestorNaicsCode
);

export const removeStagedNaicsFilter = (
    nodes,
    checkedNodes,
    removedNode
) => removeStagedFilter(
    nodes,
    checkedNodes,
    removedNode,
    getNaicsNodeFromTree,
    getHighestAncestorNaicsCode,
    getImmediateAncestorNaicsCode
);

export const autoCheckNaicsAfterExpand = (
    parentNode,
    checked,
    unchecked
) => autoCheckImmediateChildrenAfterDynamicExpand(
    parentNode,
    checked,
    unchecked,
    'naics',
    shouldNaicsNodeHaveChildren
);

export const expandNaicsAndAllDescendantParents = (
    nodes,
    keyForValue
) => expandNodeAndAllDescendantParents(
    nodes,
    keyForValue,
    shouldNaicsNodeHaveChildren
);
