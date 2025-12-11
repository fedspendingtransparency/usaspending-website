import React, { useContext, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TooltipContext from "../../../../context/TooltipContext";

const NewTooltip = ({ tooltip }) => {
    const setTooltipData = useContext(TooltipContext);
    const ref = useRef(null);

    const closeTooltip = () => {
        setTooltipData({
            top: 0, left: 0, display: 'none', tooltip: <></>
        });
    };
    const openTooltip = () => {
        console.log({ ref: ref.current.getBoundingClientRect() });
        const { top, left } = ref.current.getBoundingClientRect();
        console.log({ top, left });
        setTooltipData({
            top, left: left + 20, display: 'unset', tooltip
        });
    };

    return (
        <FontAwesomeIcon
            icon="info-circle"
            tabIndex="0"
            aria-label="Tooltip Hover Wrapper"
            className="new-tooltip__icon"
            onBlur={closeTooltip}
            onFocus={openTooltip}
            onMouseEnter={openTooltip}
            onMouseLeave={closeTooltip}
            onClick={openTooltip}
            ref={ref} />

    );
};

export default NewTooltip;
