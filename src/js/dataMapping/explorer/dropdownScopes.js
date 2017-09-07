/**
 * dropdownScopes.js
 * Created by Kevin Li 8/17/17
 */

import { BudgetFunction, FederalAccount, ProgramActivity, ObjectClass, Recipient, Award, Agency }
    from 'components/sharedComponents/icons/Icons';

export const dropdownScopes = {
    budget_function: [
        'budget_function',
        'budget_subfunction',
        'federal_account',
        'object_class',
        'recipient',
        'award'
    ],
    agency: [
        'agency',
        'federal_account',
        'object_class',
        'recipient',
        'award'
    ],
    object_class: [
        'object_class',
        'agency',
        'federal_account',
        'recipient',
        'award'
    ]
};

export const rootScopes = [
    'budget_function',
    'agency',
    'object_class'
];

export const icons = {
    budget_function: BudgetFunction,
    budget_subfunction: BudgetFunction,
    federal_account: FederalAccount,
    program_activity: ProgramActivity,
    object_class: ObjectClass,
    recipient: Recipient,
    agency: Agency,
    award: Award
};
