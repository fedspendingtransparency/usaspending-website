/**
  * ObjectClassQuery.js
  * Created by Kevin Li 3/31/17
  **/

const objectClassField = 'object_class__major_object_class';

const spendingOverTimeField = `treasury_account_identifier__program_balances__${objectClassField}`;
const spendingByCategoryField = objectClassField;
const awardField = `financial_set__${objectClassField}`;

const commonQuery = (field, values) => ({
    field,
    operation: 'in',
    value: values
});

export const buildSpendingOverTimeObjectClassQuery = (values) =>
    commonQuery(spendingOverTimeField, values);

export const buildSpendingByCategoryObjectClassQuery = (values) =>
    commonQuery(spendingByCategoryField, values);

export const buildAwardObjectClassQuery = (values) =>
    commonQuery(awardField, values);
