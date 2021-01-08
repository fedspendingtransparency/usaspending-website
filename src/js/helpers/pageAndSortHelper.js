/**
 * pageAndSortHelper.js
 * created by Jonathan Hill 01/07/2020
 */

/**
 * pageAndSort
 * - Given an array data set this will return paged and sorted array based on parameters passed.
 * @param {*[]} data - An array of data.
 * @param {func} [sortFunction = defaultSortFunction] sortFunction - A function to sort the data (Please refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
 * @param {number} page - The page number.
 * @param {number} limit - The max number of element in the data set to return.
 * @param {'desc'|'asc'} [sortDirection] - The direction to sort the data set on (optional if and only if sortFunction is passed).
 * @param {string} [sortProperty] - The property to sort on in an element of the data set (optional if and only if sortFunction is passed).
 * @returns {*[]} - A sorted and paged array.
 */
export const pageAndSort = (data, sortFunction, page, limit, sortDirection, sortProperty) => {
    // protects against required props
    if (!data || !data.length || !page || !limit) return [];
    // protects against required sorting props
    if (!sortFunction && !sortDirection && !sortProperty) return [];
    const defaultSortFunction = (a, b) => {
        if (sortDirection === 'desc') return b[sortProperty] - a[sortProperty];
        return a[sortProperty] - b[sortProperty];
    };
    return data
        .sort(!sortFunction ? defaultSortFunction : sortFunction)
        .slice((page - 1) * limit, page * limit);
};
