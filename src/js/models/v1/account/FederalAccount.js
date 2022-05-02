/**
 * FederalAccount.js
 * Created by Kevin Li 3/24/17
 */

import GenericRecord from '../results/GenericRecord';

const recordType = 'contract-transaction';

const fields = [
    'id',
    'title',
    'agency_identifier',
    'main_account_code',
    'totals',
    'parent_agency_toptier_code'
];

const defaultValues = [
    null,
    '',
    '',
    '',
    {
        available: false,
        obligated: 0,
        unobligated: 0,
        budgetAuthority: 0,
        outlay: 0,
        balanceBroughtForward: 0,
        otherBudgetaryResources: 0,
        appropriations: 0
    },
    ''
];

const formatData = (data) => {
    const formattedData = Object.assign({}, data);

    formattedData.title = data.account_title;

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
