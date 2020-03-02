/**
  * checkboxTreeHelper.js
  * Created by Jonathan Hill 10/01/2019
  **/

export const getNodeFromTree = (tree, nodeKey, treePropForKey = 'value') => {
    if (nodeKey.length === 2) {
        return tree
            .find((node) => node[treePropForKey] === nodeKey);
    }
    if (nodeKey.length >= 4) {
        const parentKey = `${nodeKey[0]}${nodeKey[1]}`;
        const childNode = tree
            .find((node) => node[treePropForKey] === parentKey)
            .children
            .find((node) => node[treePropForKey] === nodeKey);
        if (nodeKey.length === 4) {
            return childNode;
        }

        return childNode.children
            .find((node) => node[treePropForKey] === nodeKey);
    }
    return null;
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

/**
const mergeChildren = (parentFromSearch, existingParent) => {
    // return an array of objects
    if (existingParent.children && parentFromSearch.children) {
        return [
            ...existingParent.children
                // remove any children that will be added from search Node
                .filter((existingChild) => !parentFromSearch.children.some((child) => child.value === existingChild.value))
                .map((existingChild) => ({
                    // hide any existing children
                    ...existingChild,
                    className: 'hide',
                    children: Object.keys(existingChild).includes('children')
                        ? existingChild.children
                            // remove any grandchildren that will be added from search Node
                            .filter((existingGrandChild) => !parentFromSearch.children
                                .some((child) => child.children
                                    .some((grandChild) => existingGrandChild.value === grandChild.value))
                            )
                            .map((grandChild) => ({ className: 'hide', ...grandChild }))
                        : [{
                            // hide any existing grand children
                            className: 'hide',
                            isPlaceHolder: true,
                            label: 'Placeholder Child',
                            value: `children_of_${existingChild.value}`
                        }]
                })),
            ...parentFromSearch.children
        ];
    }
    if (existingParent.children) {
        return existingParent.children;
    }

    return parentFromSearch.children;
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
        });
};

export const showAllTreeItems = (tree, key = '', payload = []) => tree
    .map((node) => {
        if (node.value === key) {
            return {
                ...payload[0]
            };
        }
        return {
            ...node,
            className: '',
            children: node.children.map((child) => {
                if (child.value === key) {
                    return {
                        ...payload[0]
                    };
                }
                return {
                    ...child,
                    className: ''
                };
            })
        };
    });
