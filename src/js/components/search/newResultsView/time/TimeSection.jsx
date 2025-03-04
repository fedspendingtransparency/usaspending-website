/**
 * TimeSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/


import React, { useState } from "react";
import PropTypes from "prop-types";

import Analytics from "../../../../helpers/analytics/Analytics";
import TimeVisualizationSectionContainer
    from "../../../../containers/search/newResultsView/TimeVisualizationSectionContainer";
import PlaceholderComponent from "../PlaceholderComponent";
import TimeDsm from "./TimeDsm";

const propTypes = {
    timeHasLoaded: PropTypes.bool,
    subaward: PropTypes.bool,
    hash: PropTypes.string
};

const TimeSection = ({ timeHasLoaded, subaward, hash }) => {
    const [visualizationPeriod, setVisualizationPeriod] = useState('month');

    const onClick = (e) => {
        setVisualizationPeriod(e);
        Analytics.event({
            category: 'Section Time',
            action: `View ${e}`,
            label: hash
        });
    };

    const wrapperProps = {
        sectionTitle: 'Results Over Time',
        dropdownOptions: [
            {
                name: 'By Month',
                value: 'month',
                onClick,
                dsmContent: <TimeDsm subaward={subaward} />
            },
            {
                name: 'By Fiscal Quarter',
                value: 'quarter',
                onClick,
                dsmContent: <TimeDsm subaward={subaward} />
            },
            {
                name: 'By Year',
                value: 'fiscal_year',
                onClick,
                dsmContent: <TimeDsm subaward={subaward} />
            }
        ],
        selectedDropdownOption: visualizationPeriod,
        sectionName: 'time'
    };

    return (
        <div id="search-page-component" className="time">
            {timeHasLoaded ?
                <TimeVisualizationSectionContainer
                    wrapperProps={wrapperProps}
                    subaward={subaward}
                    visualizationPeriod={visualizationPeriod}
                    hash={hash} />
                :
                <PlaceholderComponent className="time" />
            }
        </div>
    );
};

TimeSection.propTypes = propTypes;
export default TimeSection;
