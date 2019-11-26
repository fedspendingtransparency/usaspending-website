import React from 'react'
import PropTypes from 'prop-types';

import AwardSection from '../AwardSection';

const propTypes = {
    awardingAgency: PropTypes.object
};

const AwardingAgency = ({ awardingAgency }) => (
    <AwardSection className="award-overview__left-section__awarding award-overview-column first">
        <h6 className="award-overview-title">Awarding Agency</h6>
        <h5 className="award-overview__left-section__agency-name">
            <a href={`/#/agency/${awardingAgency.id}`}>
                {awardingAgency.formattedToptier}
            </a>
        </h5>
    </AwardSection>
);

AwardingAgency.propTypes = propTypes;
export default AwardingAgency;
