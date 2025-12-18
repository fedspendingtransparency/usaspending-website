/**
 * CustomLegend.jsx
 * Created by Keith Didier 09/23/2024
 **/

import React from "react";
import PropTypes from "prop-types";
import BarChartLegend from "components/sharedComponents/timeChart/chart/BarChartLegend";

const customLegendPropTypes = {
    barColor: PropTypes.string,
    label: PropTypes.string
};

const CustomLegend = ({ barColor, label }) => {
    const legend = [{ color: barColor, label, offset: 0 }];

    return (
        <svg className="bar-graph" height={20}>
            <g className="legend-container">
                <BarChartLegend legend={legend} />
            </g>
        </svg>
    );
};

CustomLegend.propTypes = customLegendPropTypes;
export default CustomLegend;
