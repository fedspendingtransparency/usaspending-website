/**
  * checkboxTreeHelper.js
  * Created by Jonathan Hill 10/01/2019
  **/

import { isEmpty, flattenDeep, compact, clone } from 'lodash';

/**
 * updateValueAndLabel
 */
export const updateValueAndLabel = (node, keys) => {
    const newNode = { ...node };
    const { value, label } = keys;
    newNode.value = node[value];
    newNode.label = node[label];
    delete newNode[value];
    delete newNode[label];
    return newNode;
};
/**
* updatePath
*/
export const updatePath = (params) => {
    const {
        node,
        parentNode,
        index,
        isChildren
    } = params;
    const newNode = { ...node };
    /**
     * Case I - No Parent Node
     * Initially populate the tree. These are Tier 1 data points,
     * therefore we only add the index, there is no parent.
     */
    if (!parentNode) {
        newNode.path = [index];
    }
    /**
     * Case II - We are mapping new data
     * When we are not calling itself and we pass a parent node we are at a
     * state where we initially populate the tree. These are Tier 1 data points,
     * therefore we only add the index, there is no parent.
     */
    if (!isChildren && parentNode) {
        newNode.path = parentNode.path;
    }
    /**
     * Case III - We are mapping children
     * We only pass the children property when this function is calling itself to
     * convert a parents children to the data structure. Therefore, we include the
     * parents path before the current child's index.
     */
    if (isChildren) {
        newNode.path = [...parentNode.path, index];
    }
    return newNode;
};
/**
 * updateChildren
*/
export const updateChildren = (params) => {
    const {
        isChildren,
        node,
        limit,
        isSearch
    } = params;
    const newNode = { ...node };
    /**
     * Case I - This node will have no children based on it's path and limit
     * TODO - once backend changes this add check for count === 0
     * Applies the limit, once we hit limit do not add children.
     * By not adding children we will not see the caret to the left of the checkbox.
     */

    if (isChildren && newNode.path.length === limit) return newNode;
    /**
     * Case II - Show Expand Caret
     * When there is no children property and there is a count for this node
     * (means this node has child data) we must set the child property to an
     * array with one empty object to get the expand caret to show.
     */
    if ((newNode.count > 0 && !newNode.children) && !isSearch) {
        newNode.children = [{
            value: `${newNode.value}childPlaceholder`,
            label: 'Placeholder Child',
            isPlaceholder: true
        }];
        return newNode;
    }
    return newNode;
};
/**
  ** createCheckboxTreeDataStructure
  * map data from API response to react-checkbox-tree data structure
  * @param {number} limit - total possible depth of tree structure
  * @param {object} keysToBeMapped - An object with keys value, and label with values
  * that correlate to your value and label properties
  * {
  *   value: [the name of your propery that will become the value e.g., naics]
  *   label: [the name of your propery that will become the label e.g., naics_description]
  * }
  * @param {Array.<object>} nodes - data to map
  * @param {boolean} isChildren - if we are mapping children
  * @param {object} parentNode - parent of the current data
  * @param {boolean} isSearch - data is from search
  * @returns {Array.<object>} An array of objects with value, label, and children properties
  * that follow react-checkbox-tree data structure and keeps any other fields within those objects
  * that originated from your data
  * Please refer to https://github.com/jakezatecky/react-checkbox-tree for more details
**/
/* eslint-disable import/prefer-default-export */
export const createCheckboxTreeDataStructure = (
    limit,
    keysToBeMapped,
    nodes,
    isChildren,
    parentNode,
    isSearch
) => nodes.map((node, index) => {
    let newNode = { ...node };
    /**
     * Five Steps to this Function
     *
     * 1. Map Value and Label Properties
     *   - Maps properties passed in the data to value and label
     *
     * 2. Update Path
     *   - Sets the path property based on different situations
     *   - noted in their respective function
     *
     * 3. Children Property
     *   - Updates the children property based on different situations
     *   - noted in their respective function
     *
     * 4. Map Child Data
     *   - repeats the process for child data
     *
     * 5. Search
     *   - need to add a classname on search
     */

    // Step 1 - Map Value and Label Properties
    newNode = updateValueAndLabel(newNode, keysToBeMapped);

    // Step 2 - Update Path
    const params = {
        node: newNode,
        parentNode,
        index,
        isChildren
    };
    newNode = updatePath(params);

    // Step 3 - Children
    const childParams = {
        isChildren,
        node: newNode,
        limit,
        keysToBeMapped,
        isSearch
    };
    newNode = updateChildren(childParams);
    // Step 4 - Map Child Data
    // if ((newNode.count > 0) && newNode.children && !isEmpty(newNode.children[0])) {
    if ((newNode.count > 0) && newNode.children && !newNode?.children?.[0]?.isPlaceholder) {
        newNode.children = createCheckboxTreeDataStructure(
            limit,
            keysToBeMapped,
            newNode.children,
            true,
            newNode,
            isSearch
        );
    }
    // Step 5 - Search
    if (isSearch) newNode.className = 'react-checkbox-tree_search';
    return newNode;
});
/**
 * expandedFromSearch
 * - maps data passed to nodes in the checkbox tree data structure and decides which
 * nodes are expanded based on if they have a children property. We also add placeholder
 * children so that the checkboxes (full check and half check) work as expected.
 * @param {number} limit - total possible depth of tree structure
 * @param {object} nodeKeys - and object with keys value
 * @param {array} nodes - array of objects
 * @returns {object} - object with properties updatedNodes and expanded.
 * expanded is an array of nodes that are expanded
 * updatedNodes is an array of nodes mapped to the checkbox tree data structure
 */
export const handleSearch = (
    limit,
    nodeKeys,
    nodes
) => {
    // const newNodes = createCheckboxTreeDataStructure(
    //     limit,
    //     nodeKeys,
    //     nodes,
    //     null,
    //     null,
    //     true
    // );
    // add placeholder children for search
    const addPlaceholderChildren = (node) => {
        const difference = node.count - node.children.length;
        if (difference > 0) {
            for (let i = 0; i < difference; i++) {
                // placeholder children for search
                const placeholderChild = {
                    value: `${node.value}placeholderForSearch${i}`,
                    label: 'placeholderForSearch',
                    className: 'react-checkbox-tree__search-placeholder-child'
                };
                node.children.push(placeholderChild);
            }
        }
        return node;
    };
    /**
     * expandedFunc
     * - recursively loops through nodes updating an array with the value of children
     * a children property
     * @param {array} theNodes - an array of nodes
     * @param {array} expanded - an array of expanded values
     * @returns {array} - an array of expanded values
     */
    const expandedFunc = (theNodes, expanded) => {
        const expandedValues = expanded;
        theNodes.forEach((node) => {
            const newNode = node;
            if (!newNode?.className) {
                newNode.className = 'react-checkbox-tree__search';
            }
            if (newNode.children) {
                const updatedNode = addPlaceholderChildren(newNode);
                expandedValues.push(updatedNode.value);
                expandedFunc(updatedNode.children, expandedValues);
            }
        });
        return expandedValues;
    };
    // maps nodes to an array of expanded values
    const expanded = nodes.map((node) => {
        const newNode = node;
        newNode.className = 'react-checkbox-tree__tier-zero';
        if (newNode.children) {
            const updatedNode = addPlaceholderChildren(newNode);
            return [newNode.value, ...expandedFunc(updatedNode.children, [])];
        }
        return [null];
    });
    // flattens and removes any null values
    const expandedArray = compact(flattenDeep(expanded));
    return { updatedNodes: nodes, expanded: expandedArray };
};
/**
 * deepest child values
 * - gets all child values
 * @param {object[]} nodes - nodes to traverse
 * @returns {*[]} - an array of values
 */
export const deepestChildValues = (nodes) => {
    /**
     * valueFunc
     * - recursively loops through nodes updating an array with the value of the node if is has
     * a children property
     * @param {array} theNodes - an array of nodes
     * @param {array} arrayOfValues - an array of values
     * @returns {array} - an array of values
     */
    const valueFunc = (theNodes, childValues) => {
        theNodes.forEach((node) => {
            const newNode = node;
            if (newNode.children) {
                valueFunc(newNode.children, childValues);
            }
            else {
                childValues.push(newNode.value);
            }
        });
        return childValues;
    };
    // maps nodes to an array of expanded values
    const values = nodes.map((node) => {
        if (node.children) return [...valueFunc(node.children, [])];
        return [node.value];
    });
    // flattens and removes any null values
    const valuesArray = compact(flattenDeep(values));
    return valuesArray;
};
/**
 * allChildValues
 * - gets all child values
 * @param {object[]} nodes - nodes to traverse
 * @returns {*[]} - an array of values
 */
export const allChildValues = (nodes) => {
    /**
     * valueFunc
     * - recursively loops through nodes updating an array with the value of the node if is has
     * a children property
     * @param {array} theNodes - an array of nodes
     * @param {array} arrayOfValues - an array of values
     * @returns {array} - an array of values
     */
    const valueFunc = (theNodes, arrayOfValues) => {
        const checkedValues = arrayOfValues;
        theNodes.forEach((node) => {
            const newNode = node;
            checkedValues.push(newNode.value);
            if (newNode.children) {
                const childValues = newNode.children.map((child) => child.value);
                checkedValues.push(childValues);
                newNode.forEach((childNode) => valueFunc(childNode, checkedValues));
            }
        });
        return checkedValues;
    };
    // maps nodes to an array of expanded values
    const values = nodes.map((node) => {
        const newNode = node;
        if (newNode.children) return [newNode.value, ...valueFunc(newNode.children, [])];
        return [newNode.value];
    });
    // flattens and removes any null values
    const valuesArray = compact(flattenDeep(values));
    return valuesArray;
};
/**
 * pathToNode
 * finds the path to an object
 * @param {array} nodes - nodes to search through
 * @param {*} value - value to match on
 * @returns {array} - A path array to the matched object
 */
export const pathToNode = (nodes, value, key = 'value') => {
    let theNodePath = null;
    const recursiveFind = (theNodes, theValue) => {
        // array of parent indices including found node index
        for (let i = 0; i < theNodes.length; i++) {
            // we found the node, break
            if (theNodes[i][key] === theValue) {
                theNodePath = theNodes[i].path;
                break;
            }
            if (theNodes[i].children) {
                // we have not found the match, repeat process with children
                recursiveFind(theNodes[i].children, theValue);
            }
        }
        return false;
    };

    // array of parent indices including found node index
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i][key] === value) {
            theNodePath = nodes[i].path;
            break;
        }
        if (nodes[i].children) {
            recursiveFind(nodes[i].children, value);
        }
        if (theNodePath) break;
    }
    return { path: theNodePath };
};
/**
 * buildNodePath
 * Creates an object path string
 * @param {array} path - an object path
 * @param {string} [startingProperty = 'data'] - the property of the object to start the path
 */
export const buildNodePath = (path, startingProperty = 'data') => path
    .reduce((acc, step, index) => {
        let stringPath = acc;
        /**
         * add starting property and index to string
         * e.g. 'data[0]'
         */
        if (index === 0) {
            stringPath += `${startingProperty}[${step}]`;
        }
        else {
            // add children to string, e.g. 'data[0].children[7]'
            stringPath += `.children[${step}]`;
        }
        return stringPath;
    }, '');
