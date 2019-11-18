import React from 'react';
import PropTypes from 'prop-types';

import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDAOverviewInfo } from '../shared/InfoTooltipContent';

const propTypes = {
    cfdaPropgram: PropTypes.string
};

const CFDAOverview = ({
    cfdaPropgram
}) => (
    <AwardSection type="column">
        <AwardSectionHeader
            left={false}
            title="CFDA Program / Assistance Listing"
            tooltip={CFDAOverviewInfo} />
        <div className="award-overview__body award-overview__cfda">
            <span>
                {cfdaPropgram}
            </span>
        </div>
    </AwardSection>
);

CFDAOverview.propTypes = propTypes;
export default CFDAOverview;
