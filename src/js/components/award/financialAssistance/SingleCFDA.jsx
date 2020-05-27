import React from 'react';
import PropTypes from 'prop-types';

import AwardSection from '../shared/AwardSection';
import ExpandableAwardSection from '../shared/ExpandableAwardSection';

const propTypes = {
    currentCfda: PropTypes.shape({
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

const SingleCFDA = ({ currentCfda }) => {
    const {
        samWebsite,
        cfdaWebsite,
        cfdaFederalAgency,
        applicantEligibility,
        beneficiaryEligibility,
        cfdaObjectives
    } = currentCfda;
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
            <div className="award__col__content">
                <ExpandableAwardSection content={expandableContent}>
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

SingleCFDA.propTypes = propTypes;
export default SingleCFDA;
