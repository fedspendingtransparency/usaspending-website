/**
 * CoreAward.js
 * Created by David Trinh 10/9/18
 */
import { startCase } from 'lodash';
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
          startCase(data.typeDescription) ||
          "--";
        this.description = data.description || '--';
        this._subawardTotal = parseFloat(data.subawardTotal) || 0;
        this.subawardCount = parseFloat(data.subawardCount) || 0;
        this._totalObligation = parseFloat(data.totalObligation) || 0;
        this._baseExercisedOptions = parseFloat(data.baseExercisedOptions) || 0;
        this._baseAndAllOptions = parseFloat(data.baseAndAllOptions) || 0;
        this._dateSigned = (data.dateSigned && parseDate(data.dateSigned)) || '';
        this.naics = data.naics || {};
        this.psc = data.psc || {};
    },
    get subawardTotal() {
        if (this._subawardTotal >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._subawardTotal);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._subawardTotal / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._subawardTotal, 0);
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
    },
    get overspendingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation - this._baseExercisedOptions, 2);
    },
    get overspendingAbbreviated() {
        if (this._totalObligation - this._baseExercisedOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation - this._baseExercisedOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._totalObligation - this._baseExercisedOptions) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._totalObligation - this._baseExercisedOptions);
    },
    get extremeOverspendingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation - this._baseAndAllOptions, 2);
    },
    get extremeOverspendingAbbreviated() {
        if (this._totalObligation - this._baseAndAllOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation - this._baseAndAllOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._totalObligation - this._baseAndAllOptions) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._totalObligation - this._baseAndAllOptions);
    },
    get subAwardedPercent() {
        let percent = (this._subawardTotal / this._baseAndAllOptions) * 100;
        percent = MoneyFormatter.formatNumberWithPrecision(percent, 1);
        return percent > 0 ? `${percent}%` : '0%';
    }
};

export default CoreAward;
