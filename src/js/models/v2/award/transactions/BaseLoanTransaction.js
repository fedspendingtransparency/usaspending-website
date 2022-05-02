/**
 * BaseLoanTransaction.js
 * Created by Lizzie Salita 3/8/18
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { actionTypes } from 'dataMapping/financialAssistance/assistanceActionTypes';
import CoreTransaction from './CoreTransaction';

const BaseLoanTransaction = Object.create(CoreTransaction);

BaseLoanTransaction.populate = function populate(data) {
    const coreData = {
        id: data.id,
        type: data.type,
        typeDescription: data.type_description,
        actionDate: data.action_date,
        actionType: data.action_type,
        actionTypeDescription: (data.action_type && actionTypes[data.action_type].toUpperCase()),
        modificationNumber: data.modification_number,
        description: data.description,
        cfda_number: data.cfda_number
    };
    this.populateCore(coreData);

    this._faceValue = parseFloat(data.face_value_loan_guarantee) || 0;
    this._subsidy = parseFloat(data.original_loan_subsidy_cost) || 0;
};

// getter functions
Object.defineProperty(BaseLoanTransaction, 'faceValue', {
    get() {
        return formatMoney(this._faceValue);
    }
});
Object.defineProperty(BaseLoanTransaction, 'subsidy', {
    get() {
        return formatMoney(this._subsidy);
    }
});

export default BaseLoanTransaction;
