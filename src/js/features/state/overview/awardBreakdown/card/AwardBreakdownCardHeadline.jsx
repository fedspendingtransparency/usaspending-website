import React, { useEffect, useState } from "react";
import { InfoCircle } from "components/sharedComponents/icons/Icons";
import DetailsTooltip from "./DetailsTooltip";

const AwardBreakdownCardHeadline = () => {
    const [showInfoTooltip, setShowInfoTooltip] = useState(false);

    useEffect(() => {
        if (showInfoTooltip) {
            const closeButton = document.querySelector('#state-overview-tooltip__close_icon');
            if (closeButton) {
                closeButton.focus();
            }
        }
    }, [showInfoTooltip]);

    const showTooltip = () => {
        setShowInfoTooltip(true);
    };

    const closeTooltip = () => {
        setShowInfoTooltip(false);
    };

    let tooltip = null;
    if (showInfoTooltip) {
        tooltip = (
            <DetailsTooltip closeTooltip={closeTooltip} />
        );
    }

    return (
        <div className="state-section__viz">
            <h3 className="state-overview__heading">
                Details
                <span className="details__info_icon_holder">
                    <button
                        id="details__info_icon"
                        className="details__info_icon"
                        onFocus={showTooltip}
                        onBlur={closeTooltip}
                        onMouseEnter={showTooltip}
                        onClick={showTooltip}>
                        <InfoCircle />
                    </button>
                </span>
            </h3>
            {tooltip}
        </div>
    );
};

export default AwardBreakdownCardHeadline;
