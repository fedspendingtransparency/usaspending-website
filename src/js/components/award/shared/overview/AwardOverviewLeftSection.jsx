/**
 * AwardOverviewLeftSection.jsx
 * Created by Jonathan Hill 11/26/19
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
    awardType: PropTypes.string,
    awardId: PropTypes.string
};

const AwardOverviewLeftSection = ({
    awardingAgency,
    recipient,
    recordType,
    awardType,
    awardId
}) => (
    <AwardSection type="column" className="award-overview__left-section award-overview-column">
        <AwardingAgency awardingAgency={awardingAgency} />
        <Recipient
            recipient={recipient}
            recordType={recordType}
            awardType={awardType}
            awardId={awardId} />
    </AwardSection>
);

AwardOverviewLeftSection.propTypes = propTypes;
export default AwardOverviewLeftSection;
