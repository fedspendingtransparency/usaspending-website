/**
 * awardAmountChartHelper.js
 * Created by Andrea Blackwell March 2, 2023
 */

import {
    outlayColor,
    obligatedColor,
    currentColor,
    potentialColor,
    nonFederalFundingColor,
    subsidyColor,
    faceValueColor,
    infrastructureOutlayColor,
    infrastructureObligatedColor,
    infrastructureCurrentColor,
    infrastructurePotentialColor,
    // Offsets per DEV-5242:
    lineOffsetsBySpendingCategory,
    defcTypes
} from 'dataMapping/award/awardAmountsSection';

import { covidColor, covidObligatedColor } from 'dataMapping/covid19/covid19';

export const getfileCInfo = (fileCType) => {
    let fileCInfo = null;
    defcTypes.forEach((item) => {
        if (item.codeType === fileCType) {
            fileCInfo = item;
        }
    });

    return fileCInfo;
};

export const getAwardTypeText = (awardType, amountType, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);
    const preText = fileCInfo && Object.keys(fileCInfo)?.length > 0 ? fileCInfo.preText : '';
    return awardType === "idv" ? `Combined ${preText} ${amountType} Amounts` : `${preText} ${amountType} Amount`;
};

// TODO: Address with continued award chart refactor
export const getAwardColor = (overallColor, infrastructureColor, fileCColor, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);

    if (fileCInfo?.codeType === "infrastructure") {
        return infrastructureColor;
    }

    if (fileCInfo?.codeType === "covid") {
        return fileCColor;
    }

    return overallColor;
};

export const getAwardOutlayRawValue = (data, awardType, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);

    if (fileCInfo?.codeType === "covid") {
        return data._fileCOutlay;
    }

    if (fileCInfo?.codeType === "infrastructure") {
        return data._fileCOutlayInfrastructure;
    }

    return awardType === "idv" ? data._combinedOutlay : data._totalOutlay;
};

export const getAwardOutlayValue = (data, awardType, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);

    if (fileCInfo?.codeType === "covid") {
        return data.fileCOutlayAbbreviated;
    }

    if (fileCInfo?.codeType === "infrastructure") {
        return data.infrastructureOutlayAbbreviated;
    }

    return awardType === 'idv' ? data.combinedOutlayAbbreviated : data.totalOutlayAbbreviated;
};

export const getAwardObligatedRawValue = (data, awardType, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);

    if (fileCInfo?.codeType === "covid") {
        return data._fileCObligated;
    }

    if (fileCInfo?.codeType === "infrastructure") {
        return data._fileCObligatedInfrastructure;
    }

    return data._totalObligation;
};

export const getAwardObligatedValue = (data, awardType, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);

    if (fileCInfo?.codeType === "covid") {
        return data.fileCObligatedAbbreviated;
    }

    if (fileCInfo?.codeType === "infrastructure") {
        return data.infrastructureObligationAbbreviated;
    }

    return data.totalObligationAbbreviated;
};

/** The functions below build the props necessary for teh HorizontalSingleStackedBarViz (ie. the latest version of the bar chart).
    For each function the following is true -
        The numerator2 and numerator children should be displayed above the bars in the chart
            numerator2 => outlay
            numerator children => obligated
        The numerator and denominator should show below the bars in the chart
            numerator => current (Non-Federal Funding or Subsidy Cost depending on the award type)
            denominator => potential (Total Funding or Face Value of Direct Loan depending on the award type)
**/

// Only for Contract and IDV Awards
export const buildContractIDVProps = (awardType, data, hasfilecCovid, hasOutlays, fileCType) => {
    const chartProps = {
        denominator: {
            labelSortOrder: 3,
            labelPosition: 'bottom',
            className: `${awardType}-potential`,
            rawValue: data._baseAndAllOptions,
            value: data.baseAndAllOptionsAbbreviated,
            color: getAwardColor(potentialColor, infrastructurePotentialColor, covidColor, fileCType),
            lineOffset: lineOffsetsBySpendingCategory.potential,
            text: awardType === 'idv'
                ? "Combined Potential Award Amounts"
                : "Potential Award Amount"
        },
        // outlays numerator
        numerator2: {
            labelSortOrder: 0,
            labelPosition: 'top',
            className: `${awardType}-outlayed`,
            rawValue: getAwardOutlayRawValue(data, awardType, fileCType),
            value: getAwardOutlayValue(data, awardType, fileCType),
            color: getAwardColor(outlayColor, infrastructureOutlayColor, covidColor, fileCType),
            lineOffset: lineOffsetsBySpendingCategory.potential,
            text: getAwardTypeText(awardType, "Outlayed", fileCType)
        },
        numerator: {
            labelSortOrder: 2,
            labelPosition: 'bottom',
            className: `${awardType}-current`,
            rawValue: data._baseExercisedOptions,
            denominatorValue: data._baseAndAllOptions,
            value: data.baseExercisedOptionsAbbreviated,
            lineOffset: lineOffsetsBySpendingCategory.current,
            text: awardType === 'idv'
                ? "Combined Current Award Amounts"
                : "Current Award Amount",
            color: getAwardColor(currentColor, infrastructureCurrentColor, covidColor, fileCType),
            children: [
                {
                    labelSortOrder: 1,
                    labelPosition: 'top',
                    className: `${awardType}-obligated`,
                    rawValue: getAwardObligatedRawValue(data, awardType, fileCType),
                    denominatorValue: data._baseExercisedOptions,
                    value: getAwardObligatedValue(data, awardType, fileCType),
                    text: getAwardTypeText(awardType, "Obligated", fileCType),
                    color: getAwardColor(obligatedColor, infrastructureObligatedColor, covidObligatedColor, fileCType),
                    lineOffset: lineOffsetsBySpendingCategory.obligationProcurement
                }
            ]
        }
    };
    return chartProps;
};

export const buildGrantsDirectOtherProps = (awardType, awardAmounts, hasOutlays, showFilecCovid, fileCType) => {
    const chartProps = {
        denominator: {
            labelPosition: 'bottom',
            labelSortOrder: 3,
            className: `asst-total-funding`,
            rawValue: awardAmounts._totalFunding,
            value: awardAmounts.totalFundingAbbreviated,
            color: `#FFF`,
            lineOffset: 0,
            text: `Total Funding`
        },
        numerator: {
            className: `asst-non-federal-funding ${awardAmounts._nonFederalFunding > 0 ? `` : `asst-nff-zero`}`,
            labelSortOrder: 2,
            labelPosition: 'bottom',
            // fudging this for to get the correct tooltip position.
            rawValue: awardAmounts._nonFederalFunding + awardAmounts._totalObligation,
            lineOffset: lineOffsetsBySpendingCategory.nonFederalFunding,
            barWidthOverrides: {
                applyToLine: true,
                rawValue: awardAmounts._nonFederalFunding,
                denominatorValue: awardAmounts._totalFunding
            },
            value: awardAmounts.nonFederalFundingAbbreviated,
            color: nonFederalFundingColor,
            text: "Non-Federal Funding",
            children: [
                {
                    className: `asst-obligation ${showFilecCovid ? `asst-file-c-obligated` : ``}`,
                    labelSortOrder: 1,
                    labelPosition: 'top',
                    rawValue: getAwardObligatedRawValue(awardAmounts, awardType, fileCType),
                    denominatorValue: awardAmounts._totalFunding,
                    value: getAwardObligatedValue(awardAmounts, awardType, fileCType),
                    lineOffset: lineOffsetsBySpendingCategory.obligationAsst,
                    text: getAwardTypeText(awardType, "Obligated", fileCType),
                    color: getAwardColor(obligatedColor, infrastructureObligatedColor, covidObligatedColor, fileCType)
                }
            ]
        },
        numerator2: {
            labelSortOrder: 0,
            labelPosition: 'top',
            className: `${awardType}-outlayed ${awardAmounts._fileCOutlay > 0 ? `asst-file-c-outlay` : `asst-file-c-outlay--zero`}`,
            rawValue: getAwardOutlayRawValue(awardAmounts, awardType, fileCType),
            value: getAwardOutlayValue(awardAmounts, awardType, fileCType),
            color: getAwardColor(outlayColor, infrastructureOutlayColor, covidColor, fileCType),
            lineOffset: lineOffsetsBySpendingCategory.potential,
            text: getAwardTypeText(awardType, "Outlayed", fileCType)
        }
    };

    return chartProps;
};


export const buildLoanProps = (awardAmounts, awardType) => {
    const props = {
        numerator: {
            labelPosition: 'bottom',
            labelSortOrder: 3,
            className: `${awardType}-subsidy`,
            rawValue: awardAmounts._subsidy,
            value: awardAmounts.subsidyAbbreviated,
            lineOffset: lineOffsetsBySpendingCategory.subsidy,
            text: 'Original Subsidy Cost',
            color: subsidyColor,
            denominatorValue: awardAmounts.faceValueAbbreviated,
            // ticket 9885 requested we remove the obligation amounts from loans pages
            // all the obligation info was in this children array
            // but HorizontalSingleStackedBarViz will fail if we do not send this array
            children: [{}]
        },
        denominator: {
            labelPosition: 'bottom',
            labelSortOrder: 2,
            className: `${awardType}-face-value`,
            rawValue: awardAmounts._faceValue,
            value: awardAmounts.faceValueAbbreviated,
            lineOffset: lineOffsetsBySpendingCategory.faceValue,
            color: faceValueColor,
            text: 'Face Value of Direct Loan'
        },
        // ticket 9885 requested we remove the outlay amounts from loans pages
        // all the outlay info was in this numerator2 object
        // but HorizontalSingleStackedBarViz will fail if we do not send this obj
        numerator2: {}
    };
    return props;
};
