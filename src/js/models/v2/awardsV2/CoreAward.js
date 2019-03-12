/**
 * CoreAward.js
 * Created by David Trinh 10/9/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';
import { parseDate, formatDate } from './CorePeriodOfPerformance';
import { longTypeDescriptionsByAwardTypes } from "../../../dataMapping/awardsv2/longAwardTypeDescriptions";

const CoreAward = {
    populateCore(data) {
        this._category = data.category;
        this.id = data.id || '';
        this.generatedId = data.generatedId || '';
        this.type = data.type || '';
        this.typeDescription = data.typeDescription || "--";
        this.longTypeDescription =
          longTypeDescriptionsByAwardTypes[data.type] ||
          data.typeDescription ||
          "--";
        this.description = data.description || '--';
        this._subawardTotal = parseFloat(data.subawardTotal) || 0;
        this.subawardCount = parseFloat(data.subawardCount) || 0;
        this._totalObligation = parseFloat(data.totalObligation) || 0;
        this._baseExercisedOptions = parseFloat(data.baseExercisedOptions) || 0;
        this._baseAndAllOptions = parseFloat(data.baseAndAllOptions) || 0;
        this._dateSigned = (data.dateSigned && parseDate(data.dateSigned)) || '';
    },
    get subawardTotal() {
        if (this._subawardTotal >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._subawardTotal);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._subawardTotal / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._subawardTotal, 0);
    },
    get totalObligation() {
        if (this._totalObligation >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalObligation / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation, 0);
    },
    get totalObligationFormatted() {
        return MoneyFormatter.formatMoney(this._totalObligation);
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
    get baseAndAllOptions() {
        if (this._baseAndAllOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseAndAllOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseAndAllOptions / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._baseAndAllOptions, 0);
    },
    get baseAndAllOptionsFormatted() {
        return MoneyFormatter.formatMoney(this._baseAndAllOptions);
    },
    get category() {
        if (this._category === 'loans') {
            return 'loan';
        }
        return this._category;
    },
    get dateSigned() {
        if (this._dateSigned) {
            return formatDate(this._dateSigned);
        }
        return '';
    }
};

export default CoreAward;
