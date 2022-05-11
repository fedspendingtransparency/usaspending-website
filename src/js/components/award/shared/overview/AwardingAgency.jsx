/**
 * AwardingAgency.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AwardSection from '../AwardSection';

const propTypes = {
    awardingAgency: PropTypes.object
};

const AwardingAgency = ({ awardingAgency }) => {
    let innerComponent = awardingAgency.formattedToptier;
    if (awardingAgency.hasAgencyPage && awardingAgency.id) {
        innerComponent = (
            <Link to={`/agency/${awardingAgency.agencySlug}`}>
                {innerComponent}
            </Link>
        );
    }
    return (
        <AwardSection className="award-overview__left-section__awarding award-overview-column first award-overview-column__spacing">
            <h6 className="award-overview-title">Awarding Agency</h6>
            <h5 className="award-overview__left-section__agency-name">
                {innerComponent}
            </h5>
        </AwardSection>
    );
};

AwardingAgency.propTypes = propTypes;
export default AwardingAgency;
