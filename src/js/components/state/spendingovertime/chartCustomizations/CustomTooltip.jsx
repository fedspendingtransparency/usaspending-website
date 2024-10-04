/**
 * CustomTooltip.jsx
 * Created by Keith Didier 09/23/2024
 **/

import React from "react";
import PropTypes from "prop-types";
import { formatMoneyWithUnitsShortLabel } from "../../../../helpers/moneyFormatter";

const customTooltipPropTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
    label: PropTypes.string,
    onSetFocusBar: PropTypes.func,
    onMouseLeave: PropTypes.func
};

const CustomTooltip = (props) => {
    const {
        active,
        payload,
        label,
        onSetFocusBar,
        onMouseLeave
    } = props;

    if (active && payload && payload.length) {
        onSetFocusBar(label);
        return (
            <div className="custom-tooltip" role="status" aria-live="assertive">
                <div className="tooltip__title">
                    {label}
                </div>
                <div className="tooltip__text">
                    <div className="tooltip__text-label">Obligations</div>
                    <div className="tooltip__text-amount">
                        {formatMoneyWithUnitsShortLabel(payload[0].value)}
                    </div>
                </div>
            </div>);
    }

    onMouseLeave();
    return null;
};

CustomTooltip.propTypes = customTooltipPropTypes;
export default CustomTooltip;
