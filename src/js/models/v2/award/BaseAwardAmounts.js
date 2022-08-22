/**
 * BaseAwardAmount.js
 * Created by David Trinh 12/19/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const getCovid19Totals = (arr, defCodes = []) => arr.filter((obj) => defCodes.filter((d) => d?.disaster === "covid_19")?.map((defc) => defc.code).includes(obj?.code)).reduce((acc, obj) => acc + obj?.amount || 0, 0);

const getInfrastructureTotals = (arr) => arr.filter((d) => d?.code === "Z" || d?.code === "1")?.reduce((acc, obj) => acc + obj?.amount || 0, 0);

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
        this._combinedOutlay = parseFloat(
            data.child_award_total_outlay + data.grandchild_award_total_outlay
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
        this._fileCObligatedInfrastructure = getInfrastructureTotals(data.child_account_obligations_by_defc
            .concat(data.grandchild_account_obligations_by_defc));
        this._fileCOutlayInfrastructure = getInfrastructureTotals(data.child_account_obligations_by_defc
            .concat(data.grandchild_account_obligations_by_defc));
    },
    populateIdv(data, defCodes) {
        this._totalObligation = data._totalObligation;
        this._totalOutlay = data._totalOutlay;
        this._childAwardTotalOutlay = data._childAwardTotalOutlay;
        this._grandchildAwardTotalOutlay = data._grandchildAwardTotalOutlay;
        this._baseExercisedOptions = data._baseExercisedOptions;
        this._baseAndAllOptions = data._baseAndAllOptions;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
        this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays);
        this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations);
    },
    populateLoan(data, defCodes) {
        this._subsidy = data._subsidy;
        this._faceValue = data._faceValue;
        this._totalOutlay = data._totalOutlay;
        this._totalObligation = data._totalObligation;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
        this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays);
        this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations);
    },
    populateAsst(data, defCodes) {
        this._totalObligation = data._totalObligation;
        this._totalOutlay = data._totalOutlay;
        this._totalFunding = data._totalFunding;
        this._nonFederalFunding = data._nonFederalFunding;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
        this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays);
        this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations);
    },
    populateContract(data, defCodes) {
        this._totalObligation = data._totalObligation;
        this._totalOutlay = data._totalOutlay;
        this._baseExercisedOptions = data._baseExercisedOptions;
        this._baseAndAllOptions = data._baseAndAllOptions;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
        this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays);
        this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations);
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
        if (Math.abs(this._baseAndAllOptions) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseAndAllOptions);
            if (this._baseAndAllOptions < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._baseAndAllOptions) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseAndAllOptions / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._baseAndAllOptions < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._baseAndAllOptions))})`;
        }
        return MoneyFormatter.formatMoney(this._baseAndAllOptions);
    },
    get totalObligationFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation, 2);
    },
    get combinedOutlayFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._combinedOutlay, 2);
    },
    get combinedOutlayAbbreviated() {
        if (Math.abs(this._combinedOutlay) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._combinedOutlay);
            if (this._combinedOutlay < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._combinedOutlay) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._combinedOutlay / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._combinedOutlay < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._combinedOutlay))})`;
        }
        return MoneyFormatter.formatMoney(this._combinedOutlay);
    },
    get totalOutlayFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalOutlay, 2);
    },
    get totalOutlayAbbreviated() {
        if (Math.abs(this._totalOutlay) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalOutlay);
            if (this._totalOutlay < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._totalOutlay) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalOutlay / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._totalOutlay < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._totalOutlay))})`;
        }
        return MoneyFormatter.formatMoney(this._totalOutlay);
    },
    get totalObligationAbbreviated() {
        if (Math.abs(this._totalObligation) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation);
            if (this._totalObligation < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._totalObligation) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalObligation / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._totalObligation < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._totalObligation))})`;
        }
        return MoneyFormatter.formatMoney(this._totalObligation);
    },
    get infrastructureOutlayFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._fileCOutlayInfrastructure, 2);
    },
    get infrastructureOutlayAbbreviated() {
        if (Math.abs(this._fileCOutlayInfrastructure) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._fileCOutlayInfrastructure);
            if (this._fileCOutlayInfrastructure < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._fileCOutlayInfrastructure) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._fileCOutlayInfrastructure / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._fileCOutlayInfrastructure < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._fileCOutlayInfrastructure))})`;
        }
        return MoneyFormatter.formatMoney(this._fileCOutlayInfrastructure);
    },
    get infrastructureObligationFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._fileCObligatedInfrastructure, 2);
    },
    get infrastructureObligationAbbreviated() {
        if (Math.abs(this._fileCObligatedInfrastructure) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._fileCObligatedInfrastructure);
            if (this._fileCObligatedInfrastructure < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._fileCObligatedInfrastructure) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._fileCObligatedInfrastructure / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._fileCObligatedInfrastructure < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._fileCObligatedInfrastructure))})`;
        }
        return MoneyFormatter.formatMoney(this._fileCObligatedInfrastructure);
    },
    get baseExercisedOptionsFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._baseExercisedOptions, 2);
    },
    get baseExercisedOptionsAbbreviated() {
        if (this._baseExercisedOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseExercisedOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseExercisedOptions / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
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
        if (Math.abs(this._totalFunding) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalFunding);
            if (this._totalFunding < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._totalFunding) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalFunding / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._totalFunding < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._totalFunding))})`;
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
        if (Math.abs(this._nonFederalFunding) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._nonFederalFunding);
            if (this._nonFederalFunding < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._nonFederalFunding) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._nonFederalFunding / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._nonFederalFunding < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._nonFederalFunding))})`;
        }
        return MoneyFormatter.formatMoney(this._nonFederalFunding);
    },
    get faceValueAbbreviated() {
        if (Math.abs(this._faceValue) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._faceValue);
            if (this._faceValue < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._faceValue) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._faceValue / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._faceValue < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._faceValue))})`;
        }
        return MoneyFormatter.formatMoney(this._faceValue);
    },
    get faceValueFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._faceValue, 2);
    },
    get subsidyAbbreviated() {
        if (Math.abs(this._subsidy) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._subsidy);
            if (this._subsidy < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._subsidy) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._subsidy / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._subsidy < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._subsidy))})`;
        }
        return MoneyFormatter.formatMoney(this._subsidy);
    },
    get subsidyFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._subsidy, 2);
    }
};

export default BaseAwardAmounts;
