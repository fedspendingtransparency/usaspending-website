/**
 * ContractTransaction.js
 * Created by Kevin Li 2/25/17
 */

import moment from 'moment';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import GenericRecord from '../GenericRecord';

const recordType = 'contract-transaction';

const fields = [
    'id',
    'type',
    'type_description',
    'action_date',
    'action_type',
    'federal_action_obligation',
    'modification_number',
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
    if (data.federal_action_obligation) {
        formattedData.federal_action_obligation =
            MoneyFormatter.formatMoney(data.federal_action_obligation);
    }
    else {
        formattedData.federal_action_obligation = '';
    }

    return formattedData;
};

class ContractTransaction extends GenericRecord {
    constructor(data) {
        const formattedData = formatData(data);

        super(recordType, fields, formattedData);
    }
}

export default ContractTransaction;
