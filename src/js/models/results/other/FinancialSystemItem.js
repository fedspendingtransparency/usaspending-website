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
    'fundingObligated'
];

const remapData = (data) => {
    // remap expected child fields to top-level fields
    const remappedData = data;
    console.log(data);

    remappedData.submissionDate = 'Not Available';
    remappedData.tas = 'Not Available';
    remappedData.objectClass = 'Not Available';
    remappedData.programActivity = 'Not Available';
    remappedData.fundingObligated = 'Not Available';

    remappedData.id = data.financial_accounts_by_awards_id;

    if (data.certified_date) {
        remappedData.submissionDate = moment(data.certified_date, 'YYYY-MM-DD').format('M/D/YYYY');
    }

    if (data.treasury_account.tas_rendering_label) {
        remappedData.tas = data.treasury_account.tas_rendering_label;
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
