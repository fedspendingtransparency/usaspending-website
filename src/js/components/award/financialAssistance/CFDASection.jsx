import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CFDAVizContainer from 'containers/award/financialAssistance/CFDAVizContainer';
import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDASectionInfo } from "../shared/InfoTooltipContent";

const propTypes = {
    cfdas: PropTypes.array,
    CFDAOverviewLinkClicked: PropTypes.bool,
    updateCFDAOverviewLinkClicked: PropTypes.func,
    awardTotalObligation: PropTypes.number
};

const CFDASection = ({
    cfdas,
    CFDAOverviewLinkClicked,
    updateCFDAOverviewLinkClicked,
    awardTotalObligation
}) => (
    <AwardSection id="award-cfda" type="column" className="cfda-section award-viz">
        <AwardSectionHeader
            title="Assistance Listing (CFDA Program) Information"
            icon={<FontAwesomeIcon icon="hands-helping" />}
            tooltip={CFDASectionInfo}
            left={false}
            tooltipWide />
        <div className="award__col__content">
            <CFDAVizContainer
                cfdas={cfdas}
                CFDAOverviewLinkClicked={CFDAOverviewLinkClicked}
                updateCFDAOverviewLinkClicked={updateCFDAOverviewLinkClicked}
                awardTotalObligation={awardTotalObligation} />
        </div>
    </AwardSection>
);

CFDASection.propTypes = propTypes;
export default CFDASection;
