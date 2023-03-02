import React from 'react';
import PropTypes from 'prop-types';

import { asstAwardTypesWithSimilarAwardAmountData } from 'dataMapping/award/awardAmountsSection';
import { buildGrantsDirectOtherProps, buildLoanProps, buildContractIDVProps, buildExceedsCurrentProps, buildExceedsPotentialProps } from "helpers/awardAmountChartHelper";

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

const AwardAmountsChart = ({
    awardType,
    awardOverview,
    spendingScenario,
    fileCType
}) => {
    const renderIDVContractChartBySpendingScenario = (
        scenario = spendingScenario,
        type = awardType,
        awardAmounts = awardOverview
    ) => {
        const hasfilecCovid = fileCType === "covid";
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
                return (
                    <HorizontalSingleStackedBarViz {...buildContractIDVProps(type, awardAmounts, hasfilecCovid, hasOutlays, fileCType)} />
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
        // const hasInfrastructure = fileCType === "infrastructure";
        const hasOutlays = awardAmounts._combinedOutlay > 0 || awardAmounts._totalOutlay > 0;

        if (asstAwardTypesWithSimilarAwardAmountData.includes(type) && isNormal) { // grants, direct payments, and other
            return <HorizontalSingleStackedBarViz {...buildGrantsDirectOtherProps(type, awardAmounts, hasOutlays, showFilecCovid, fileCType)} />;
        }
        else if (type === 'loan' && isNormal) {
            return <HorizontalSingleStackedBarViz {...buildLoanProps(awardAmounts, hasOutlays, showFilecCovid, type, fileCType)} />;
        }
        else if (type === 'idv' || type === 'contract') {
            // TODO: This could be removed if we get rid of exceed option
            return renderIDVContractChartBySpendingScenario(scenario);
        }

        return (
            <div className="results-table-message-container">
                <NoResultsMessage title="Chart Not Available" message="Data in this instance is not suitable for charting" />
            </div>
        );
    };

    return (
        <>
            {renderChartByAwardType(awardOverview, awardType, spendingScenario)}
        </>
    );
};

AwardAmountsChart.propTypes = propTypes;

export default AwardAmountsChart;
