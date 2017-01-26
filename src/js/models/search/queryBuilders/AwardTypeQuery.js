/**
  * AwardTypeQuery.js
  * Created by Kevin Li 11/7/16
  **/

const fieldName = 'type';

const buildFieldQuery = (field, values) => ({
    field,
    operation: 'in',
    value: values
});


export const buildQuery = (awardType) => {
    let awardQuery = {};

    awardQuery = buildFieldQuery(fieldName, awardType);

    return awardQuery;
};
