/**
 * AwardingAgency.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AwardSection from '../AwardSection';

const propTypes = {
    awardingAgency: PropTypes.object
};

const AwardingAgency = ({ awardingAgency }) => (
    <AwardSection className="award-overview__left-section__awarding award-overview-column first award-overview-column__spacing">
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
