/**
 * CustomYTick.jsx
 * Created by Keith Didier 09/23/2024
 **/

import React from "react";
import PropTypes from "prop-types";
import { formatMoneyWithUnitsShortLabel } from "../../../../helpers/moneyFormatter";

const customYTickPropTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    payload: PropTypes.object
};

const CustomYTick = (props) => {
    const {
        x, y, payload
    } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={0} textAnchor="end" fill="#5C5C5C" fontSize={12} width="48px">
                {formatMoneyWithUnitsShortLabel(payload.value)}
            </text>
        </g>);
};

CustomYTick.propTypes = customYTickPropTypes;
export default CustomYTick;
