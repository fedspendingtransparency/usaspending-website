/**
  * ObjectClassQuery.js
  * Created by Kevin Li 3/31/17
  **/

const objectClassField = 'object_class__major_object_class';

export const buildObjectClassQuery = (values) => ({
    field: objectClassField,
    operation: 'in',
    value: values
});
