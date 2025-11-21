/**
 * TimeSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/


import React, { useState } from "react";
import PropTypes from "prop-types";

import Analytics from "../../../../helpers/analytics/Analytics";
import TimeVisualizationSectionContainer
    from "../../../../containers/search/resultsView/TimeVisualizationSectionContainer";
import PlaceholderComponent from "../PlaceholderComponent";
import TimeDsm from "./TimeDsm";
import useQueryParams from "../../../../hooks/useQueryParams";

const propTypes = {
    timeHasLoaded: PropTypes.bool,
    hash: PropTypes.string,
    spendingLevel: PropTypes.string
};

const TimeSection = ({
    timeHasLoaded, hash, spendingLevel
}) => {
    const query = useQueryParams();
    const [visualizationPeriod, setVisualizationPeriod] = useState(query.by || 'month');

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
                dsmContent: <TimeDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'By Fiscal Quarter',
                value: 'quarter',
                onClick,
                dsmContent: <TimeDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'By Year',
                value: 'fiscal_year',
                onClick,
                dsmContent: <TimeDsm spendingLevel={spendingLevel} />
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
