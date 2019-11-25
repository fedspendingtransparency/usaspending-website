/**
 * AwardOverviewLeftSection.jsx
 * Created by David Trinh 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import AwardSection from '../AwardSection';
import AwardingAgency from './AwardingAgency';
import Recipient from './Recipient';

const propTypes = {
    awardingAgency: PropTypes.object,
    recipient: PropTypes.object,
    recordType: PropTypes.number,
    placeOfPerformance: PropTypes.object
};

const AwardOverviewLeftSection = ({
    awardingAgency,
    recipient,
    recordType,
    placeOfPerformance
}) => (
    <AwardSection type="column" className="award-overview__left-section award-overview-column">
        <AwardingAgency awardingAgency={awardingAgency} />
        <Recipient
            recipient={recipient}
            recordType={recordType}
            placeOfPerformance={placeOfPerformance} />
    </AwardSection>
);

AwardOverviewLeftSection.propTypes = propTypes;
export default AwardOverviewLeftSection;
