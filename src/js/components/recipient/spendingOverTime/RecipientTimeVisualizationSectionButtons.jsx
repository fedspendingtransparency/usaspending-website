import React from "react";
import PropTypes from "prop-types";

import TimeVisualizationPeriodButton from
    "../../search/resultsView/time/TimeVisualizationPeriodButton";

const propTypes = {
    visualizationPeriod: PropTypes.string,
    updateVisualizationPeriod: PropTypes.func
};

const RecipientTimeVisualizationSectionButtons = ({
    visualizationPeriod, updateVisualizationPeriod
}) => (
    <div className="recipient-visualization-period">
        <div className="visualization-period">
            <div className="content">
                <ul>
                    <li>
                        <TimeVisualizationPeriodButton
                            value="fiscal_year"
                            label="Years"
                            active={visualizationPeriod === 'fiscal_year'}
                            changePeriod={updateVisualizationPeriod} />
                    </li>
                    <li>
                        <TimeVisualizationPeriodButton
                            value="quarter"
                            label="Quarter"
                            active={visualizationPeriod === 'quarter'}
                            changePeriod={updateVisualizationPeriod} />
                    </li>
                    <li>
                        <TimeVisualizationPeriodButton
                            value="month"
                            label="Month"
                            active={visualizationPeriod === 'month'}
                            changePeriod={updateVisualizationPeriod} />
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

RecipientTimeVisualizationSectionButtons.propTypes = propTypes;
export default RecipientTimeVisualizationSectionButtons;
