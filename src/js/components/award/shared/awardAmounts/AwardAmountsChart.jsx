import React from 'react';
import PropTypes from 'prop-types';

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
    lineOffsetsBySpendingCategory,
    defcTypes
} from 'dataMapping/award/awardAmountsSection';
import { covidColor, covidObligatedColor } from 'dataMapping/covid19/covid19';

import { getTooltipPropsByAwardTypeAndSpendingCategory } from './Tooltips';
import NoResultsMessage from '../../../sharedComponents/NoResultsMessage';
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS } from '../../../../propTypes/index';
import RectanglePercentViz from './RectanglePercentViz';
import HorizontalSingleStackedBarViz from './HorizontalSingleStackedBarViz';

const propTypes = {
    awardType: PropTypes.string,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    spendingScenario: PropTypes.string,
    infrastructureSpending: PropTypes.string,
    fileCType: PropTypes.string
};

// TO-DO: Move these functions to a helper file

const getfileCInfo = (fileCType) => {
    let fileCInfo = null;
    defcTypes.forEach((item) => {
        if (item.codeType === fileCType) {
            fileCInfo = item;
        }
    });

    return fileCInfo;
};

const getAwardTypeText = (awardType, amountType, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);
    const preText = fileCInfo && Object.keys(fileCInfo).length > 0 ? fileCInfo.preText : '';
    return awardType === "idv" ? `Combined ${preText} ${amountType} Amounts` : `${preText} ${amountType} Amount`;
};

// TODO: Address with continued award chart refactor
const getAwardColor = (overallColor, infrastructureColor, fileCColor, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);

    if (fileCInfo?.codeType === "infrastructure") {
        return infrastructureColor;
    }

    if (fileCInfo?.codeType === "covid") {
        return fileCColor;
    }

    return overallColor;
};

const getAwardOutlayRawValue = (data, awardType, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);

    if (fileCInfo?.codeType === "covid") {
        return data._fileCOutlay;
    }

    if (fileCInfo?.codeType === "infrastructure") {
        return data._fileCOutlayInfrastructure;
    }

    return awardType === "idv" ? data._combinedOutlay : data._totalOutlay;
};

const getAwardOutlayValue = (data, awardType, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);

    if (fileCInfo?.codeType === "covid") {
        return data.fileCOutlayAbbreviated;
    }

    if (fileCInfo?.codeType === "infrastructure") {
        return data.infrastructureOutlayAbbreviated;
    }

    return awardType === 'idv' ? data.combinedOutlayAbbreviated : data.totalOutlayAbbreviated;
};

const getAwardObligatedRawValue = (data, awardType, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);

    if (fileCInfo?.codeType === "covid") {
        return data._fileCObligated;
    }

    if (fileCInfo?.codeType === "infrastructure") {
        return data._fileCObligatedInfrastructure;
    }

    return data._totalObligation;
};

const getAwardObligatedValue = (data, awardType, fileCType) => {
    const fileCInfo = getfileCInfo(fileCType);

    if (fileCInfo?.codeType === "covid") {
        return data.fileCObligatedAbbreviated;
    }

    if (fileCInfo?.codeType === "infrastructure") {
        return data.infrastructureObligationAbbreviated;
    }

    return data.totalObligationAbbreviated;
};

// Only for Contract and IDV Awards
const buildNormalProps = (awardType, data, hasfilecCovid, hasOutlays, fileCType) => {
    const chartProps = {
        denominator: {
            labelSortOrder: 3,
            labelPosition: 'bottom',
            className: `${awardType}-potential`,
            rawValue: data._baseAndAllOptions,
            value: data.baseAndAllOptionsAbbreviated,
            color: potentialColor,
            lineOffset: lineOffsetsBySpendingCategory.potential,
            text: awardType === 'idv'
                ? "Combined Potential Award Amounts"
                : "Potential Award Amount",
            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'potential', data)
        },
        numerator: {
            labelSortOrder: 1,
            labelPosition: 'bottom',
            className: `${awardType}-current`,
            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'current', data),
            rawValue: data._baseExercisedOptions,
            denominatorValue: data._baseAndAllOptions,
            value: data.baseExercisedOptionsAbbreviated,
            lineOffset: lineOffsetsBySpendingCategory.current,
            text: awardType === 'idv'
                ? "Combined Current Award Amounts"
                : "Current Award Amount",
            color: currentColor,
            children: [
                {
                    labelSortOrder: 0,
                    labelPosition: 'top',
                    className: `${awardType}-obligated`,
                    rawValue: data._totalObligation,
                    denominatorValue: data._baseExercisedOptions,
                    value: data.totalObligationAbbreviated,
                    text: awardType === 'idv'
                        ? "Combined Obligated Amounts"
                        : "Obligated Amount",
                    color: obligatedColor,
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'obligated', data),
                    lineOffset: lineOffsetsBySpendingCategory.obligationProcurement
                }
            ]
        }
    };
    const chartPropsOutlays = {
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
    if (hasfilecCovid || fileCType === "infrastructure" || hasOutlays) return chartPropsOutlays;
    return chartProps;
};

// Only for Contract and IDV Awards
const buildExceedsCurrentProps = (awardType, data, hasfilecCovid) => {
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
const buildExceedsPotentialProps = (awardType, data, hasfilecCovid) => {
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

const AwardAmountsChart = ({
    awardType,
    awardOverview,
    spendingScenario,
    fileCType
}) => {
    const renderChartBySpendingScenario = (
        scenario = spendingScenario,
        type = awardType,
        awardAmounts = awardOverview
    ) => {
        const hasfilecCovid = fileCType === "covid";
        const infrastructure = fileCType === "infrastructure";
        const hasOutlays = awardOverview._combinedOutlay > 0 || awardOverview._totalOutlay > 0;

        switch (scenario) {
            case "exceedsBigger": {
                return (
                    <RectanglePercentViz {...buildExceedsCurrentProps(type, awardAmounts, hasfilecCovid)} />
                );
            }
            case "exceedsBiggest": {
                return (
                    <RectanglePercentViz {...buildExceedsPotentialProps(type, awardAmounts, hasfilecCovid)} />
                );
            }
            case "normal":
                if (hasOutlays || infrastructure || hasfilecCovid) {
                    return (
                        <HorizontalSingleStackedBarViz {...buildNormalProps(type, awardAmounts, hasfilecCovid, hasOutlays, fileCType)} />
                    );
                }
                return (
                    <RectanglePercentViz {...buildNormalProps(type, awardAmounts, hasfilecCovid)} />
                );
            default:
                return (
                    <div className="results-table-message-container">
                        <NoResultsMessage title="Chart Not Available" message="Data in this instance is not suitable for charting" />
                    </div>
                );
        }
    };

    const renderChartByAwardType = (awardAmounts = awardOverview, type = awardType, scenario = spendingScenario) => {
        const isNormal = scenario === 'normal';
        const showFilecCovid = fileCType === "covid";
        const hasInfrastructure = fileCType === "infrastructure";
        const hasOutlays = awardAmounts._combinedOutlay > 0 || awardAmounts._totalOutlay > 0;

        if (asstAwardTypesWithSimilarAwardAmountData.includes(type) && isNormal) {
            const isNffZero = awardAmounts._nonFederalFunding === 0;

            const chartProps = {
                denominator: {
                    labelPosition: 'bottom',
                    labelSortOrder: 2,
                    className: `asst-total-funding`,
                    rawValue: awardAmounts._totalFunding,
                    value: awardAmounts.totalFundingAbbreviated,
                    color: `#FFF`,
                    lineOffset: 0,
                    text: `Total Funding`,
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'totalFunding', awardAmounts)
                },
                numerator: {
                    className: `asst-obligation`,
                    labelSortOrder: 0,
                    labelPosition: 'top',
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'obligated', awardAmounts),
                    rawValue: awardAmounts._totalObligation,
                    denominatorValue: awardAmounts._totalFunding,
                    value: awardAmounts.totalObligationAbbreviated,
                    lineOffset: lineOffsetsBySpendingCategory.obligationAsst,
                    text: 'Obligated Amount',
                    color: obligatedColor
                },
                ...isNffZero ? {} : {
                    numerator2: {
                        className: awardAmounts._nonFederalFunding > 0 ? `asst-non-federal-funding` : `asst-nff-zero`,
                        labelSortOrder: 1,
                        labelPosition: 'bottom',
                        // fudging this for to get the correct tooltip position.
                        rawValue: awardAmounts._nonFederalFunding + awardAmounts._totalObligation,
                        denominatorValue: awardAmounts._totalFunding,
                        lineOffset: lineOffsetsBySpendingCategory.nonFederalFunding,
                        barWidthOverrides: {
                            applyToLine: true,
                            rawValue: awardAmounts._nonFederalFunding,
                            denominatorValue: awardAmounts._totalFunding
                        },
                        value: awardAmounts.nonFederalFundingAbbreviated,
                        color: nonFederalFundingColor,
                        text: "Non Federal Funding",
                        tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'nonFederalFunding', awardAmounts)
                    }
                }
            };
            const chartPropsOutlays = {
                denominator: {
                    labelPosition: 'bottom',
                    labelSortOrder: 3,
                    className: `asst-total-funding`,
                    rawValue: awardAmounts._totalFunding,
                    value: awardAmounts.totalFundingAbbreviated,
                    color: `#FFF`,
                    lineOffset: 0,
                    text: `Total Funding`,
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'totalFunding', awardAmounts)
                },
                numerator: {
                    className: `asst-non-federal-funding`,
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
                            className: `asst-obligation`,
                            labelSortOrder: 1,
                            labelPosition: 'top',
                            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'obligated', awardAmounts),
                            rawValue: getAwardObligatedRawValue(awardAmounts, awardType, fileCType),
                            denominatorValue: awardAmounts._totalFunding,
                            value: getAwardObligatedValue(awardAmounts, awardType, fileCType),
                            lineOffset: lineOffsetsBySpendingCategory.obligationAsst,
                            text: getAwardTypeText(awardType, "Obligated", fileCType),
                            color: getAwardColor(obligatedColor, infrastructureObligatedColor, fileCType)
                        }
                    ]
                },
                numerator2: {
                    labelSortOrder: 0,
                    labelPosition: 'top',
                    className: `${awardType}-outlayed`,
                    rawValue: getAwardOutlayRawValue(awardAmounts, awardType, fileCType),
                    value: getAwardOutlayValue(awardAmounts, awardType, fileCType),
                    color: getAwardColor(outlayColor, infrastructureOutlayColor, fileCType),
                    lineOffset: lineOffsetsBySpendingCategory.potential,
                    text: getAwardTypeText(awardType, "Outlayed", fileCType)
                }
            };
            if (showFilecCovid) {
                // eslint-disable-next-line no-multi-assign
                chartProps.numerator.children = [
                    {
                        labelSortOrder: 1,
                        labelPosition: 'top',
                        className: `asst-file-c-obligated`,
                        tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCObligated', awardAmounts),
                        rawValue: awardAmounts._fileCObligated,
                        denominatorValue: awardAmounts._totalObligation,
                        value: awardAmounts.fileCObligatedAbbreviated,
                        lineOffset: lineOffsetsBySpendingCategory.fileCAsstObligation,
                        text: 'COVID-19 Obligated Amount',
                        color: covidObligatedColor,
                        children: [{
                            labelSortOrder: 0,
                            labelPosition: 'bottom',
                            className: `${awardAmounts._fileCOutlay > 0 ? `asst-file-c-outlay` : `asst-file-c-outlay--zero`}`,
                            lineOffset: lineOffsetsBySpendingCategory.fileCAsstOutlay,
                            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCOutlay', awardAmounts),
                            denominatorValue: awardAmounts._fileCObligated,
                            rawValue: awardAmounts._fileCOutlay,
                            value: awardAmounts.fileCOutlayAbbreviated,
                            text: 'COVID-19 Outlayed Amount',
                            color: covidColor
                        }]
                    }
                ];
            }
            if ((hasOutlays || hasInfrastructure) && !showFilecCovid) {
                return (
                    <HorizontalSingleStackedBarViz {...chartPropsOutlays} />
                );
            }

            return (
                <RectanglePercentViz {...chartProps} />
            );
        }
        else if (type === 'loan' && isNormal) {
            const propsWithoutFileC = {
                numerator: {
                    labelPosition: 'top',
                    labelSortOrder: 0,
                    className: `${awardType}-subsidy`,
                    rawValue: awardAmounts._subsidy,
                    value: awardAmounts.subsidyAbbreviated,
                    lineOffset: lineOffsetsBySpendingCategory.subsidy,
                    text: 'Original Subsidy Cost',
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'subsidy', awardAmounts),
                    color: subsidyColor
                },
                denominator: {
                    labelPosition: 'bottom',
                    labelSortOrder: 3,
                    className: `${awardType}-face-value`,
                    rawValue: awardAmounts._faceValue,
                    value: awardAmounts.faceValueAbbreviated,
                    lineOffset: lineOffsetsBySpendingCategory.faceValue,
                    color: faceValueColor,
                    text: 'Face Value of Direct Loan',
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'faceValue', awardAmounts)
                }
            };

            const hasOutlaysOrHasInfrastructureProps = {
                numerator: {
                    labelPosition: 'bottom',
                    labelSortOrder: 1,
                    className: `${awardType}-subsidy`,
                    rawValue: awardAmounts._subsidy,
                    value: awardAmounts.subsidyAbbreviated,
                    lineOffset: lineOffsetsBySpendingCategory.subsidy,
                    text: 'Original Subsidy Cost',
                    color: subsidyColor,
                    children: [
                        {
                            className: `asst-obligation`,
                            labelSortOrder: 1,
                            labelPosition: 'top',
                            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'obligated', awardAmounts),
                            rawValue: getAwardObligatedRawValue(awardAmounts, awardType, fileCType),
                            denominatorValue: awardAmounts._totalFunding,
                            value: getAwardObligatedValue(awardAmounts, awardType, fileCType),
                            lineOffset: lineOffsetsBySpendingCategory.obligationAsst,
                            text: 'Obligated Amount',
                            color: getAwardColor(obligatedColor, infrastructureObligatedColor, fileCType)
                        }
                    ]
                },
                denominator: {
                    labelPosition: 'bottom',
                    labelSortOrder: 3,
                    className: `${awardType}-face-value`,
                    rawValue: awardAmounts._faceValue,
                    value: awardAmounts.faceValueAbbreviated,
                    lineOffset: lineOffsetsBySpendingCategory.faceValue,
                    color: faceValueColor,
                    text: 'Face Value of Direct Loan'
                },
                numerator2: {
                    labelSortOrder: 0,
                    labelPosition: 'top',
                    className: `${awardType}-outlayed`,
                    rawValue: getAwardOutlayRawValue(awardAmounts, awardType, fileCType),
                    value: getAwardOutlayValue(awardAmounts, awardType, fileCType),
                    color: getAwardColor(outlayColor, infrastructureOutlayColor, fileCType),
                    lineOffset: lineOffsetsBySpendingCategory.potential,
                    text: 'Outlayed Amount'
                }
            };
            const props = showFilecCovid
                ? {
                    ...propsWithoutFileC,
                    numerator: {
                        ...propsWithoutFileC.numerator,
                        children: [{
                            labelPosition: 'top',
                            labelSortOrder: 1,
                            rawValue: awardAmounts._fileCObligated,
                            value: awardAmounts.fileCObligatedAbbreviated,
                            text: 'COVID-19 Obligated Amount',
                            className: `loan-file-c-obligated`,
                            denominatorValue: awardAmounts._subsidy,
                            lineOffset: lineOffsetsBySpendingCategory.loanFileCObligated,
                            color: covidObligatedColor,
                            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'fileCObligated', awardAmounts),
                            children: [{
                                className: `${awardAmounts._fileCOutlay > 0 ? `loan-file-c-outlay` : `loan-file-c-outlay--zero`}`,
                                labelPosition: 'bottom',
                                labelSortOrder: 0,
                                rawValue: awardAmounts._fileCOutlay,
                                value: awardAmounts.fileCOutlayAbbreviated,
                                denominatorValue: awardAmounts._fileCObligated,
                                lineOffset: lineOffsetsBySpendingCategory.loanFileCOutlay,
                                text: 'COVID-19 Outlayed Amount',
                                color: covidColor,
                                tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'fileCOutlay', awardAmounts)
                            }]
                        }]
                    },
                    numerator2: {
                        labelSortOrder: 0,
                        labelPosition: 'top',
                        className: `${awardType}-outlayed`,
                        rawValue: getAwardOutlayRawValue(awardAmounts, awardType, fileCType),
                        value: getAwardOutlayValue(awardAmounts, awardType, fileCType),
                        color: getAwardColor(outlayColor, infrastructureOutlayColor, fileCType),
                        lineOffset: lineOffsetsBySpendingCategory.potential,
                        text: 'Outlayed Amount'
                    }
                }
                : propsWithoutFileC;
            if (showFilecCovid) {
                return <HorizontalSingleStackedBarViz {...props} />;
            }
            else if (hasOutlays || hasInfrastructure) {
                return <HorizontalSingleStackedBarViz {...hasOutlaysOrHasInfrastructureProps} />;
            }
            return <RectanglePercentViz {...props} />;
        }
        else if (type === 'idv' || type === 'contract') {
            return renderChartBySpendingScenario(scenario);
        }
        return (
            <div className="results-table-message-container">
                <NoResultsMessage title="Chart Not Available" message="Data in this instance is not suitable for charting" />
            </div>
        );
    };

    const visualization = renderChartByAwardType(awardOverview, awardType, spendingScenario);

    return (
        <React.Fragment>
            {visualization}
        </React.Fragment>
    );
};

AwardAmountsChart.propTypes = propTypes;

export default AwardAmountsChart;
