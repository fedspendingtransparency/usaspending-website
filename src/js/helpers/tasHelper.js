import {
    decrementCountAndUpdateUnchecked,
    incrementCountAndUpdateUnchecked,
    cleanTreeData,
    removeStagedFilter
} from "./checkboxTreeHelper";

export const isAgency = (tasNode) => tasNode.ancestors.length === 0;
const shouldTasNodeHaveChildren = (node) => node.ancestors.length < 2;

// key map for traversing the tas-tree
const tasKeyMap = { label: 'description', value: 'id', isParent: shouldTasNodeHaveChildren };

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
export const getHighestTasAncestorCode = (node) => {
    if (node.ancestors.length) return node.ancestors[0];
    return node.value;
};

export const getImmediateTasAncestorCode = (node) => {
    if (!node.ancestors.length || node.ancestors.length === 1) return getHighestTasAncestorCode(node);
    return node.ancestors[node.ancestors.length - 1];
};

export const removeStagedTasFilter = (
    nodes,
    checkedNodes,
    removedNode,
) => removeStagedFilter(
    nodes,
    checkedNodes,
    removedNode,
    getTasNodeFromTree,
    getHighestTasAncestorCode,
    getImmediateTasAncestorCode
);

export const decrementTasCountAndUpdateUnchecked = (
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
    getTasNodeFromTree,
    getImmediateTasAncestorCode,
    getHighestTasAncestorCode
);

export const incrementTasCountAndUpdateUnchecked = (
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
    getTasNodeFromTree,
    getImmediateTasAncestorCode,
    getHighestTasAncestorCode
);
