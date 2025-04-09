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
    onMouseLeave: PropTypes.func,
    outlayToggle: PropTypes.bool
};

const CustomTooltip = (props) => {
    const {
        active,
        payload,
        label,
        onMouseLeave,
        outlayToggle = false
    } = props;

    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" role="status" aria-live="assertive">
                <div className="tooltip__title">
                    {label}
                </div>
                <div className="tooltip__text">
                    <div className="tooltip__text-label">{outlayToggle ? 'Outlays' : 'Obligations'}</div>
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
