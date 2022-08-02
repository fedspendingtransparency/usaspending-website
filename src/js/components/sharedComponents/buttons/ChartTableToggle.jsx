/**
 * ChartTableToggle.jsx
 * Created by Brian Petway 08/02/22
 */

import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    active: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    changeView: PropTypes.func
};

const defaultProps = {
    disabled: false
};

const ChartTableToggle = () => {
    // icons need to be here, not sent in?
    // or needs to be an array bc two are needed
    console.log('in ChartTableToggle');
    return (
        <div className="chart-table-toggle" >
            TEXT HERE
        </div>
    );
};

ChartTableToggle.propTypes = propTypes;
ChartTableToggle.defaultProps = defaultProps;
export default ChartTableToggle;
