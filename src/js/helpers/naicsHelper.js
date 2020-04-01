/**
  * naicsHelper.js
  * Created by Jonathan Hill 10/03/2019
  **/

import { apiRequest } from './apiRequest';
import {
    cleanTreeData,
    incrementCountAndUpdateUnchecked,
    decrementCountAndUpdateUnchecked
} from './checkboxTreeHelper';

// perform search is a cancellable promise
// eslint-disable-next-line import/prefer-default-export
export const naicsRequest = (param) => apiRequest({
    url: `v2/references/naics/${param || ''}`
});

export const formatSelectedNaics = (value, description, count) => `${value} | ${description} | ${count}`;

const shouldNaicsNodeHaveChildren = (node) => node.naics.length < 6;
// key map for traversing the naics-tree
const naicsKeyMap = { label: 'naics_description', value: 'naics', isParent: shouldNaicsNodeHaveChildren };

export const cleanNaicsData = (nodes) => cleanTreeData(nodes, naicsKeyMap);

export const getHighestAncestorNaicsCode = (naicsCode) => `${naicsCode[0]}${naicsCode[1]}`;

export const getImmediateAncestorNaicsCode = (naicsCode) => {
    if (naicsCode.length === 2) return naicsCode;
    else if (naicsCode.length === 4) return getHighestAncestorNaicsCode(naicsCode);
    return `${naicsCode[0]}${naicsCode[1]}${naicsCode[2]}${naicsCode[3]}`;
};

export const getNaicsNodeFromTree = (tree, nodeKey, treePropForKey = 'value') => {
    debugger;
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
    getNaicsNodeFromTree
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
