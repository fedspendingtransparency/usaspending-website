/**
  * checkboxTreeHelper.js
  * Created by Jonathan Hill 10/01/2019
  **/

// map data from API response to react-checkbox-tree data structure
// @param {object} keysToBeMapped - An object with keys value, and label with values
// that correlate to your value and label properties
// {
//   value: [your value key e.g., naics]
//   label: [your value label e.g., naics_description]
// }
// @param {Array.<object>} data
// @returns {Array.<object>} An array of objects with value, label, and children properties
// that follow react-checkbox-tree data structure and keeps any other fields within those objects
// that originated from your data
// Please refer to https://github.com/jakezatecky/react-checkbox-tree for more details
export const createCheckboxTreeDataStrucure = (keysToBeMapped, data) => {
    const recursiveStrategy = (info) => info.map((item) => {
        const newData = item;
        const { value, label } = keysToBeMapped;

        newData.value = item[value];
        newData.label = item[label];
        delete newData[value];
        delete newData[label];
        delete newData.count;
        if (newData.children) {
            newData.children = recursiveStrategy(newData.children);
        }
        return newData;
    });
    return recursiveStrategy(data);
};

export default createCheckboxTreeDataStrucure;
