import React, { useContext, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import TooltipContext from "context/TooltipContext";

const propTypes = {
    tooltip: PropTypes.element,
    icon: PropTypes.string,
    offsetTop: PropTypes.string,
    offsetLeft: PropTypes.string
};

const NewTooltip = ({
    tooltip, icon = "info-circle", offsetTop = -12, offsetLeft = 30
}) => {
    const setTooltipData = useContext(TooltipContext);
    const ref = useRef(null);

    const closeTooltip = () => {
        setTooltipData({
            top: 0, left: 0, display: 'none', tooltip: <></>
        });
    };
    const openTooltip = () => {
        const { top, left } = ref.current.getBoundingClientRect();
        setTooltipData({
            top: top + offsetTop,
            left: left + offsetLeft,
            display: 'unset',
            tooltip
        });
    };

    return (
        <div className="new-tooltip-spacer">
            <FontAwesomeIcon
                icon={icon}
                tabIndex="0"
                aria-label="Tooltip Hover Wrapper"
                aria-hidden={false}
                className="new-tooltip__icon"
                onBlur={closeTooltip}
                onFocus={openTooltip}
                onMouseEnter={openTooltip}
                onMouseLeave={closeTooltip}
                onClick={openTooltip}
                ref={ref} />
        </div>

    );
};

NewTooltip.propTypes = propTypes;
export default NewTooltip;
