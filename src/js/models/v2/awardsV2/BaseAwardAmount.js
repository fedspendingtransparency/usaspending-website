/**
 * BaseAwardAmount.js
 * Created by David Trinh 12/19/18
 */


import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseAwardAmount = {
    populateCore(data) {
        this.id = data.award_id || '';
        this.generatedId = data.generated_unique_award_id || '';
        this.idvCount = data.idv_count || 0;
        this.contractCount = data.contract_count || 0;
        this._subawardTotal = parseFloat(data.subawardTotal) || 0;
        this.subawardCount = parseFloat(data.subawardCount) || 0;
        this._fundingObligated = parseFloat(data.fundingObligated) || 0;
        this._rolledBaseExercisedOptions = parseFloat(data.rollup_base_exercised_options_val) || 0;
    }
};

export default BaseAwardAmount;
