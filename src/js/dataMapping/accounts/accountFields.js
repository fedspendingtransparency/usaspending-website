/**
 * accountFields.js
 * Created by Kevin Li 3/24/17
 */

export const balanceFields = {
    outlay: 'gross_outlay_amount_by_tas_cpe',
    budgetAuthority: 'budget_authority_available_amount_total_cpe',
    obligated: 'obligations_incurred_total_by_tas_cpe',
    unobligated: 'unobligated_balance_cpe'
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
    budgetAuthority: 'budget_authority_available_amount_total_cpe',
    unobligated: 'unobligated_balance_cpe'
};
