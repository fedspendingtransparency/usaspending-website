import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CFDAVizContainer from 'containers/award/financialAssistance/CFDAVizContainer';
import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDASectionInfo } from "../shared/InfoTooltipContent";

const propTypes = {
    cfdas: PropTypes.array
};

const CFDASection = ({
    cfdas
}) => (
    <AwardSection id="award-cfda" type="column" className="cfda-section award-viz">
        <AwardSectionHeader
            title="CFDA Program / Assistance Listing Information"
            icon={<FontAwesomeIcon icon="hands-helping" />}
            tooltip={CFDASectionInfo}
            left={false}
            tooltipWide />
        <div className="award__col__content">
            <CFDAVizContainer cfdas={cfdas} />
        </div>
    </AwardSection>
);

CFDASection.propTypes = propTypes;
export default CFDASection;
