import {
    decrementCountAndUpdateUnchecked,
    incrementCountAndUpdateUnchecked,
    cleanTreeData,
    removeStagedFilter,
    autoCheckImmediateChildrenAfterDynamicExpand,
    expandNodeAndAllDescendantParents,
    getAncestryPathOfNodes
} from "./checkboxTreeHelper";

export const emptyHierarchy = {
    base_code: {},
    midtier_code: {},
    subtier_code: {},
    toptier_code: {}
};

const getPscTypeByToptierCode = (toptierCode) => {
    // Undefined toptierCode code is always a product
    if (toptierCode === undefined) return 'PRODUCTS';
    const topTierCodeAsInt = parseInt(toptierCode, 10);
    if (isNaN(topTierCodeAsInt)) {
        if (toptierCode && toptierCode[0].toUpperCase() === 'A') {
            return 'RESEARCH AND DEVELOPMENT';
        }
        // all letters other than 'A' are services
        return 'SERVICES';
    }
    // all numbers are PRODUCTS
    return 'PRODUCTS';
};

export const deducePscType = (acc, keyValueArray) => {
    const [key, value] = keyValueArray;
    if (key === 'toptier_code') {
        const description = getPscTypeByToptierCode(value.code);
        const pscType = { code: "--", description };
        if (description === 'RESEARCH AND DEVELOPMENT') {
            // replace toptier_code w/ psc type
            return { ...acc, pscType };
        }
        return { ...acc, pscType, [key]: value };
    }
    return { ...acc, [key]: value };
};

export const getHighestPscAncestor = (node) => {
    if (node.ancestors.length) return node.ancestors[0];
    return node.value;
};

export const getImmediatePscAncestor = (node) => {
    if (!node.ancestors.length || node.ancestors.length === 1) return getHighestPscAncestor(node);
    return node.ancestors[node.ancestors.length - 1];
};

export const getPscNodeFromTree = (tree, code) => {
    if (!tree) return tree;
    const topLevelNode = tree.find((node) => node.value === code);
    if (topLevelNode) return topLevelNode;
    return tree
        .reduce((acc, node) => {
            if (acc) return acc;
            if (node.value === code) return node;
            return getPscNodeFromTree(node.children, code);
        }, undefined);
};

export const shouldPscNodeHaveChildren = (node) => {
    if (node.isPlaceHolder) return false;
    if (node.ancestors.includes('Product')) return node.ancestors.length < 2;
    return node.ancestors.length < 3;
};

// key map for traversing the tas-tree
const pscKeyMap = { label: 'description', value: 'id', isParent: shouldPscNodeHaveChildren };

export const cleanPscData = (nodes) => cleanTreeData(nodes, pscKeyMap);

export const removeStagedPscFilter = (
    nodes,
    checkedNodes,
    removedNode
) => removeStagedFilter(
    nodes,
    checkedNodes,
    removedNode,
    getPscNodeFromTree,
    getHighestPscAncestor,
    getImmediatePscAncestor
);

export const decrementPscCountAndUpdateUnchecked = (
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
    getPscNodeFromTree,
    getImmediatePscAncestor,
    getHighestPscAncestor
);

export const incrementPscCountAndUpdateUnchecked = (
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
    getPscNodeFromTree,
    getImmediatePscAncestor,
    getHighestPscAncestor
);

export const autoCheckPscAfterExpand = (
    parentNode,
    checked,
    unchecked
) => autoCheckImmediateChildrenAfterDynamicExpand(
    parentNode,
    checked,
    unchecked,
    'value',
    shouldPscNodeHaveChildren
);

export const expandPscNodeAndAllDescendantParents = (
    nodes
) => expandNodeAndAllDescendantParents(
    nodes,
    'value',
    shouldPscNodeHaveChildren
);

export const getPscAncestryPathForChecked = (checked, nodes) => getAncestryPathOfNodes(
    checked,
    nodes,
    getPscNodeFromTree
);
