import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDASectionInfo } from "../shared/InfoTooltipContent";

const CFDASection = () => (
    <AwardSection type="column" className="cfda-section award-viz">
        <AwardSectionHeader
            title="CFDA Program / Assistance Listing Information"
            icon={<FontAwesomeIcon icon="hands-helping" />}
            tooltip={CFDASectionInfo} />
        <div className="award__col__content">
            test
        </div>
    </AwardSection>
);

export default CFDASection;
