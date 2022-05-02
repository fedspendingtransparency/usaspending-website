/**
 * CoreAward.js
 * Created by David Trinh 10/9/18
 */
import { upperFirst } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { descriptionsForAwardTypes }
    from 'dataMapping/award/descriptionsForAwardTypes';
import { parseDate, formatDate } from './CorePeriodOfPerformance';

const CoreAward = {
    populateCore(data) {
        this._category = data.category;
        this.id = data.id || '';
        this.generatedId = data.generatedId
            ? encodeURIComponent(`${data.generatedId}`)
            : '';
        this.type = data.type || '';
        this.typeDescription = data.typeDescription || "--";
        this.description = data.description || '--';
        this._subawardTotal = parseFloat(data.subawardTotal) || 0;
        this.subawardCount = parseFloat(data.subawardCount) || 0;
        this._totalObligation = parseFloat(data.totalObligation) || 0;
        this._totalOutlay = parseFloat(data.totalOutlay) || 0;
        this._child_award_total_outlay = parseFloat(data.childAwardTotalOutlay) || 0;
        this._grandchild_award_total_outlay = parseFloat(data.grandchildAwardTotalOutlay) || 0;
        this._baseExercisedOptions = parseFloat(data.baseExercisedOptions) || 0;
        this._baseAndAllOptions = parseFloat(data.baseAndAllOptions) || 0;
        this._dateSigned = (data.dateSigned && parseDate(data.dateSigned)) || '';
        this.naics = data.naics || {};
        this.psc = data.psc || {};
        this.fileC = data.fileC || { obligations: [], outlays: [] };
        this.defCodes = data.fileC
            ? data.fileC
                .obligations
                .concat(data.fileC.outlays)
                .filter(({ amount }) => amount !== 0)
                .reduce((acc, { code }) => ([...new Set([...acc, code])]), [])
            : [];
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
        let percent = (this._subawardTotal / this._totalObligation) * 100;
        if (percent <= 0 || isNaN(percent)) return '0%';
        percent = MoneyFormatter.formatNumberWithPrecision(percent, 1);
        return `${percent}%`;
    },
    get title() {
        if (descriptionsForAwardTypes[this.type]) {
            return descriptionsForAwardTypes[this.type];
        }
        if (this.category) {
            if (this.category === 'idv') {
                return 'IDV';
            }
            return upperFirst(this.category);
        }
        return '--';
    }
};

export default CoreAward;
