/**
  * checkboxTreeHelper.js
  * Created by Jonathan Hill 10/01/2019
  **/

export const sortNodes = (a, b) => {
    const nodeA = parseInt(a.value, 10);
    const nodeB = parseInt(b.value, 10);
    if (nodeA > nodeB) return 1;
    if (nodeB > nodeA) return -1;
    return 0;
};

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

const mergeChildren = (parentFromSearch, existingParent) => {
    if (existingParent.children && parentFromSearch.children) {
        return [
            ...existingParent.children
                // remove any children that will be added from search Node
                .filter((existingChild) => !parentFromSearch.children.some((child) => child.value === existingChild.value))
                .map((existingChild) => {
                    if (Object.keys(existingChild).includes('children')) {
                        // we generally want to keep the existing children but we...
                        return {
                            ...existingChild,
                            // 1. hide them
                            className: 'hide',
                            children: existingChild.children
                                // 2. remove any grandchildren that will be added from search Node
                                .filter((existingGrandChild) => !parentFromSearch.children
                                    .some((child) => child.children
                                        .some((grandChild) => existingGrandChild.value === grandChild.value))
                                )
                                .filter((grandChild) => {
                                    if (existingChild.count === parentFromSearch.children.length) {
                                        // 3. remove the loading placeholder if we already have all the children
                                        if (grandChild.isPlaceHolder) return false;
                                    }
                                    return true;
                                })
                                .map((grandChild) => ({ className: 'hide', ...grandChild }))
                                .sort(sortNodes)
                        };
                    }
                    return {
                        ...existingChild,
                        className: 'hide'
                    };
                }),
            ...parentFromSearch.children
                .map((child) => {
                    if (child.count > child.children.length) {
                        return {
                            ...child,
                            children: [
                                ...child.children,
                                {
                                    className: 'hide',
                                    isPlaceHolder: true,
                                    label: 'Placeholder Child',
                                    value: `children_of_${child.value}`
                                }
                            ]
                        };
                    }
                    return child;
                })
        ];
    }
    else if (existingParent.children && !parentFromSearch.children) {
        return existingParent.children.map((child) => ({ ...child, className: 'hide' }));
    }
    else if (!existingParent.children && parentFromSearch.children && parentFromSearch.children.length !== parentFromSearch.count) {
        return parentFromSearch.children.push({
            isPlaceHolder: true,
            label: 'Placeholder Child',
            value: `children_of_${parentFromSearch.value}`
        });
    }
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

export const showAllTreeItems = (tree, key = '', payload = []) => tree
    .map((node) => {
        if (node.value === key) {
            const [data] = payload;
            return {
                ...data,
                children: data.children.map((child) => {
                    const existingChild = node.children.find((olderChild) => {
                        return olderChild.value === child.value;
                    });
                    const weHaveTheGrandChildren = (
                        existingChild &&
                        existingChild?.children.length === child.count &&
                        !existingChild?.children.some((existingGrand) => {
                            return existingGrand?.isPlaceHolder;
                        })
                    );
                    const weHaveAtLeastOneGrandChild = (
                        existingChild &&
                        existingChild?.children.filter((grand) => !grand.isPlaceHolder).length > 0
                    );
                    if (weHaveTheGrandChildren) {
                        return {
                            ...child,
                            children: existingChild.children.sort(sortNodes)
                        };
                    }
                    if (weHaveAtLeastOneGrandChild) {
                        return {
                            ...child,
                            children: [...child.children, ...existingChild.children].sort(sortNodes)
                        };
                    }
                    return {
                        ...child,
                        children: child.children
                    };
                }).sort(sortNodes)
            };
        }
        return {
            ...node,
            className: '',
            children: node.children
                .map((child) => {
                    if (child.value === key) {
                        if (child.children.length === child.count && !child.children.some((grandChild) => grandChild.isPlaceHolder)) {
                            // we already have the child data for this particular child, don't overwrite it w/ a placeholder.
                            return {
                                ...child
                            };
                        }
                        return {
                            ...payload[0]
                        };
                    }
                    return {
                        ...child,
                        className: ''
                    };
                })
                .sort(sortNodes)
        };
    });
