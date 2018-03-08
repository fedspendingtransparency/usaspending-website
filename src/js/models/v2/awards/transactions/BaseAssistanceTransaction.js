/**
 * BaseAssistanceTransaction.js
 * Created by Lizzie Salita 3/8/18
 */

import { formatMoney } from 'helpers/moneyFormatter';
import CoreTransaction from './CoreTransaction';

const BaseAssistanceTransaction = Object.create(CoreTransaction);

BaseAssistanceTransaction.populate = function populate(data) {
    const coreData = {
        id: data.id,
        type: data.type,
        typeDescription: data.type_description,
        actionDate: data.action_date,
        actionType: data.action_type,
        actionTypeDescription: data.action_type_description,
        modificationNumber: data.modification_number,
        description: data.description
    };
    this.populateCore(coreData);

    this.typeDescription = data.type_description || '';
    this.assistance_data = data.assistance_data || '';
    this._federalActionObligation = parseFloat(data.federal_action_obligation) || 0;
};

// getter functions
Object.defineProperty(BaseAssistanceTransaction, 'federalActionObligation', {
    get() {
        return formatMoney(this._federalActionObligation);
    }
});

export default BaseAssistanceTransaction;
