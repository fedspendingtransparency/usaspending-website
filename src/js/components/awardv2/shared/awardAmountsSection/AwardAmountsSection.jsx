import React from 'react';

import { AwardSection, AwardSectionHeader } from '../../shared';
import { determineSpendingScenario } from "../../../../helpers/aggregatedAmountsHelper";
import NormalChart from './charts/NormalChart';
import ExceedsCurrentChart from './charts/ExceedsCurrentChart';
import ExceedsPotentialChart from './charts/ExceedsPotentialChart';
import NoResultsMessage from '../../../sharedComponents/NoResultsMessage';
import GrantChart from './charts/GrantChart';
import AwardAmountsTable from './AwardAmountsTable';
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS, TOOLTIP_PROPS, AWARD_TYPE_PROPS } from '../../../../propTypes';

const propTypes = {
    awardType: AWARD_TYPE_PROPS,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    tooltipProps: TOOLTIP_PROPS
};

const AwardAmounts = ({
    awardType,
    awardOverview,
    tooltipProps
}) => {
    const renderChart = (awardAmounts = awardOverview) => {
        if (awardType === 'grant') {
            return (
                <GrantChart
                    awardAmounts={awardAmounts}
                    obligatedTooltipProps={tooltipProps}
                    currentTooltipProps={tooltipProps}
                    potentialTooltipProps={tooltipProps}
                    exceedsCurrentTooltipProps={tooltipProps} />
            );
        }
        switch (determineSpendingScenario(awardAmounts)) {
            case "exceedsCurrent":
                return (
                    <ExceedsCurrentChart
                        awardType={awardOverview.category}
                        awardAmounts={awardAmounts}
                        obligatedTooltipProps={tooltipProps}
                        currentTooltipProps={tooltipProps}
                        potentialTooltipProps={tooltipProps}
                        exceedsCurrentTooltipProps={tooltipProps} />
                );
            case "exceedsPotential":
                return (
                    <ExceedsPotentialChart
                        awardType={awardOverview.category}
                        awardAmounts={awardAmounts}
                        obligatedTooltipProps={tooltipProps}
                        currentTooltipProps={tooltipProps}
                        potentialTooltipProps={tooltipProps}
                        exceedsPotentialTooltipProps={tooltipProps} />
                );
            case "normal":
                return (
                    <NormalChart
                        awardType={awardOverview.category}
                        awardAmounts={awardAmounts}
                        obligatedTooltipProps={tooltipProps}
                        currentTooltipProps={tooltipProps}
                        potentialTooltipProps={tooltipProps} />
                );
            default:
                return (
                    <div className="results-table-message-container">
                        <NoResultsMessage
                            title="Chart Not Available"
                            message="Data in this instance is not suitable for charting" />
                    </div>
                );
        }
    };

    const visualization = renderChart(awardOverview);

    return (
        <AwardSection type="column" className="award-viz award-amounts">
            <div className="award__col__content">
                <AwardSectionHeader title="$ Award Amounts" />
                <div>
                    <div className="award-amounts__content">
                        {visualization}
                        <AwardAmountsTable awardData={awardOverview} awardType={awardType} />
                    </div>
                </div>
            </div>
        </AwardSection>
    );
};

AwardAmounts.propTypes = propTypes;

export default AwardAmounts;
