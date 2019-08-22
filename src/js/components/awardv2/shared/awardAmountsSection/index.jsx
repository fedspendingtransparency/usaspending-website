import React from 'react';
import PropTypes from 'prop-types';

import { AwardSection, AwardSectionHeader } from '../../shared';
import { determineSpendingScenario } from "../../../../helpers/aggregatedAmountsHelper";
import NormalChart from './charts/NormalChart';
import ExceedsCurrentChart from './charts/ExceedsCurrentChart';
import ExceedsPotentialChart from './charts/ExceedsPotentialChart';
import NoResultsMessage from '../../../sharedComponents/NoResultsMessage';
import GrantChart from './charts/GrantChart';
import AwardAmountsTable from './AwardAmountsTable';

const propTypes = {
    awardType: PropTypes.oneOf(['idv', 'contract', 'grant']),
    awardOverview: PropTypes.shape({
        // Probably more...? Need to define this elsewhere
        id: PropTypes.string,
        generatedId: PropTypes.string,
        _totalObligation: PropTypes.number,
        obligation: PropTypes.string,
        obligationFormatted: PropTypes.string,
        _baseExercisedOptions: PropTypes.number,
        baseExercisedOptions: PropTypes.string,
        baseExercisedOptionsFormatted: PropTypes.string,
        _baseAndAllOptions: PropTypes.number,
        combinedPotentialAwardAmounts: PropTypes.string,
        combinedPotentialAwardAmountsFormatted: PropTypes.string,
        baseExercisedOptionsFormated: PropTypes.string
        // DEV-2991 TODO: Add Props for Grant Type
    }),
    tooltipProps: PropTypes.shape({
        controlledProps: PropTypes.shape({
            isControlled: PropTypes.bool,
            isVisible: PropTypes.bool,
            closeCurrentTooltip: PropTypes.func,
            showTooltip: PropTypes.func
        })
    })
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
