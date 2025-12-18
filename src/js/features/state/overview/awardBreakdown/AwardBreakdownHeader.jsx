import React, { useState } from "react";
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import RoundedToggle from "components/sharedComponents/RoundedToggle";
import Accordion from "components/sharedComponents/accordion/Accordion";
import GlossaryLink from "components/sharedComponents/GlossaryLink";

const propTypes = {
    toggle: PropTypes.bool,
    setToggle: PropTypes.func
};

const AwardBreakdownHeader = ({ toggle, setToggle }) => {
    const [open, setOpen] = useState(false);

    const onToggle = () => {
        setToggle(!toggle);
    };

    const onKeyToggle = (event) => {
        if (event.key === 'Enter') {
            setToggle(!toggle);
        }
    };

    return (
        <FlexGridRow>
            <FlexGridCol width={8} desktop={8} tablet={12} mobile={12}>
                <div className="state-section__viz award-breakdown" id="award">
                    <div className="award-breakdown__heading-row">
                        <h3 className="state-overview__heading">
                            Award Breakdown
                        </h3>
                        <div className="state-overview__heading-right-side">
                            <RoundedToggle
                                toggle={toggle}
                                onKeyToggle={onKeyToggle}
                                onToggle={onToggle}
                                label="View Outlays" />
                            <div className="state-overview__line-div" />
                            <Accordion
                                setOpen={setOpen}
                                closedIcon="chevron-down"
                                openIcon="chevron-up"
                                title="About Outlays" />
                        </div>
                    </div>
                    {open &&
                        <div className="state-overview__what-content">
                            <FontAwesomeIcon
                                icon="info-circle"
                                className="state-overview__info-icon" />
                            <p className="state-overview__what-heading">
                                What is an outlay?
                            </p>
                            <p className="state-overview__what-text">
                                An <span className="state-overview__emphasis">outlay</span> <GlossaryLink term="outlay" /> is money that has been paid out from a federal account. This should not be confused with an <span className="state-overview__emphasis">obligation&nbsp;<GlossaryLink term="obligation" /></span> , which is money the federal government has promised to pay (for example, when signing a contract or awarding a grant). Outlays are the transactions that pay off the federal government&apos;s obligations.
                            </p>
                            <p className="state-overview__what-second-heading">
                                How do outlays relate to the chart below?
                            </p>
                            <p className="state-overview__what-text">
                                The chart below can be filtered to view outlayed amounts for each award type.
                                Outlay amounts displayed below may have been paying off obligations that
                                occurred in a prior year, which is why obligations and outlays from a single year
                                are not comparable.
                                The award types above add up to more than 100% due to negative values not
                                shown here.
                            </p>
                        </div>}
                </div>
            </FlexGridCol>
        </FlexGridRow>
    );
};

AwardBreakdownHeader.propTypes = propTypes;
export default AwardBreakdownHeader;
