/**
  * ObjectClassQuery.js
  * Created by Kevin Li 3/31/17
  **/

const objectClassField = 'object_class__major_object_class';
const awardObjectClassField = 'financial_set__object_class__major_object_class';

const commonQuery = (field, values) => ({
    field,
    operation: 'in',
    value: values
});

export const buildObjectClassQuery = (values) => commonQuery(objectClassField, values);

export const buildAwardObjectClassQuery = (values) => commonQuery(awardObjectClassField, values);