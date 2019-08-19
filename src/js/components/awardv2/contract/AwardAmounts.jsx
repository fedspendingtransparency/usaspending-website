import React from 'react';
import PropTypes from 'prop-types';

import { AwardSection, AwardSectionHeader } from '../shared';
import { determineSpendingScenario } from "../../../helpers/aggregatedAmountsHelper";
import NormalChart from '../shared/charts/NormalChart';
import ExceedsCurrentChart from '../shared/charts/ExceedsCurrentChart';
import ExceedsPotentialChart from '../shared/charts/ExceedsPotentialChart';
import NoResultsMessage from '../../sharedComponents/NoResultsMessage';

const propTypes = {
    awardAmountsProps: PropTypes.shape({
        id: PropTypes.string,
        generatedId: PropTypes.string,
        _obligation: PropTypes.number,
        obligation: PropTypes.string,
        obligationFormatted: PropTypes.string,
        _combinedCurrentAwardAmounts: PropTypes.number,
        combinedCurrentAwardAmounts: PropTypes.string,
        combinedCurrentAwardAmountsFormatted: PropTypes.string,
        _combinedPotentialAwardAmounts: PropTypes.number,
        combinedPotentialAwardAmounts: PropTypes.string,
        combinedPotentialAwardAmountsFormatted: PropTypes.string,
        baseExercisedOptionsFormated: PropTypes.string
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
    awardAmountsProps,
    tooltipProps
}) => {
    const renderChart = (awardAmounts = awardAmountsProps) => {
        switch (determineSpendingScenario(awardAmounts)) {
            case "exceedsCurrent":
                return (
                    <ExceedsCurrentChart
                        awardAmounts={awardAmounts}
                        obligatedTooltipProps={tooltipProps}
                        currentTooltipProps={tooltipProps}
                        potentialTooltipProps={tooltipProps}
                        exceedsCurrentTooltipProps={tooltipProps} />
                );
            case "exceedsPotential":
                return (
                    <ExceedsPotentialChart
                        awardAmounts={awardAmounts}
                        obligatedTooltipProps={tooltipProps}
                        currentTooltipProps={tooltipProps}
                        potentialTooltipProps={tooltipProps}
                        exceedsPotentialTooltipProps={tooltipProps} />
                );
            case "normal":
                return (
                    <NormalChart
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

    const visualization = renderChart(awardAmountsProps);

    return (
        <AwardSection type="column" className="award-viz award-amounts">
            <div className="award__col__content">
                <AwardSectionHeader title="$ Award Amounts" />
                <div>
                    <div className="award-amounts__content">
                        {visualization}
                        <div className="award-amounts__data-wrapper">
                            <div className="award-amounts__data-content">
                                <div><span className="award-amounts__data-icon award-amounts__data-icon_blue" />Obligated Amounts</div>
                                <span>{awardAmountsProps.obligation}</span>
                            </div>
                            <div className="award-amounts__data-content">
                                <div><span className="award-amounts__data-icon award-amounts__data-icon_gray" />Current Award Amounts</div>
                                <span>{awardAmountsProps.combinedCurrentAwardAmounts}</span>
                            </div>
                            <div className="award-amounts__data-content">
                                <div><span className="award-amounts__data-icon award-amounts__data-icon_transparent" />Potential Award Amounts</div>
                                <span>{awardAmountsProps.combinedPotentialAwardAmounts}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AwardSection>
    );
};

AwardAmounts.propTypes = propTypes;

export default AwardAmounts;
