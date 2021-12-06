/**
  * AwardTypeQuery.js
  * Created by Kevin Li 11/7/16
  **/

import * as FilterFields from 'dataMapping/search/filterFields';

const buildFieldQuery = (field, values) => ({
    field,
    operation: 'in',
    value: values
});


export const buildQuery = (awardType, searchContext = 'award') => {
    let awardQuery = {};

    const fieldName = FilterFields[`${searchContext}Fields`].awardType;

    awardQuery = buildFieldQuery(fieldName, awardType);

    return awardQuery;
};
