/**
  * ObjectClassQuery.js
  * Created by Kevin Li 3/31/17
  **/

const objectClassField = 'object_class__object_class';

const spendingOverTimeField = `treasury_account_identifier__program_balances__${objectClassField}`;
const spendingByCategoryField = objectClassField;
const awardField = `financial_set__${objectClassField}`;

const commonQuery = (field, values) => ({
    field,
    operation: 'in',
    value: values
});

export const buildBalancesObjectClassQuery = (values) =>
    commonQuery(spendingOverTimeField, values);

export const buildCategoriesObjectClassQuery = (values) =>
    commonQuery(spendingByCategoryField, values);

export const buildAwardsObjectClassQuery = (values) =>
    commonQuery(awardField, values);
