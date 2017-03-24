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

    remappedData.submissionDate = '';
    remappedData.tas = '';
    remappedData.objectClass = '';
    remappedData.programActivity = '';
    remappedData.fundingObligated = '';

    remappedData.id = data.financial_accounts_by_awards_id;

    if (data.certified_date) {
        remappedData.submissionDate = moment(data.certified_date, 'YYYY-MM-DD').format('M/D/YYYY');
    }

    if (data.treasury_account.tas_rendering_label) {
        remappedData.tas = data.treasury_account.tas_rendering_label;
    }

    if (data.object_class) {
        remappedData.objectClass = data.object_class;
    }

    if (data.program_activity_code && data.program_activity_name) {
        remappedData.programActivity =
            `${data.program_activity_name} (${data.program_activity_code})`;
    }
    else if (data.program_activity_code) {
        remappedData.programActivity = data.program_activity_code;
    }
    else if (data.program_activity_name) {
        remappedData.programActivity = data.program_activity_name;
    }


    if (data.obligations_incurred_total_by_award_cpe) {
        const amount = data.transaction_obligations[0].obligations_incurred_total_by_award_cpe;
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
