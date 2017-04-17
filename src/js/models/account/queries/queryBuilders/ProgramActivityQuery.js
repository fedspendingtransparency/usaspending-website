/**
 * ProgramActivityQuery.jsx
 * Created by michaelbray on 4/17/17.
 */

const programActivityField = 'program_activity__id';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other functions
export const buildProgramActivityQuery = (values) => ({
    field: programActivityField,
    operation: 'in',
    value: values
});
/* eslint-enable import/prefer-default-export */
