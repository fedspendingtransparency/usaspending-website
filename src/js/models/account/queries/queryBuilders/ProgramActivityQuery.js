/**
 * ProgramActivityQuery.jsx
 * Created by michaelbray on 4/17/17.
 */

const programActivityField = 'program_activity__id';

const spendingOverTimeField =
    `treasury_account_identifier__program_balances__${programActivityField}`;
const spendingByCategoryField = programActivityField;
const awardField = `financial_set__${programActivityField}`;

export const commonQuery = (field, values) => ({
    field,
    operation: 'in',
    value: values
});

export const buildBalancesProgramActivityQuery = (values) =>
    commonQuery(spendingOverTimeField, values);

export const buildCategoriesProgramActivityQuery = (values) =>
    commonQuery(spendingByCategoryField, values);

export const buildAwardsProgramActivityQuery = (values) =>
    commonQuery(awardField, values);
