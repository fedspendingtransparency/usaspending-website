import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDASectionInfo } from "../shared/InfoTooltipContent";
import ExpandableAwardSection from '../shared/ExpandableAwardSection';

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
        samWebsite,
        cfdaWebsite,
        cfdaFederalAgency,
        cfdaNumber,
        cfdaTitle,
        applicantEligibility,
        beneficiaryEligibility,
        cfdaObjectives
    } = data;
    const expandableContent = (
        <React.Fragment>
            <h5>Applicant Eligibility</h5>
            <ExpandableAwardSection type="secondary" content={applicantEligibility} />
            <h5>Beneficiary Eligibility</h5>
            <ExpandableAwardSection type="secondary" content={beneficiaryEligibility} />
        </React.Fragment>
    );
    return (
        <AwardSection type="column" className="cfda-section award-viz">
            <AwardSectionHeader
                title="CFDA Program / Assistance Listing Information"
                icon={<FontAwesomeIcon icon="hands-helping" />}
                tooltip={CFDASectionInfo}
                left={false}
                tooltipWide />
            <div className="award__col__content">
                <ExpandableAwardSection content={expandableContent}>
                    <h4>{`${cfdaNumber}: ${cfdaTitle.toUpperCase()}`}</h4>
                    <h5>Objectives</h5>
                    <ExpandableAwardSection type="secondary" content={cfdaObjectives} />
                    <h5>Administrative Agency</h5>
                    <p>{cfdaFederalAgency}</p>
                    <h5>Website</h5>
                    <a href={cfdaWebsite}>{cfdaWebsite}</a>
                    <h5>SAM.gov Page</h5>
                    <a href={samWebsite}>{samWebsite}</a>
                </ExpandableAwardSection>
            </div>
        </AwardSection>
    );
};

CFDASection.propTypes = propTypes;
export default CFDASection;
