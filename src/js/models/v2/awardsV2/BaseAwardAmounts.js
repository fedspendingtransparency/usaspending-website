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
        this._rolledBaseAllOptions = parseFloat(data.rollup_base_and_all_options_value) || 0;
        this._obligation = parseFloat(data.rollup_total_obligation) || 0;
        this._rolledBaseExercisedOptions = parseFloat(data.rollup_base_exercised_options_val) || 0;
    },
    get rolledBaseExercisedOptions() {
        return MoneyFormatter.formatMoneyWithPrecision(this._rolledBaseExercisedOptions, 2);
    },
    get rolledBaseExercisedOptionsFormatted() {
        if (this._rolledBaseExercisedOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._rolledBaseExercisedOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._rolledBaseExercisedOptions / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._rolledBaseExercisedOptions);
    },
    get obligation() {
        return MoneyFormatter.formatMoneyWithPrecision(this._obligation, 2);
    },
    get obligationFormatted() {
        if (this._obligation >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._obligation);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._obligation / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._obligation);
    },
    get rolledBaseAllOptions() {
        return MoneyFormatter.formatMoneyWithPrecision(this._rolledBaseAllOptions, 2);
    },
    get rolledBaseAllOptionsFormatted() {
        if (this._rolledBaseAllOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._rolledBaseAllOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._rolledBaseAllOptions / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._rolledBaseAllOptions);
    },
    get obligatedPercentage() {
        return Math.round(Math.abs((this._obligation / this._rolledBaseAllOptions) * 100));
    },
    get exercisedPercentage() {
        return Math.round(Math.abs((this._rolledBaseExercisedOptions / this._rolledBaseAllOptions) * 100)) - Math.round(Math.abs((this._obligation / this._rolledBaseAllOptions) * 100));
    },
    get exercisedLabelPercentage() {
        return Math.round(Math.abs((this._rolledBaseExercisedOptions) / this._rolledBaseAllOptions) * 100);
    },
    get totalCount() {
        return this.idvCount + this.contractCount;
    }
};

export default BaseAwardAmounts;
