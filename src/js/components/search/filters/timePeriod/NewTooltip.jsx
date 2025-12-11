import React, { useContext, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TooltipContext from "../../../../context/TooltipContext";

const NewTooltip = ({ tooltipComponent }) => {
    const tooltip = useContext(TooltipContext);
    const ref = useRef(null);

    const closeTooltip = () => {
        tooltip({
            x: 0, y: 0, display: 'none', tooltipComponent: <></>
        });
    };
    const openTooltip = () => {
        console.log({ ref: ref.current.getBoundingClientRect() });
        const { x, y } = ref.current.getBoundingClientRect();
        console.log({ x, y });
        tooltip({
            x, y, display: 'unset', tooltipComponent
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
