/**
 * CoreAward.js
 * Created by David Trinh 10/9/18
 */


import * as MoneyFormatter from 'helpers/moneyFormatter';

const CoreAward = {
    populateCore(data) {
        this._category = data.category;
        this.id = data.id || '';
        this.type = data.type || '';
        this.typeDescription = data.typeDescription || '--';
        this.description = data.description || '--';
        this._subawardTotal = parseFloat(data.subawardTotal) || 0;
        this.subawardCount = parseFloat(data.subawardCount) || 0;
        this._fundingObligated = parseFloat(data.fundingObligated) || 0;
        this._baseExercisedOptions = parseFloat(data.baseExercisedOptions) || 0;
    },
    get subawardTotal() {
        if (this._subawardTotal >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._subawardTotal);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._subawardTotal / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._subawardTotal, 0);
    },
    get fundingObligated() {
        if (this._fundingObligated >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._fundingObligated);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._fundingObligated / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._fundingObligated, 0);
    },
    get fundingObligatedFormatted() {
        return MoneyFormatter.formatMoney(this._fundingObligated);
    },
    get baseExercisedOptions() {
        if (this._baseExercisedOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseExercisedOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseExercisedOptions / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._baseExercisedOptions, 0);
    },
    get baseExercisedOptionsFormatted() {
        return MoneyFormatter.formatMoney(this._baseExercisedOptions);
    },
    get category() {
        if (this._category === 'loans') {
            return 'loan';
        }
        return this._category;
    }
};

export default CoreAward;
