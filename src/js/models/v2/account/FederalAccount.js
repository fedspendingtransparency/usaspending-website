/**
 * FederalAccount.js - v2
 * Created by Justin Le 11/28/18
 */

import GenericRecord from '../../results/GenericRecord';

const recordType = 'contract-transaction';


const fields = [
    'id',
    'title',
    'agency_identifier',
    'account_id',
    'description',
    'totals'
];

const defaultValues = [
    null,
    '',
    '',
    '',
    '',
    'Not available',
    {
        available: false,
        obligated: 0,
        unobligated: 0,
        budgetAuthority: 0,
        outlay: 0,
        balanceBroughtForward: 0,
        otherBudgetaryResources: 0,
        appropriations: 0
    }
];

const formatData = (data) => {
    const formattedData = Object.assign({}, data);


    formattedData.title = data.account_name;

    fields.forEach((field, i) => {
        if (!{}.hasOwnProperty.call(formattedData, field)) {
            formattedData[field] = defaultValues[i];
        }
    });

    return formattedData;
};

class FederalAccount extends GenericRecord {
    constructor(data) {
        const formattedData = formatData(data);

        super(recordType, fields, formattedData);
    }
}

export default FederalAccount;
