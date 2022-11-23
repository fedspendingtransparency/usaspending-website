import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';

import { CFDAOverviewInfo } from '../shared/InfoTooltipContent';

const propTypes = {
    cfdaProgram: PropTypes.string,
    cfdaCount: PropTypes.number,
    jumpToSection: PropTypes.func,
    updateCFDAOverviewLinkClicked: PropTypes.func
};

const CFDAOverview = ({
    cfdaProgram,
    cfdaCount,
    jumpToSection,
    updateCFDAOverviewLinkClicked
}) => {
    const jumpToCFDASection = () => {
        updateCFDAOverviewLinkClicked(true);
        jumpToSection('cfda');
    };
    return (
        <div className="award-overview__right-section__cfda award-overview-column first award-overview-column__spacing award-viz">
            <h6 className="award-overview-title">
                {cfdaCount === 1 ?
                    "Assistance Listings (CFDA Programs)" : "Primary Assistance Listings (CFDA Programs)"}
                <TooltipWrapper
                    className="award-section-tt"
                    icon="info"
                    tooltipPosition="left"
                    tooltipComponent={CFDAOverviewInfo} />
            </h6>
            <div className="award-overview__body award-overview__cfda">
                <span>
                    {cfdaProgram}
                </span>
                <div>
                    <button
                        key="cfda"
                        className="award-viz__button"
                        onClick={jumpToCFDASection}>
                        <div className="award-viz__link-text">
                            {cfdaCount === 1 ? "VIEW MORE INFO ABOUT THIS PROGRAM" : `VIEW ALL ${cfdaCount} CFDA PROGRAMS`}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

CFDAOverview.propTypes = propTypes;
export default CFDAOverview;
