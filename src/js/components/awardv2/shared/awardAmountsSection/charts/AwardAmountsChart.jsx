import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import NormalChart from './NormalChart';
import ExceedsCurrentChart from './ExceedsCurrentChart';
import ExceedsPotentialChart from './ExceedsPotentialChart';
import NoResultsMessage from '../../../../sharedComponents/NoResultsMessage';
import GrantChart from './GrantChart';
import { ObligatedAmountTooltip, ExceedsCurrentAmountTooltip, CurrentAmountTooltip, ExceedsPotentialAmountTooltip, PotentialAmountTooltip, NonFederalFundingTooltip, TotalFundingTooltip, SubsidyTooltip, FaceValueTooltip } from '../Tooltips';
import { CombinedObligatedAmounts, CombinedCurrentAmounts, CombinedPotentialAmounts, CombinedExceedsCurrentAmounts, CombinedExceedsPotentialAmounts } from "../../../idv/TooltipContent";
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS } from '../../../../../propTypes/index';
import LoansChart from './LoansChart';

const propTypes = {
    awardType: PropTypes.string,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    spendingScenario: PropTypes.string
};

const spendingCategoriesByAwardType = {
    grant: ["obligated", "nonFederalFunding", "totalFunding"],
    loan: ["subsidy", "faceValue"],
    contract: ["obligated", "current", "potential"]
};

const getSpendingCategoriesByAwardType = (awardType) => {
    if (Object.keys(spendingCategoriesByAwardType).includes(awardType)) {
        return spendingCategoriesByAwardType[awardType];
    }
    return spendingCategoriesByAwardType.contract;
};

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
            case "exceedsCurrent":
                return (
                    <ExceedsCurrentChart awardType={type} awardAmounts={awardAmounts} />
                );
            case "exceedsPotential":
                return (
                    <ExceedsPotentialChart awardType={type} awardAmounts={awardAmounts} />
                );
            case "normal":
                return (
                    <NormalChart awardType={type} awardAmounts={awardAmounts} />
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
        switch (type) {
            case "grant":
                return (
                    <GrantChart awardAmounts={awardAmounts} />
                );
            case "loan":
                return (
                    <LoansChart awardAmounts={awardAmounts} />
                );
            default: // idvs and contracts
                return renderChartBySpendingScenario(scenario);
        }
    };

    const visualization = renderChartByAwardType(awardOverview, awardType, spendingScenario);

    return (
        <React.Fragment>
            {visualization}
        </React.Fragment>
    );
};

AwardAmountsChart.propTypes = propTypes;
