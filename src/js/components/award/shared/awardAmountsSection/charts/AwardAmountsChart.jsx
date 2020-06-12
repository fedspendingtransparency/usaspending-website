import React, { useState } from 'react';
import PropTypes from 'prop-types';

import GlobalConstants from "GlobalConstants";
import { asstAwardTypesWithSimilarAwardAmountData } from 'dataMapping/award/awardAmountsSection';
import RectanglePercentViz from 'components/award/financialAssistance/RectanglePercentViz';

import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';
import ExceedsCurrentChart from './ExceedsCurrentChart';
import ExceedsPotentialChart from './ExceedsPotentialChart';
import NoResultsMessage from '../../../../sharedComponents/NoResultsMessage';
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS } from '../../../../../propTypes/index';

const propTypes = {
    awardType: PropTypes.string,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    spendingScenario: PropTypes.string
};

// eslint-disable-next-line import/prefer-default-export
export const useTooltips = (arrayOfTooltips) => {
    const [activeTooltip, setActiveTooltip] = useState('');
    return [
        activeTooltip,
        () => setActiveTooltip(''),
        ...arrayOfTooltips.map((tt) => () => setActiveTooltip(tt))
    ];
};

const isCaresActReleased = GlobalConstants.CARES_ACT_RELEASED;

const buildNormalProps = (awardType, data, hasFileC) => {
    const chartProps = {
        denominator: {
            labelSortOrder: 3,
            labelPosition: 'bottom',
            className: `${awardType}-potential`,
            rawValue: data._baseAndAllOptions,
            value: data.baseAndAllOptionsAbbreviated,
            color: (isCaresActReleased && hasFileC) ? '#AAC6E2' : `#ececec`,
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
            text: awardType === 'idv'
                ? "Combined Current Award Amounts"
                : "Current Award Amount",
            color: (isCaresActReleased && hasFileC) ? '#558EC6' : `#d8d8d8`,
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
                    color: (isCaresActReleased && hasFileC) ? '#0A2F5A' : `#4773aa`,
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'obligated', data)
                }
            ]
        }
    };
    if (!hasFileC) return chartProps;
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
                        color: `#B699C6`,
                        children: [{
                            labelSortOrder: 0,
                            labelPosition: 'bottom',
                            className: `${awardType}-file-c-outlay`,
                            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCOutlay', data),
                            denominatorValue: data._fileCObligated,
                            rawValue: data._fileCOutlay,
                            value: data.fileCOutlayAbbreviated,
                            text: 'COVID-19 Response Outlay Amount',
                            color: `#6E338E`
                        }]
                    }
                ]
            }]
        }
    };
};

const buildExceedsCurrentProps = (awardType, data, hasFileC) => {
    const showCares = (isCaresActReleased && hasFileC);
    const chartProps = {
        denominator: {
            labelPosition: 'bottom',
            labelSortOrder: 3,
            className: `${awardType}-potential`,
            rawValue: data._baseAndAllOptions,
            value: data.baseAndAllOptionsAbbreviated,
            color: (showCares) ? '#AAC6E2' : `#ececec`,
            text: awardType === 'idv'
                ? "Combined Potential Award Amounts"
                : "Potential Award Amount",
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
            text: awardType === 'idv'
                ? "Combined Current Award Amounts"
                : "Current Award Amount",
            color: (showCares) ? '#0A2F5A' : `#4773aa`,
            children: [{
                labelSortOrder: 0,
                labelPosition: 'top',
                className: `${awardType}-obligated`,
                rawValue: data._totalObligation,
                denominatorValue: data._baseAndAllOptions,
                value: data.totalObligationAbbreviated,
                text: awardType === 'idv'
                    ? "Combined Obligated Amounts"
                    : "Obligated Amount",
                color: (showCares) ? '#0A2F5A' : `#4773aa`,
                tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'obligated', data),
                improper: {
                    labelSortOrder: 1,
                    labelPosition: 'hide',
                    className: `${awardType}-overspending-obligated`,
                    rawValue: data._totalObligation,
                    denominatorValue: data._baseAndAllOptions,
                    value: data.overspendingAbbreviated,
                    text: awardType === 'idv'
                        ? "Exceeds Combined Current Award Amounts"
                        : "Exceeds Current Award Amount",
                    color: (showCares) ? '#0A2F5A' : `#4773aa`,
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
            color: (isCaresActReleased && hasFileC) ? '#0A2F5A' : `#4773aa`,
            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'exceedsCurrent', data)
        }
    };
    if (!showCares) return chartProps;
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
                                color: `#B699C6`,
                                children: [{
                                    labelSortOrder: 0,
                                    labelPosition: 'bottom',
                                    className: `${awardType}-file-c-outlay`,
                                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCOutlay', data),
                                    denominatorValue: data._fileCObligated,
                                    rawValue: data._fileCOutlay,
                                    value: data.fileCOutlayAbbreviated,
                                    barWidthOverrides: {
                                        rawValue: data._fileCOutlay,
                                        denominatorValue: data._fileCObligated
                                    },
                                    text: 'COVID-19 Response Outlay Amount',
                                    color: `#6E338E`
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
                color: (isCaresActReleased && hasFileC) ? '#0A2F5A' : `#4773aa`,
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
            text: null,
            color: `transparent`,
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
                    color: (isCaresActReleased && hasFileC) ? '#0A2F5A' : `#4773aa`
                },
                {
                    className: `${awardType}-extreme-overspending-potential`,
                    labelPosition: 'bottom',
                    labelSortOrder: 2,
                    isImproper: true,
                    rawValue: data._baseAndAllOptions,
                    denominatorValue: data._totalObligation,
                    value: data.baseAndAllOptionsAbbreviated,
                    color: (isCaresActReleased && hasFileC) ? '#0A2F5A' : `#4773aa`,
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
            color: (isCaresActReleased && hasFileC) ? '#AAC6E2' : `#ececec`,
            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'exceedsPotential', data)
        }
    };
    if (!hasFileC) return chartProps;
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
                                color: `#B699C6`,
                                children: [{
                                    labelSortOrder: 0,
                                    labelPosition: 'bottom',
                                    className: `${awardType}-file-c-outlay`,
                                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCOutlay', data),
                                    denominatorValue: data._fileCObligated,
                                    rawValue: data._fileCOutlay,
                                    value: data.fileCOutlayAbbreviated,
                                    barWidthOverrides: {
                                        rawValue: data._fileCOutlay,
                                        denominatorValue: data._fileCObligated
                                    },
                                    text: 'COVID-19 Response Outlay Amount',
                                    color: `#6E338E`
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

const AwardAmountsChart = ({ awardType, awardOverview, spendingScenario }) => {
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
            const showFileC = awardAmounts._fileCObligated > 0 && GlobalConstants.CARES_ACT_RELEASED;
            const chartProps = {
                denominator: {
                    labelPosition: 'bottom',
                    labelSortOrder: 2,
                    className: `asst-total-funding`,
                    rawValue: awardAmounts._totalFunding,
                    value: awardAmounts.totalFundingAbbreviated,
                    color: `#FFF`,
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
                    text: 'Obligated Amount',
                    color: `#4773aa`
                },
                numerator2: {
                    className: awardAmounts._nonFederalFunding > 0 ? `asst-non-federal-funding` : `asst-nff-zero`,
                    labelSortOrder: 1,
                    labelPosition: 'bottom',
                    rawValue: awardAmounts._nonFederalFunding,
                    value: awardAmounts.nonFederalFundingAbbreviated,
                    color: `#47AAA7`,
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
                        text: 'COVID-19 Response Obligations Amount',
                        color: `#B699C6`,
                        children: [{
                            labelSortOrder: 0,
                            labelPosition: 'bottom',
                            className: `asst-file-c-outlay`,
                            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'fileCOutlay', awardAmounts),
                            denominatorValue: awardAmounts._fileCObligated,
                            rawValue: awardAmounts._fileCOutlay,
                            value: awardAmounts.fileCOutlayAbbreviated,
                            text: 'COVID-19 Response Outlay Amount',
                            color: `#6E338E`
                        }]
                    }
                ];
            }
            return (
                <RectanglePercentViz {...chartProps} />
            );
        }
        else if (type === 'loan' && isNormal) {
            const hasFileC = awardAmounts._fileCObligated > 0;
            const propsWithoutFileC = {
                numerator: {
                    labelPosition: 'top',
                    labelSortOrder: 0,
                    className: `${awardType}-subsidy`,
                    rawValue: awardAmounts._subsidy,
                    value: awardAmounts.subsidyAbbreviated,
                    text: 'Original Subsidy Cost',
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'subsidy', awardAmounts),
                    color: '#F5A623'
                },
                denominator: {
                    labelPosition: 'bottom',
                    labelSortOrder: 3,
                    className: `${awardType}-face-value`,
                    rawValue: awardAmounts._faceValue,
                    value: awardAmounts.faceValueAbbreviated,
                    text: 'Face Value of Direct Loan',
                    tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'faceValue', awardAmounts),
                    color: '#fff'
                }
            };
            const props = hasFileC
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
                            color: '#B699C6',
                            tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'fileCObligated', awardAmounts),
                            children: [{
                                className: `loan-file-c-outlay`,
                                labelPosition: 'bottom',
                                labelSortOrder: 0,
                                rawValue: awardAmounts._fileCOutlay,
                                value: awardAmounts.fileCOutlayAbbreviated,
                                denominatorValue: awardAmounts._fileCObligated,
                                text: 'COVID-19 Response Outlay Amount',
                                color: '#6E338E',
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
