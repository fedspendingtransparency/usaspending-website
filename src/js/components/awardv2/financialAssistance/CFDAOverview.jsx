import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDAOverviewInfo } from '../shared/InfoTooltipContent';

const CFDAOverview = () => {
    return (
        <div>
            <AwardSection type="column">
                <AwardSectionHeader
                    title="CFDA Section"
                    icon={<FontAwesomeIcon icon="hands-helping" />}
                    tooltip={CFDAOverviewInfo} />
                <div className="award-overview__cfda">
                    Heres some neat data.
                </div>
            </AwardSection>      
        </div>
    );
};

export default CFDAOverview;
