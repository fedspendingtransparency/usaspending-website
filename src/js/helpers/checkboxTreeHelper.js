/**
  * checkboxTreeHelper.js
  * Created by Jonathan Hill 10/01/2019
  **/

import { isEmpty } from 'lodash';

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
        limit
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
    if (newNode.count > 0 && !newNode.children) {
        newNode.children = [{}];
        return newNode;
    }
    return newNode;
};
/**
  ** createCheckboxTreeDataStrucure
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
  * @returns {Array.<object>} An array of objects with value, label, and children properties
  * that follow react-checkbox-tree data structure and keeps any other fields within those objects
  * that originated from your data
  * Please refer to https://github.com/jakezatecky/react-checkbox-tree for more details
**/
/* eslint-disable import/prefer-default-export */
export const createCheckboxTreeDataStrucure = (
    limit,
    keysToBeMapped,
    nodes,
    isChildren,
    parentNode
) => nodes.map((node, index) => {
    let newNode = { ...node };
    /**
     * Four Steps to this Function
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
        keysToBeMapped
    };
    newNode = updateChildren(childParams);
    // Step 4 - Map Child Data
    if ((newNode.count > 0) && newNode.children && !isEmpty(newNode.children[0])) {
        newNode.children = createCheckboxTreeDataStrucure(
            limit,
            keysToBeMapped,
            newNode.children,
            true,
            newNode
        );
    }

    return newNode;
});
/**
 * pathToNode
 * finds the path to an object
 * @param {array} nodes - nodes to search through
 * @param {*} value - value to match on
 * @returns {array} - A path array to the matched object
 */
let found = false;
let nodePath = null;
export const pathToNode = (nodes, value) => {
    // array of parent indices including found node index
    for (let i = 0; i < nodes.length; i++) {
        /**
         * Since we are calling this function on children we need to know if the
         * match was found, and break out of the outermost loop.
         */
        if (found) {
            found = false;
            break;
        }
        // we found the node, break
        if (nodes[i].value === value) {
            // set the nodePath
            nodePath = nodes[i].path;
            /**
             * Since we are calling the function pathToNode we could be in a child
             * loop, and we must tell update the found property because there outermost
             * parent loop will hit and we need to break out of that loop as well.
             */
            found = true;
            break;
        }
        if (nodes[i].children) {
            // we have not found the match, repeat process with children
            pathToNode(
                nodes[i].children,
                value,
                true
            );
        }
    }
    return nodePath;
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
