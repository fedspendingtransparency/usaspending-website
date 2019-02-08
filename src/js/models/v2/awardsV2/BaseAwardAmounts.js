/**
 * BaseAwardAmount.js
 * Created by David Trinh 12/19/18
 */


import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseAwardAmounts = {
    populateCore(data) {
        this.id = data.award_id || '';
        this.generatedId = data.generated_unique_award_id || '';
        this.idvCount = data.idv_count || 0;
        this.contractCount = data.contract_count || 0;
        this._rolledBaseAllOptions = parseFloat(data.rollup_base_and_all_options_value) || 0;
        this._obligation = parseFloat(data.rollup_total_obligation) || 0;
        this._rolledBaseExercisedOptions = parseFloat(data.rollup_base_exercised_options_val) || 0;
    },
    get rolledBaseExercisedOptions() {
        return MoneyFormatter.formatMoney(this._rolledBaseExercisedOptions);
    },
    get obligation() {
        return MoneyFormatter.formatMoney(this._obligation);
    },
    get rolledBaseAllOptions() {
        return MoneyFormatter.formatMoney(this._rolledBaseAllOptions);
    }
};

export default BaseAwardAmounts;
