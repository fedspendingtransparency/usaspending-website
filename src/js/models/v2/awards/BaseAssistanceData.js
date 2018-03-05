/**
 * BaseAssistanceData.js
 * Created by Lizzie Salita 3/5/18
 */

import { formatMoney } from 'helpers/moneyFormatter';

const BaseAssistanceData = {
    populate(data) {
        this._loanFaceValue = parseFloat(data.face_value_loan_guarantee) || 0;
        this._loanSubsidy = parseFloat(data.original_loan_subsidy_cost) || 0;
    }
};

Object.defineProperty(BaseAssistanceData, 'loanFaceValue', {
    get() {
        return formatMoney(this._loanFaceValue);
    }
});
Object.defineProperty(BaseAssistanceData, 'loanSubsidy', {
    get() {
        return formatMoney(this._loanSubsidy);
    }
});

export default BaseAssistanceData;
