/**
 * BaseAwardAmount.js
 * Created by David Trinh 12/19/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const getCovid19Totals = (arr, defCodes = []) => arr
    .filter((obj) => defCodes.includes(obj?.code))
    .reduce((acc, obj) => acc + obj?.amount || 0, 0);

const BaseAwardAmounts = {
    populateBase(data) {
        this.id = (data.award_id && `${data.award_id}`) || '';
        if (data.generatedId) {
            this.generatedId = encodeURIComponent(`${data.generatedId}`);
        }
        this.generatedId = data.generated_unique_award_id
            ? encodeURIComponent(`${data.generated_unique_award_id}`)
            : '';
    },
    populateAggIdv(data, defCodes) {
        this.childIDVCount = data.child_idv_count || 0;
        this.childAwardCount = data.child_award_count || 0;
        this.grandchildAwardCount = data.grandchild_award_count || 0;
        this._baseAndAllOptions = parseFloat(
            data.child_award_base_and_all_options_value + data.grandchild_award_base_and_all_options_value
        ) || 0;
        this._totalObligation = parseFloat(
            data.child_award_total_obligation + data.grandchild_award_total_obligation
        ) || 0;
        this._baseExercisedOptions = parseFloat(
            data.child_award_base_exercised_options_val + data.grandchild_award_base_exercised_options_val
        ) || 0;
        this._fileCOutlay = getCovid19Totals(
            data.child_account_outlays_by_defc
                .concat(data.grandchild_account_outlays_by_defc),
            defCodes
        );
        this._fileCObligated = getCovid19Totals(
            data.child_account_obligations_by_defc
                .concat(data.grandchild_account_obligations_by_defc),
            defCodes
        );
    },
    populateIdv(data, defCodes) {
        this._totalObligation = data._totalObligation;
        this._baseExercisedOptions = data._baseExercisedOptions;
        this._baseAndAllOptions = data._baseAndAllOptions;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
    },
    populateLoan(data, defCodes) {
        this._subsidy = data._subsidy;
        this._faceValue = data._faceValue;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
    },
    populateAsst(data, defCodes) {
        this._totalObligation = data._totalObligation;
        this._totalFunding = data._totalFunding;
        this._nonFederalFunding = data._nonFederalFunding;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
    },
    populateContract(data, defCodes) {
        this._totalObligation = data._totalObligation;
        this._baseExercisedOptions = data._baseExercisedOptions;
        this._baseAndAllOptions = data._baseAndAllOptions;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
    },
    populate(data, awardAmountType, defCodes) {
        this.populateBase(data, awardAmountType);
        if (awardAmountType === 'idv_aggregated') {
            // In every other context, the data has been parsed by CoreAward; here, it's payload straight from the API.
            this.populateAggIdv(data, defCodes);
        }
        else if (awardAmountType === 'idv') {
            this.populateIdv(data, defCodes);
        }
        else if (awardAmountType === 'contract') {
            this.populateContract(data, defCodes);
        }
        else if (awardAmountType === 'loan') {
            this.populateLoan(data, defCodes);
        }
        else {
            // grants, direct payment, insurance, other all use populateAsst
            this.populateAsst(data, defCodes);
        }
    },
    get baseAndAllOptionsFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._baseAndAllOptions, 2);
    },
    get baseAndAllOptionsAbbreviated() {
        if (this._baseAndAllOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseAndAllOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseAndAllOptions / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._baseAndAllOptions);
    },
    get totalObligationFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation, 2);
    },
    get totalObligationAbbreviated() {
        if (Math.abs(this._totalObligation) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation);
            if (this._totalObligation < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._totalObligation) / units.unit, 1)} ${units.unitLabel})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalObligation / units.unit, 1)} ${units.unitLabel}`;
        }
        else if (this._totalObligation < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._totalObligation))})`;
        }
        return MoneyFormatter.formatMoney(this._totalObligation);
    },
    get baseExercisedOptionsFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._baseExercisedOptions, 2);
    },
    get baseExercisedOptionsAbbreviated() {
        if (this._baseExercisedOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseExercisedOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseExercisedOptions / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._baseExercisedOptions);
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
    get fileCOutlayFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._fileCOutlay, 2);
    },
    get fileCOutlayAbbreviated() {
        if (this._fileCOutlay >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._fileCOutlay);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._fileCOutlay) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._fileCOutlay);
    },
    get fileCObligatedFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._fileCObligated, 2);
    },
    get fileCObligatedAbbreviated() {
        if (this._fileCObligated >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._fileCObligated);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._fileCObligated) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._fileCObligated);
    },
    get totalFundingAbbreviated() {
        if (this._totalFunding >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalFunding);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._totalFunding) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._totalFunding);
    },
    get totalFundingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalFunding, 2);
    },
    get nonFederalFundingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._nonFederalFunding, 2);
    },
    get nonFederalFundingAbbreviated() {
        if (this._nonFederalFunding >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._nonFederalFunding);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._nonFederalFunding) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._nonFederalFunding);
    },
    get faceValueAbbreviated() {
        if (this._faceValue >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._faceValue);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._faceValue / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._faceValue);
    },
    get faceValueFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._faceValue, 2);
    },
    get subsidyAbbreviated() {
        if (this._subsidy >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._subsidy);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._subsidy / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._subsidy);
    },
    get subsidyFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._subsidy, 2);
    }
};

export default BaseAwardAmounts;
