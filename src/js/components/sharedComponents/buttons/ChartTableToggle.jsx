/**
 * ChartTableToggle.jsx
 * Created by Brian Petway 08/02/22
 */

import React from 'react';
import PropTypes from "prop-types";
import ViewTypeButton from "./ViewTypeButton";

const propTypes = {
    active: PropTypes.bool,
    changeView: PropTypes.func
};

const ChartTableToggle = ({
    active,
    changeView
}) => (
    <div className="chart-table-toggle" >
        <ViewTypeButton
            value="chart"
            label="chart"
            changeView={changeView}
            active={active === 'chart'}
            icon="chart-bar">
        </ViewTypeButton>
        <ViewTypeButton
            value="table"
            label="table"
            active={active === 'table'}
            changeView={changeView}
            icon="table">
        </ViewTypeButton>
    </div>
);

ChartTableToggle.propTypes = propTypes;
export default ChartTableToggle;
