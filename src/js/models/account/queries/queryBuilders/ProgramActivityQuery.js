/**
 * ProgramActivityQuery.jsx
 * Created by michaelbray on 4/17/17.
 */

import { _translateFrontendIDToPrimaryKeys } from './_programActivityTranslator';

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
    commonQuery(spendingOverTimeField, _translateFrontendIDToPrimaryKeys(values));

export const buildCategoriesProgramActivityQuery = (values) =>
    commonQuery(spendingByCategoryField, _translateFrontendIDToPrimaryKeys(values));

export const buildAwardsProgramActivityQuery = (values) =>
    commonQuery(awardField, _translateFrontendIDToPrimaryKeys(values));
