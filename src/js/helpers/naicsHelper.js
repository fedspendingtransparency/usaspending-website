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
    expandNodeAndAllDescendantParents
} from './checkboxTreeHelper';

export const formatSelectedNaics = (value, description, count) => `${value} | ${description} | ${count}`;

export const shouldNaicsNodeHaveChildren = (node) => node.naics.length < 6;
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
