/**
 * LoanTransaction.js
 * Created by Emily Gullo 04/24/2017
 */

import moment from 'moment';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import GenericRecord from '../GenericRecord';

const recordType = 'loan-transaction';

const fields = [
    'id',
    'type',
    'action_type_description',
    'action_date',
    'modification_number',
    'face_value_loan_guarantee',
    'original_loan_subsidy_cost',
    'description'
];

const formatData = (data) => {
    const formattedData = Object.assign({}, data);

    // format the dates
    if (data.action_date) {
        formattedData.action_date = moment(data.action_date, 'YYYY-MM-DD').format('M/D/YYYY');
    }
    else {
        formattedData.action_date = '';
    }
    // format the money values
    if (data.assistance_data.face_value_loan_guarantee) {
        formattedData.face_value_loan_guarantee =
            MoneyFormatter.formatMoney(data.assistance_data.face_value_loan_guarantee);
    }
    else {
        formattedData.face_value_loan_guarantee = '';
    }
    if (data.assistance_data.original_loan_subsidy_cost) {
        formattedData.original_loan_subsidy_cost =
            MoneyFormatter.formatMoney(data.assistance_data.original_loan_subsidy_cost);
    }
    else {
        formattedData.original_loan_subsidy_cost = '';
    }
    return formattedData;
};

class LoanTransaction extends GenericRecord {
    constructor(data) {
        const formattedData = formatData(data);

        super(recordType, fields, formattedData);
    }
}

export default LoanTransaction;
