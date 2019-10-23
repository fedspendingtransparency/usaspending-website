/**
  * checkboxTreeHelper.js
  * Created by Jonathan Hill 10/01/2019
  **/

/**
  ** createCheckboxTreeDataStrucure
  * map data from API response to react-checkbox-tree data structure
  * @param {object} keysToBeMapped - An object with keys value, and label with values
  * that correlate to your value and label properties
  * {
  *   value: [your value key e.g., naics]
  *   label: [your value label e.g., naics_description]
  * }
  * @param {Array.<object>} data
  * @param {String} requestType
  * @returns {Array.<object>} An array of objects with value, label, and children properties
  * that follow react-checkbox-tree data structure and keeps any other fields within those objects
  * that originated from your data
  * Please refer to https://github.com/jakezatecky/react-checkbox-tree for more details
**/
const createCheckboxTreeDataStrucure = (keysToBeMapped, nodes, requestType) => nodes.map((node) => {
    const newNode = { ...node };
    const { value, label } = keysToBeMapped;
    newNode.value = node[value];
    newNode.label = node[label];
    delete newNode[value];
    delete newNode[label];
    if (requestType === 'initial') {
        newNode.children = [{}];
        return newNode;
    }
    if (newNode.children) {
        newNode.children = createCheckboxTreeDataStrucure(keysToBeMapped, newNode.children);
    }
    return newNode;
});

export default createCheckboxTreeDataStrucure;
