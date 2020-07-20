import React from 'react';
import PropTypes from 'prop-types';

import GlobalConstants from "GlobalConstants";
import {
    asstAwardTypesWithSimilarAwardAmountData,
    obligatedColor,
    currentColor,
    potentialColor,
    nonFederalFundingColor,
    subsidyColor,
    faceValueColor,
    // Offsets per DEV-5242:
    lineOffsetsBySpendingCategory
} from 'dataMapping/award/awardAmountsSection';
import { covidColor, covidObligatedColor } from 'dataMapping/covid19/covid19';
import RectanglePercentViz from 'components/award/financialAssistance/RectanglePercentViz';

import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';
import NoResultsMessage from '../../../../sharedComponents/NoResultsMessage';
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS } from '../../../../../propTypes/index';

const propTypes = {
    awardType: PropTypes.string,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    spendingScenario: PropTypes.string
};

const isCaresActReleased = GlobalConstants.CARES_ACT_RELEASED;

// Only for Contract and IDV Awards
const buildNormalProps = (awardType, data, hasFileC) => {
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
    if (!hasFileC || !isCaresActReleased) return chartProps;
    return {
        ...chartProps,
        // eslint-disable-next-line no-multi-assign
        numerator: {
            ...chartProps.numerator,
            children: [{
                ...chartProps.numerator.children[0],
                children: [
                    {
                        labelSortOrder: 1,
                        labelPosition: 'top',
                        className: `${awardType}-file-c-obligated`,
                        tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCObligated', data),
                        rawValue: data._fileCObligated,
                        denominatorValue: data._totalObligation,
                        value: data.fileCObligatedAbbreviated,
                        text: 'COVID-19 Response Obligations Amount',
                        color: covidObligatedColor,
                        lineOffset: lineOffsetsBySpendingCategory.fileCProcurementObligated,
                        children: [{
                            labelSortOrder: 0,
                            labelPosition: 'bottom',
                            className: `${data._fileCOutlay > 0 ? `${awardType}-file-c-outlay` : `${awardType}-file-c-outlay--zero`}`,
                            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCOutlay', data),
                            denominatorValue: data._fileCObligated,
                            rawValue: data._fileCOutlay,
                            value: data.fileCOutlayAbbreviated,
                            text: 'COVID-19 Response Outlay Amount',
                            color: covidColor,
                            lineOffset: lineOffsetsBySpendingCategory.fileCProcurementOutlay
                        }]
                    }
                ]
            }]
        }
    };
};

// Only for Contract and IDV Awards
const buildExceedsCurrentProps = (awardType, data, hasFileC) => {
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
    if (!hasFileC || !isCaresActReleased) return chartProps;
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
                                text: 'COVID-19 Response Obligations Amount',
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
                                    text: 'COVID-19 Response Outlay Amount',
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
const buildExceedsPotentialProps = (awardType, data, hasFileC) => {
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
    if (!hasFileC || !isCaresActReleased) return chartProps;
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
                                text: 'COVID-19 Response Obligations Amount',
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
                                    text: 'COVID-19 Response Outlay Amount',
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
    spendingScenario
}) => {
    const renderChartBySpendingScenario = (
        scenario = spendingScenario,
        type = awardType,
        awardAmounts = awardOverview
    ) => {
        const hasFileC = awardAmounts._fileCObligated > 0;
        switch (scenario) {
            case "exceedsBigger": {
                return (
                    <RectanglePercentViz {...buildExceedsCurrentProps(type, awardAmounts, hasFileC)} />
                );
            }
            case "exceedsBiggest": {
                return (
                    <RectanglePercentViz {...buildExceedsPotentialProps(type, awardAmounts, hasFileC)} />
                );
            }
            case "normal":
                return (
                    <RectanglePercentViz {...buildNormalProps(type, awardAmounts, hasFileC)} />
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
        if (asstAwardTypesWithSimilarAwardAmountData.includes(type) && isNormal) {
            const showFileC = awardAmounts._fileCObligated > 0 && isCaresActReleased;
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
            };
            if (showFileC) {
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
                        text: 'COVID-19 Response Obligations Amount',
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
                            text: 'COVID-19 Response Outlay Amount',
                            color: covidColor
                        }]
                    }
                ];
            }
            return (
                <RectanglePercentViz {...chartProps} />
            );
        }
        else if (type === 'loan' && isNormal) {
            const showFileC = awardAmounts._fileCObligated > 0 && isCaresActReleased;
            const propsWithoutFileC = {
                numerator: {
                    labelPosition: 'top',
                    labelSortOrder: 0,
                    className: `${awardType}-subsidy`,
                    rawValue: awardAmounts._subsidy,
                    value: awardAmounts.subsidyAbbreviated,
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
                    color: faceValueColor,
                    text: 'Face Value of Direct Loan',
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'faceValue', awardAmounts)
                }
            };
            const props = showFileC
                ? {
                    ...propsWithoutFileC,
                    numerator: {
                        ...propsWithoutFileC.numerator,
                        children: [{
                            labelPosition: 'top',
                            labelSortOrder: 1,
                            rawValue: awardAmounts._fileCObligated,
                            value: awardAmounts.fileCObligatedAbbreviated,
                            text: 'COVID-19 Response Obligations Amount',
                            className: `loan-file-c-obligated`,
                            denominatorValue: awardAmounts._subsidy,
                            color: covidObligatedColor,
                            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'fileCObligated', awardAmounts),
                            children: [{
                                className: `${awardAmounts._fileCOutlay > 0 ? `loan-file-c-outlay` : `loan-file-c-outlay--zero`}`,
                                labelPosition: 'bottom',
                                labelSortOrder: 0,
                                rawValue: awardAmounts._fileCOutlay,
                                value: awardAmounts.fileCOutlayAbbreviated,
                                denominatorValue: awardAmounts._fileCObligated,
                                text: 'COVID-19 Response Outlay Amount',
                                color: covidColor,
                                tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'fileCOutlay', awardAmounts)
                            }]
                        }]
                    }
                }
                : propsWithoutFileC;
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
