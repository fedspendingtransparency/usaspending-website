/**
 * TimeSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/


import React, { useState } from "react";
import PropTypes from "prop-types";

import TimeVisualizationSectionContainer
    from "../../../../containers/search/newResultsView/TimeVisualizationSectionContainer";
import PlaceholderComponent from "../PlaceholderComponent";
import TimeDsm from "./TimeDsm";

const propTypes = {
    timeHasLoaded: PropTypes.bool,
    subaward: PropTypes.bool
};

const TimeSection = ({ timeHasLoaded, subaward }) => {
    const [visualizationPeriod, setVisualizationPeriod] = useState('month');

    const onClick = (e) => {
        setVisualizationPeriod(e);
    };

    const wrapperProps = {
        sectionTitle: 'Results Over Time',
        dropdownOptions: [
            {
                name: 'Months',
                value: 'month',
                onClick,
                dsmContent: <TimeDsm subaward={subaward} />
            },
            {
                name: 'Quarters',
                value: 'quarter',
                onClick,
                dsmContent: <TimeDsm subaward={subaward} />
            },
            {
                name: 'Years',
                value: 'fiscal_year',
                onClick,
                dsmContent: <TimeDsm subaward={subaward} />
            }
        ],
        selectedDropdownOption: visualizationPeriod
    };

    return (
        <div id="search-page-component" className="time">
            {timeHasLoaded ?
                <TimeVisualizationSectionContainer
                    wrapperProps={wrapperProps}
                    subaward={subaward}
                    visualizationPeriod={visualizationPeriod} />
                :
                <PlaceholderComponent className="time" />
            }
        </div>
    );
};

TimeSection.propTypes = propTypes;
export default TimeSection;
