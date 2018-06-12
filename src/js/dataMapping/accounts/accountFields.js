/**
 * accountFields.js
 * Created by Kevin Li 3/24/17
 */

export const balanceFields = {
    outlay: 'gross_outlay_amount_by_tas_cpe',
    budgetAuthority: 'total_budgetary_resources_amount_cpe',
    obligated: 'obligations_incurred_total_by_tas_cpe',
    unobligated: 'unobligated_balance_cpe',
    balanceBroughtForward1: 'budget_authority_unobligated_balance_brought_forward_fyb',
    balanceBroughtForward2: 'adjustments_to_unobligated_balance_brought_forward_cpe',
    otherBudgetaryResources: 'other_budgetary_resources_amount_cpe',
    appropriations: 'budget_authority_appropriated_amount_cpe'
};

export const categoryLabelFields = {
    programActivity: 'program_activity__program_activity_name',
    objectClass: 'object_class__object_class_name',
    tas: 'treasury_account__tas_rendering_label'
};

export const balanceFieldsFiltered = {
    obligatedFiltered: 'obligations_incurred_by_program_object_class_cpe',
    outlay: 'gross_outlay_amount_by_program_object_class_cpe'
};

export const balanceFieldsNonfiltered = {
    budgetAuthority: 'total_budgetary_resources_amount_cpe',
    unobligated: 'unobligated_balance_cpe'
};

export const fiscalYearSnapshotFields = {
    outlay: 'outlay',
    budget_authority: 'budgetAuthority',
    obligated: 'obligated',
    unobligated: 'unobligated',
    balance_brought_forward: 'balanceBroughtForward',
    other_budgetary_resources: 'otherBudgetaryResources',
    appropriations: 'appropriations'
};
