import {
    asstAwardTypesWithSimilarAwardAmountData,
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
    lineOffsetsBySpendingCategory
} from 'dataMapping/award/awardAmountsSection';
import { covidColor, covidObligatedColor } from 'dataMapping/covid19/covid19';
import { getTooltipPropsByAwardTypeAndSpendingCategory } from "../../components/award/shared/awardAmounts/Tooltips";


export const getAwardTypeText = (awardType, amountType, isInfrastructure, isCovid) => {
    let preText = '';
    if (isInfrastructure) {
        preText = "Infrastructure";
    }

    if (isCovid) {
        preText = "COVID-19";
    }

    return awardType === "idv" ? `Combined ${preText} ${amountType} Amounts` : `${preText} ${amountType} Amount`;
};

export const getAwardColor = (overallColor, infrastructureColor, isInfrastructure, isCovid, tempCovidColor) => {
    if (isInfrastructure) {
        return infrastructureColor;
    }

    if (isCovid) {
        return tempCovidColor;
    }

    return overallColor;
};

export const getAwardOutlayRawValue = (data, awardType, isInfrastructure, isCovid) => {
    if (isInfrastructure) {
        return data._fileCOutlayInfrastructure;
    }

    if (isCovid) {
        return data._fileCOutlay;
    }

    return awardType === "idv" ? data._combinedOutlay : data._totalOutlay;
};

export const getAwardOutlayValue = (data, awardType, isInfrastructure, isCovid) => {
    if (isInfrastructure) {
        return data.infrastructureOutlayAbbreviated;
    }

    if (isCovid) {
        return data.fileCOutlayAbbreviated;
    }

    return awardType === 'idv' ? data.combinedOutlayAbbreviated : data.totalOutlayAbbreviated;
};

export const getAwardObligatedRawValue = (data, awardType, isInfrastructure, isCovid) => {
    if (isInfrastructure) {
        return data._fileCObligatedInfrastructure;
    }

    if (isCovid) {
        return data._fileCObligated;
    }

    return data._totalObligation;
};

export const getAwardObligatedValue = (data, awardType, isInfrastructure, isCovid) => {
    if (isInfrastructure) {
        return data.infrastructureObligationAbbreviated;
    }

    if (isCovid) {
        return data.fileCObligatedAbbreviated;
    }

    return data.totalObligationAbbreviated;
};

// Only for Contract and IDV Awards
export const buildNormalProps = (awardType, data, hasfilecCovid, hasOutlays, infrastructure) => {
    // const chartProps = {
    //     denominator: {
    //         labelSortOrder: 3,
    //         labelPosition: 'bottom',
    //         className: `${awardType}-potential`,
    //         rawValue: data._baseAndAllOptions,
    //         value: data.baseAndAllOptionsAbbreviated,
    //         color: potentialColor,
    //         lineOffset: lineOffsetsBySpendingCategory.potential,
    //         text: awardType === 'idv'
    //             ? "Combined Potential Award Amounts"
    //             : "Potential Award Amount",
    //         tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'potential', data)
    //     },
    //     numerator: {
    //         labelSortOrder: 1,
    //         labelPosition: 'bottom',
    //         className: `${awardType}-current`,
    //         tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'current', data),
    //         rawValue: data._baseExercisedOptions,
    //         denominatorValue: data._baseAndAllOptions,
    //         value: data.baseExercisedOptionsAbbreviated,
    //         lineOffset: lineOffsetsBySpendingCategory.current,
    //         text: awardType === 'idv'
    //             ? "Combined Current Award Amounts"
    //             : "Current Award Amount",
    //         color: currentColor,
    //         children: [
    //             {
    //                 labelSortOrder: 0,
    //                 labelPosition: 'top',
    //                 className: `${awardType}-obligated`,
    //                 rawValue: data._totalObligation,
    //                 denominatorValue: data._baseExercisedOptions,
    //                 value: data.totalObligationAbbreviated,
    //                 text: awardType === 'idv'
    //                     ? "Combined Obligated Amounts"
    //                     : "Obligated Amount",
    //                 color: obligatedColor,
    //                 tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'obligated', data),
    //                 lineOffset: lineOffsetsBySpendingCategory.obligationProcurement
    //             }
    //         ]
    //     }
    // };

    console.log(lineOffsetsBySpendingCategory)
    const chartPropsOutlays = {
        denominator: {
            labelSortOrder: 3,
            labelPosition: 'bottom',
            className: `${awardType}-potential`,
            rawValue: data._baseAndAllOptions,
            value: data.baseAndAllOptionsAbbreviated,
            color: getAwardColor(potentialColor, infrastructurePotentialColor, infrastructure, hasfilecCovid, covidColor),
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
            rawValue: getAwardOutlayRawValue(data, awardType, infrastructure, hasfilecCovid),
            value: getAwardOutlayValue(data, awardType, infrastructure, hasfilecCovid),
            color: getAwardColor(outlayColor, infrastructureOutlayColor, infrastructure, hasfilecCovid, covidColor),
            lineOffset: hasfilecCovid ? lineOffsetsBySpendingCategory.fileCProcurementOutlay : null,
            text: getAwardTypeText(awardType, "Outlayed", infrastructure, hasfilecCovid)
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
            color: getAwardColor(currentColor, infrastructureCurrentColor, infrastructure, hasfilecCovid, covidColor),
            children: [
                {
                    labelSortOrder: 1,
                    labelPosition: 'top',
                    className: `${awardType}-obligated`,
                    rawValue: getAwardObligatedRawValue(data, awardType, infrastructure, hasfilecCovid),
                    denominatorValue: data._baseExercisedOptions,
                    value: getAwardObligatedValue(data, awardType, infrastructure, hasfilecCovid),
                    text: getAwardTypeText(awardType, "Obligated", infrastructure, hasfilecCovid),
                    color: getAwardColor(obligatedColor, infrastructureObligatedColor, infrastructure, hasfilecCovid, covidObligatedColor),
                    lineOffset: hasfilecCovid ? lineOffsetsBySpendingCategory.fileCProcurementObligated : lineOffsetsBySpendingCategory.obligationProcurement
                }
            ]
        }
    };

    return chartPropsOutlays;
    // if (hasOutlays && !hasfilecCovid) return chartPropsOutlays; // show outlays for non-covid only first
    // if (!hasfilecCovid) return chartPropsOutlays;
    // return {
    //     ...chartPropsOutlays,
    //     // eslint-disable-next-line no-multi-assign
    //     numerator: {
    //         ...chartPropsOutlays.numerator,
    //         children: [{
    //             ...chartPropsOutlays.numerator.children[0],
    //             children: [
    //                 {
    //                     labelSortOrder: 1,
    //                     labelPosition: 'top',
    //                     className: `${awardType}-file-c-obligated`,
    //                     tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCObligated', data),
    //                     rawValue: data._fileCObligated,
    //                     denominatorValue: data._totalObligation,
    //                     value: data.fileCObligatedAbbreviated,
    //                     text: 'COVID-19 Obligated Amount',
    //                     color: covidObligatedColor,
    //                     lineOffset: lineOffsetsBySpendingCategory.fileCProcurementObligated,
    //                     children: [{
    //                         labelSortOrder: 0,
    //                         labelPosition: 'bottom',
    //                         className: `${data._fileCOutlay > 0 ? `${awardType}-file-c-outlay` : `${awardType}-file-c-outlay--zero`}`,
    //                         tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCOutlay', data),
    //                         denominatorValue: data._fileCObligated,
    //                         rawValue: data._fileCOutlay,
    //                         value: data.fileCOutlayAbbreviated,
    //                         text: 'COVID-19 Outlayed Amount',
    //                         color: covidColor,
    //                         lineOffset: lineOffsetsBySpendingCategory.fileCProcurementOutlay
    //                     }]
    //                 }
    //             ]
    //         }]
    //     }
    // };
};

// Only for Contract and IDV Awards
export const buildExceedsCurrentProps = (awardType, data, hasfilecCovid) => {
    const chartProps = {
        denominator: {
            labelPosition: 'bottom',
            labelSortOrder: 3,
            className: `${awardType}-potential`,
            rawValue: data._baseAndAllOptions,
            value: data.baseAndAllOptionsAbbreviated,
            color: potentialColor,
            text: awardType === 'idv'
                ? "Combined Potential Award Amounts"
                : "Potential Award Amount",
            lineOffset: 0,
            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'potential', data)
        },
        numerator: {
            labelSortOrder: 1,
            labelPosition: 'bottom',
            className: `${awardType}-overspending-current`,
            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'current', data),
            rawValue: data._baseExercisedOptions,
            denominatorValue: data._totalObligation,
            value: data.baseExercisedOptionsAbbreviated,
            lineOffset: lineOffsetsBySpendingCategory.current,
            text: awardType === 'idv'
                ? "Combined Current Award Amounts"
                : "Current Award Amount",
            color: obligatedColor,
            children: [{
                labelSortOrder: 0,
                labelPosition: 'top',
                className: `${awardType}-overspending-obligated`,
                rawValue: data._totalObligation,
                denominatorValue: data._baseAndAllOptions,
                value: data.totalObligationAbbreviated,
                lineOffset: lineOffsetsBySpendingCategory.obligationProcurement,
                text: awardType === 'idv'
                    ? "Combined Obligated Amounts"
                    : "Obligated Amount",
                color: obligatedColor,
                tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'obligated', data),
                improper: {
                    labelSortOrder: 1,
                    labelPosition: 'hide',
                    className: `${awardType}-overspending`,
                    rawValue: data._totalObligation,
                    denominatorValue: data._baseAndAllOptions,
                    value: data.overspendingAbbreviated,
                    text: awardType === 'idv'
                        ? "Exceeds Combined Current Award Amounts"
                        : "Exceeds Current Award Amount",
                    color: obligatedColor,
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'exceedsCurrent', data)
                }
            }]
        },
        numerator2: {
            labelSortOrder: 1,
            labelPosition: 'hide',
            className: `${awardType}-overspending`,
            rawValue: data._totalObligation,
            denominatorValue: data._baseAndAllOptions,
            value: data.overspendingAbbreviated,
            barWidthOverrides: {
                rawValue: data._totalObligation - data._baseExercisedOptions,
                denominatorValue: data._baseAndAllOptions
            },
            text: awardType === 'idv'
                ? "Exceeds Combined Current Award Amounts"
                : "Exceeds Current Award Amount",
            color: obligatedColor,
            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'exceedsCurrent', data)
        }
    };
    if (!hasfilecCovid) return chartProps;
    return {
        ...chartProps,
        // eslint-disable-next-line no-multi-assign
        numerator: {
            ...chartProps.numerator,
            children: chartProps.numerator.children.map((child, i) => {
                if (i === 0) {
                    return {
                        ...child,
                        children: [
                            {
                                labelSortOrder: 1,
                                labelPosition: 'top',
                                className: `${awardType}-file-c-obligated`,
                                tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCObligated', data),
                                rawValue: data._fileCObligated,
                                denominatorValue: data._totalObligation,
                                value: data.fileCObligatedAbbreviated,
                                text: 'COVID-19 Obligated Amount',
                                barWidthOverrides: {
                                    rawValue: data._fileCObligated,
                                    denominatorValue: data._baseExercisedOptions
                                },
                                color: covidObligatedColor,
                                children: [{
                                    labelSortOrder: 0,
                                    labelPosition: 'bottom',
                                    className: `${data._fileCOutlay > 0 ? `${awardType}-file-c-outlay` : `${awardType}-file-c-outlay--zero`}`,
                                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCOutlay', data),
                                    denominatorValue: data._fileCObligated,
                                    rawValue: data._fileCOutlay,
                                    value: data.fileCOutlayAbbreviated,
                                    barWidthOverrides: {
                                        rawValue: data._fileCOutlay,
                                        denominatorValue: data._fileCObligated
                                    },
                                    text: 'COVID-19 Outlayed Amount',
                                    color: covidColor
                                }]
                            }
                        ]
                    };
                }
                return child;
            })

        }
    };
};

// Only for Contract and IDV Awards
export const buildExceedsPotentialProps = (awardType, data, hasfilecCovid) => {
    const chartProps = {
        denominator: {
            labelSortOrder: 0,
            labelPosition: 'top',
            className: `${awardType}-extreme-overspending-obligated`,
            rawValue: data._totalObligation,
            denominatorValue: data._baseAndAllOptions,
            value: data.totalObligationAbbreviated,
            text: awardType === 'idv'
                ? "Combined Obligated Amounts"
                : "Obligated Amount",
            color: `transparent`,
            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'obligated', data),
            lineOffset: lineOffsetsBySpendingCategory.obligationProcurement,
            improper: {
                labelSortOrder: 1,
                labelPosition: 'hide',
                className: `${awardType}-extreme-overspending-label`,
                rawValue: data._totalObligation,
                denominatorValue: data._baseAndAllOptions,
                value: data.overspendingAbbreviated,
                text: awardType === 'idv'
                    ? "Exceeds Combined Potential Award Amounts"
                    : "Exceeds Potential Award Amount",
                color: obligatedColor,
                tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'exceedsCurrent', data)
            }
        },
        numerator: {
            labelSortOrder: 1,
            labelPosition: 'hidden',
            className: `${awardType}-extreme-overspending-potential-wrapper`,
            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'current', data),
            rawValue: data._baseAndAllOptions,
            denominatorValue: data._totalObligation,
            value: data.baseExercisedOptionsAbbreviated,
            lineOffset: 0,
            text: null,
            color: potentialColor,
            children: [
                {
                    labelSortOrder: 1,
                    labelPosition: 'bottom',
                    isImproper: true,
                    className: `${awardType}-extreme-overspending-current`,
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'current', data),
                    rawValue: data._baseExercisedOptions,
                    denominatorValue: data._baseAndAllOptions,
                    value: data.baseExercisedOptionsAbbreviated,
                    text: awardType === 'idv'
                        ? "Combined Current Award Amounts"
                        : "Current Award Amount",
                    color: obligatedColor,
                    lineOffset: lineOffsetsBySpendingCategory.current
                },
                {
                    className: `${awardType}-extreme-overspending-potential`,
                    labelPosition: 'bottom',
                    labelSortOrder: 2,
                    isImproper: true,
                    rawValue: data._baseAndAllOptions,
                    denominatorValue: data._totalObligation,
                    value: data.baseAndAllOptionsAbbreviated,
                    color: obligatedColor,
                    lineOffset: 0,
                    barWidthOverrides: {
                        rawValue: data._baseAndAllOptions - data._baseExercisedOptions,
                        denominatorValue: data._baseAndAllOptions
                    },
                    text: awardType === 'idv'
                        ? "Combined Potential Award Amounts"
                        : "Potential Award Amount",
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'potential', data)
                }
            ]
        },
        numerator2: {
            labelSortOrder: 2,
            labelPosition: 'hide',
            className: `${awardType}-extreme-overspending`,
            rawValue: data._totalObligation,
            denominatorValue: data._baseAndAllOptions,
            value: data.extremeOverspendingAbbreviated,
            barWidthOverrides: {
                rawValue: data._totalObligation - data._baseAndAllOptions,
                denominatorValue: data._totalObligation
            },
            text: awardType === 'idv'
                ? "Exceeds Combined Potential Award Amounts"
                : "Exceeds Potential Award Amount",
            color: potentialColor,
            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'exceedsPotential', data)
        }
    };
    if (!hasfilecCovid) return chartProps;
    return {
        ...chartProps,
        // eslint-disable-next-line no-multi-assign
        numerator: {
            ...chartProps.numerator,
            children: chartProps.numerator.children.map((child, i) => {
                if (i === 0) {
                    return {
                        ...child,
                        children: [
                            {
                                labelSortOrder: 1,
                                labelPosition: 'top',
                                className: `${awardType}-file-c-obligated`,
                                tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCObligated', data),
                                rawValue: data._fileCObligated,
                                denominatorValue: data._totalObligation,
                                value: data.fileCObligatedAbbreviated,
                                text: 'COVID-19 Obligated Amount',
                                barWidthOverrides: {
                                    rawValue: data._fileCObligated,
                                    denominatorValue: data._baseExercisedOptions
                                },
                                color: covidObligatedColor,
                                children: [{
                                    labelSortOrder: 0,
                                    labelPosition: 'bottom',
                                    className: `${data._fileCOutlay > 0 ? `${awardType}-file-c-outlay` : `${awardType}-file-c-outlay--zero`}`,
                                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCOutlay', data),
                                    denominatorValue: data._fileCObligated,
                                    rawValue: data._fileCOutlay,
                                    value: data.fileCOutlayAbbreviated,
                                    barWidthOverrides: {
                                        rawValue: data._fileCOutlay,
                                        denominatorValue: data._fileCObligated
                                    },
                                    text: 'COVID-19 Outlayed Amount',
                                    color: covidColor
                                }]
                            }
                        ]
                    };
                }
                return child;
            })
        }
    };
};
