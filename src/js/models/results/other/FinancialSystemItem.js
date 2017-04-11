/**
 * FinancialSystemItem.js
 * Created by Kevin LI 3/6/17
 */

import moment from 'moment';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import GenericRecord from '../GenericRecord';

const recordType = 'finsys';
const fields = [
    'id',
    'submissionDate',
    'tas',
    'objectClass',
    'programActivity',
    'fundingObligated',
    'budgetFunction',
    'budgetSubFunction'
];

const remapData = (data) => {
    // remap expected child fields to top-level fields
    const remappedData = data;

    remappedData.submissionDate = '';
    remappedData.tas = '';
    remappedData.objectClass = '';
    remappedData.programActivity = '';
    remappedData.fundingObligated = '';
    remappedData.budgetFunction = '';
    remappedData.budgetSubFunction = '';

    remappedData.id = data.financial_accounts_by_awards_id;

    if (data.certified_date) {
        remappedData.submissionDate = moment(data.certified_date, 'YYYY-MM-DD').format('M/D/YYYY');
    }

    if (data.treasury_account) {
        const tAccount = data.treasury_account;
        if (tAccount.tas_rendering_label) {
            remappedData.tas = tAccount.tas_rendering_label;
        }

        if (tAccount.budget_function_title && tAccount.budget_function_code) {
            remappedData.budgetFunction = `${tAccount.budget_function_title}
            (${tAccount.budget_function_code})`;
        }
        else if (tAccount.budget_function_code) {
            remappedData.budgetFunction = tAccount.budget_function_code;
        }
        else if (tAccount.budget_function_title) {
            remappedData.budgetFunction = tAccount.budget_function_title;
        }

        if (tAccount.budget_subfunction_title && tAccount.budget_subfunction_code) {
            remappedData.budgetSubFunction = `${tAccount.budget_subfunction_title}
            (${tAccount.budget_subfunction_code})`;
        }
        else if (tAccount.budget_subfunction_code) {
            remappedData.budgetSubFunction = tAccount.budget_subfunction_code;
        }
        else if (tAccount.budget_subunction_title) {
            remappedData.budgetSubFunction = tAccount.budget_subfunction_title;
        }
    }

    if (data.object_class) {
        const oClass = data.object_class;
        if (oClass.object_class_name && oClass.object_class) {
            remappedData.objectClass = `${oClass.object_class_name} (${oClass.object_class})`;
        }
        else if (oClass.object_class) {
            remappedData.objectClass = oClass.object_class;
        }
        else if (oClass.object_class_name) {
            remappedData.objectClass = oClass.object_class_name;
        }
    }

    if (data.program_activity) {
        const pActivity = data.program_activity;
        if (pActivity.program_activity_code && pActivity.program_activity_name) {
            remappedData.programActivity =
                `${pActivity.program_activity_name} (${pActivity.program_activity_code})`;
        }
        else if (pActivity.program_activity_code) {
            remappedData.programActivity = pActivity.program_activity_code;
        }
        else if (pActivity.program_activity_name) {
            remappedData.programActivity = pActivity.program_activity_name;
        }
    }


    if (data.transaction_obligated_amount) {
        const amount = data.transaction_obligated_amount;
        remappedData.fundingObligated = MoneyFormatter.formatMoney(amount);
    }

    return remappedData;
};

class FinancialSystemItem extends GenericRecord {
    constructor(data) {
        const remappedData = remapData(data);
        // create the object
        super(recordType, fields, remappedData);
    }
}

export default FinancialSystemItem;
