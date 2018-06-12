/**
 * BaseAssistanceTransaction.js
 * Created by Lizzie Salita 3/8/18
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { actionTypes } from 'dataMapping/financialAssistance/assistanceActionTypes';
import CoreTransaction from './CoreTransaction';

const BaseAssistanceTransaction = Object.create(CoreTransaction);

BaseAssistanceTransaction.populate = function populate(data) {
    const coreData = {
        id: data.id,
        type: data.type,
        typeDescription: data.type_description,
        actionDate: data.action_date,
        actionType: data.action_type,
        actionTypeDescription: (data.action_type && actionTypes[data.action_type.toUpperCase()]),
        modificationNumber: data.modification_number,
        description: data.description
    };
    this.populateCore(coreData);

    this.typeDescription = data.type_description || '';
    this._federalActionObligation = parseFloat(data.federal_action_obligation) || 0;
};

// getter functions
Object.defineProperty(BaseAssistanceTransaction, 'federalActionObligation', {
    get() {
        return formatMoney(this._federalActionObligation);
    }
});

export default BaseAssistanceTransaction;
