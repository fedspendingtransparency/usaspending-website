import React from "react";

import RoundedToggle from "components/sharedComponents/RoundedToggle";
import Accordion from "components/sharedComponents/accordion/Accordion";
import PropTypes from "prop-types";

const propTypes = {
    outlayToggle: PropTypes.bool,
    setOutlayToggle: PropTypes.func,
    outlayWhatOpen: PropTypes.bool,
    setOutlayWhatOpen: PropTypes.func
};

const OutlaysToggle = ({
    outlayToggle, setOutlayToggle, outlayWhatOpen, setOutlayWhatOpen
}) => {
    const onOutlaysToggle = () => setOutlayToggle(!outlayToggle);

    const onKeyOutlaysToggle = (e) => {
        if (e.key === 'Enter') {
            setOutlayToggle(!outlayToggle);
        }
    };

    /* TODO: Add back in once outlays are resolved, commented out in DEV-13189 */
    const setWhatOpen = () => {
        setOutlayWhatOpen(!outlayWhatOpen);
    };

    return (
        <div className="state__right">
            <RoundedToggle
                toggle={outlayToggle}
                onKeyToggle={onKeyOutlaysToggle}
                onToggle={onOutlaysToggle}
                label="View Outlays"
                id="state__controls-toggle" />
            <div className="state__line-div" />
            <Accordion
                setOpen={setWhatOpen}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                title="What is this?" />
        </div>
    );
};

OutlaysToggle.propTypes = propTypes;
export default OutlaysToggle;
