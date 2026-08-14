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


const buildQuery = (awardType, searchContext = 'award') => {
    const fieldName = FilterFields[`${searchContext}Fields`].awardType;

    return buildFieldQuery(fieldName, awardType);
};

export default buildQuery;
