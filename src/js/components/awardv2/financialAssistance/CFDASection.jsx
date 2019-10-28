import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDASectionInfo } from "../shared/InfoTooltipContent";

const propTypes = {
    data: PropTypes.shape({
        cfda_number: PropTypes.string,
        cfda_title: PropTypes.string,
        applicant_eligibility: PropTypes.string,
        beneficiary_eligibility: PropTypes.string,
        federal_agency: PropTypes.string,
        objectives: PropTypes.string,
        obligations: PropTypes.string,
        popular_name: PropTypes.string,
        website: PropTypes.string,
        sam_website: PropTypes.string
    })
};

const CFDASection = ({ data }) => {
    const {
        cfda_number,
        cfda_title,
        applicant_eligibility,
        beneficiary_eligibility,
        cfda_federal_agency,
        cfda_objectives,
        cfda_website,
        sam_website
    } = data;
    return (
        <AwardSection type="column" className="cfda-section award-viz">
            <AwardSectionHeader
                title="CFDA Program / Assistance Listing Information"
                icon={<FontAwesomeIcon icon="hands-helping" />}
                tooltip={CFDASectionInfo} />
            <div className="award__col__content">
                <h4>{`${data.cfda_number}: ${data.cfda_title.toUpperCase()}`}</h4>
                <h5>Objectives</h5>
                <p>{cfda_objectives}</p>
                <h5>Administrative Agency</h5>
                <p>{cfda_federal_agency}</p>
                <h5>Website</h5>
                <a href={cfda_website}>{cfda_website}</a>
                <h5>SAM.gov Page</h5>
                <a href={sam_website}>{sam_website}</a>
                <h5>Applicant Eligibility</h5>
                <p>{applicant_eligibility}</p>
                <h5>Beneficiary Eligibility</h5>
                <p>{beneficiary_eligibility}</p>
            </div>
        </AwardSection>
    );
};

CFDASection.propTypes = propTypes;
export default CFDASection;
