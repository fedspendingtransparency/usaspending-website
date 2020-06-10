import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { asstAwardTypesWithSimilarAwardAmountData } from 'dataMapping/award/awardAmountsSection';
import RectanglePercentViz from 'components/award/financialAssistance/RectanglePercentViz';
import { getTooltipPropsByAwardTypeAndSpendingCategory } from '../Tooltips';
import NormalChart from './NormalChart';
import ExceedsCurrentChart from './ExceedsCurrentChart';
import ExceedsPotentialChart from './ExceedsPotentialChart';
import NoResultsMessage from '../../../../sharedComponents/NoResultsMessage';
import GrantChart from './GrantChart';
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

const AwardAmountsChart = ({ awardType, awardOverview, spendingScenario }) => {
    const renderChartBySpendingScenario = (
        scenario = spendingScenario,
        type = awardType,
        awardAmounts = awardOverview) => {
        switch (scenario) {
            case "exceedsBigger":
                return (
                    <ExceedsCurrentChart awardType={type} awardAmounts={awardAmounts} />
                );
            case "exceedsBiggest":
                return (
                    <ExceedsPotentialChart awardType={type} awardAmounts={awardAmounts} />
                );
            case "normal": {
                const props = {
                    denominator: {
                        className: `${awardType}-potential`,
                        rawValue: awardAmounts._baseAndAllOptions,
                        value: awardAmounts.baseAndAllOptionsAbbreviated,
                        color: `#fff`,
                        text: awardType === 'idv'
                            ? "Combined Potential Award Amounts"
                            : "Potential Award Amount",
                        tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'potential', awardAmounts)
                    },
                    numerator: {
                        className: `${awardType}-current`,
                        tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'current', awardAmounts),
                        rawValue: awardAmounts._baseExercisedOptions,
                        value: awardAmounts.baseExercisedOptionsAbbreviated,
                        text: awardType === 'idv'
                            ? "Combined Current Award Amounts"
                            : "Current Award Amount",
                        color: `#d8d8d8`,
                        children: [
                            {
                                className: `${awardType}-obligated`,
                                rawValue: awardAmounts._totalObligation,
                                value: awardAmounts.totalObligationAbbreviated,
                                text: awardType === 'idv'
                                    ? "Combined Obligated Amounts"
                                    : "Obligated Amount",
                                color: `#4773aa`,
                                tooltipData: getTooltipPropsByAwardTypeAndSpendingCategory(awardType, 'obligated', awardAmounts)
                            }
                        ]
                    }
                };
                return (
                    <RectanglePercentViz {...props} />
                );
            }
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
            return <GrantChart awardAmounts={awardAmounts} awardType={type} />;
        }
        else if (type === 'loan' && isNormal) {
            const hasFileC = awardAmounts._fileCObligated > 0;
            const propsWithoutFileC = {
                numerator: {
                    rawValue: awardAmounts._subsidy,
                    value: awardAmounts.subsidyAbbreviated,
                    text: 'Original Subsidy Cost'
                },
                denominator: {
                    rawValue: awardAmounts._faceValue,
                    value: awardAmounts.faceValueAbbreviated,
                    text: 'Face Value of Direct Loan'
                },
                numeratorTooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'subsidy', awardAmounts),
                denominatorTooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'faceValue', awardAmounts),
                numeratorColor: "#F5A623"
            };
            const props = hasFileC
                ? {
                    ...propsWithoutFileC,
                    numerator2: {
                        rawValue: awardAmounts._fileCObligated,
                        value: awardAmounts.fileCObligatedAbbreviated,
                        text: 'COVID-19 Obligated'
                    },
                    numerator3: {
                        rawValue: awardAmounts._fileCOutlay,
                        value: awardAmounts.fileCOutlayAbbreviated,
                        text: 'COVID-19 Outlay'
                    },
                    numerator2Color: "#B699C6",
                    numerator3Color: "#6E338E",
                    numerator2TooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'fileCObligated', awardAmounts),
                    numerator3TooltipData: getTooltipPropsByAwardTypeAndSpendingCategory('loan', 'fileCOutlay', awardAmounts)
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
