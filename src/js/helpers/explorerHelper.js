/**
 * explorerHelper.js
 * Created by Kevin Li 8/16/17
 */
import { startCase } from 'lodash';

import { apiRequest } from './apiRequest';

// eslint-disable-next-line import/prefer-default-export
export const fetchBreakdown = (params) => apiRequest({
    url: 'v2/spending/',
    method: 'post',
    data: params
});

export const pluralizeSubdivision = (activeSubdivision) => {
    let pluralText = '';
    if (activeSubdivision === 'program_activity') {
        pluralText = 'Program Activities';
    }
    else if (activeSubdivision === 'object_class') {
        pluralText = 'Object Classes';
    }
    else {
        pluralText = `${startCase(activeSubdivision)}s`;
    }
    return pluralText;
};

/**
 * @param {Array} dataForTree an array of objects from api representing spending explorer tree cells
 * @param {Int} total integer representing total spending amount for selected criteria
 * @param {String} activeSubdivision string indicating the selected activeSubdivision: award/
 *  recipient/etc...
 * @returns {Array} the dataForTree array with new object appended representing total spending data
 * not shown
 */
export const appendCellForDataOutsideTree = (dataForTree, overallTotal, activeSubdivision) => {
    const totalNotShown = overallTotal - dataForTree.reduce((sum, item) => sum + item.amount, 0);
    const subdivisionText = pluralizeSubdivision(activeSubdivision);
    return [{
        id: null,
        link: false,
        code: "N/A",
        type: '',
        name: `Sum of all ${subdivisionText} after Top 500`,
        amount: totalNotShown
    }]
        .concat(dataForTree);
};

export const truncateDataForTreemap = (data, limit = 500) => data
    .sort((a, b) => b.amount - a.amount)
    .filter((item) => item.amount >= 0)
    .slice(0, limit);
