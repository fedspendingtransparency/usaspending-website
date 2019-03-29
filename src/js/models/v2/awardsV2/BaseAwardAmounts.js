/**
 * BaseAwardAmount.js
 * Created by David Trinh 12/19/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseAwardAmounts = {
    populate(data) {
        this.id = data.award_id || '';
        this.generatedId = data.generated_unique_award_id || '';
        this.idvCount = data.idv_count || 0;
        this.contractCount = data.contract_count || 0;
        this._combinedPotentialAwardAmounts = parseFloat(data.rollup_base_and_all_options_value) || 0;
        this._obligation = parseFloat(data.rollup_total_obligation) || 0;
        this._combinedCurrentAwardAmounts = parseFloat(data.rollup_base_exercised_options_val) || 0;
    },
    get combinedPotentialAwardAmounts() {
        return MoneyFormatter.formatMoneyWithPrecision(this._combinedPotentialAwardAmounts, 2);
    },
    get combinedPotentialAwardAmountsFormatted() {
        if (this._combinedPotentialAwardAmounts >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._combinedPotentialAwardAmounts);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._combinedPotentialAwardAmounts / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._combinedPotentialAwardAmounts);
    },
    get obligation() {
        return MoneyFormatter.formatMoneyWithPrecision(this._obligation, 2);
    },
    get obligationFormatted() {
        // TODO - Lizzie: handle negative values
        if (this._obligation >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._obligation);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._obligation / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._obligation);
    },
    get combinedCurrentAwardAmounts() {
        return MoneyFormatter.formatMoneyWithPrecision(this._combinedCurrentAwardAmounts, 2);
    },
    get combinedCurrentAwardAmountsFormatted() {
        if (this._combinedCurrentAwardAmounts >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._combinedCurrentAwardAmounts);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._combinedCurrentAwardAmounts / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._combinedCurrentAwardAmounts);
    },
    get obligatedPercentage() {
        return Math.round(Math.abs((this._obligation / this._combinedPotentialAwardAmounts) * 100));
    },
    get exercisedPercentage() {
        return Math.round(Math.abs((this._combinedCurrentAwardAmounts / this._combinedPotentialAwardAmounts) * 100)) - Math.round(Math.abs((this._obligation / this._combinedPotentialAwardAmounts) * 100));
    },
    get exercisedLabelPercentage() {
        return Math.round(Math.abs((this._combinedCurrentAwardAmounts) / this._combinedPotentialAwardAmounts) * 100);
    }
};

export default BaseAwardAmounts;
