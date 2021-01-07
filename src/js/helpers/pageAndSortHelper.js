/**
 * pageAndSortHelper.js
 * created by Jonathan Hill 01/07/2020
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
    return data.sort(!sortFunction ? defaultSortFunction : sortFunction).slice((page - 1) * limit, page * limit);
};
