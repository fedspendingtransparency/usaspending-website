/**
 * CFDADetailModal.jsx
 * Created by Jonathan Hill 08/31/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReadMore from 'components/sharedComponents/ReadMore';
import CFDAOpportunityTotals from 'containers/covid19/assistanceListing/CFDAOpportunityTotals';

const propTypes = {
    mounted: PropTypes.bool,
    closeModal: PropTypes.func,
    data: PropTypes.object,
    updateAdvancedSearchFilters: PropTypes.func,
    displayRedirectModal: PropTypes.func
};

const CFDADetailModal = ({
    mounted,
    closeModal,
    data,
    updateAdvancedSearchFilters,
    displayRedirectModal
}) => {
    if (!data) return null;
    return (
        <Modal
            mounted={mounted}
            onExit={closeModal}
            titleText="cfdamodal"
            dialogClass="usa-dt-modal"
            verticallyCenter
            escapeExits>
            <div className="usa-dt-modal">
                <div className="usa-dt-modal__header">
                    <h1 className="usa-dt-modal__title">
                        {data.code && data.description ? `${data.code}: ${data.description}` : `${data.code}${data.description}`}
                    </h1>
                    <button
                        className="usa-dt-modal__close-button"
                        onClick={closeModal}
                        title="Close"
                        aria-label="Close">
                        <FontAwesomeIcon icon="times" size="lg" />
                    </button>
                </div>
                <div className="usa-dt-modal__body-covid19-cfda">
                    <div className="usa-dt-modal__column">
                        <div className="usa-dt-modal__section">
                            <div className="usa-dt-modal__section__title">
                                <h6>Administrative Agency</h6>
                            </div>
                            <div className="usa-dt-modal__section__description">
                                <p className="administrative-agency">{data.cfda_federal_agency || '--'}</p>
                            </div>
                        </div>
                        <div className="usa-dt-modal__section">
                            <div className="usa-dt-modal__section__title">
                                <h6>Objectives</h6>
                            </div>
                            <div className="usa-dt-modal__section__description">
                                <ReadMore text={data.cfda_objectives || '--'} />
                            </div>
                        </div>
                        <div className="usa-dt-modal__section">
                            <div className="usa-dt-modal__section__title">
                                <h6>Program Website</h6>
                            </div>
                            <div className="usa-dt-modal__section__description">
                                {data.cfda_website ?
                                    <button
                                        onClick={displayRedirectModal}
                                        value={data.cfda_website}>
                                        {data.cfda_website} <FontAwesomeIcon icon="external-link-alt" />
                                    </button>
                                    : '--'
                                }
                            </div>
                        </div>
                        <div className="usa-dt-modal__section">
                            <div className="usa-dt-modal__section__title">
                                <h6>Assistance Listing on SAM.gov</h6>
                            </div>
                            <div className="usa-dt-modal__section__description">
                                {data.resource_link ?
                                    <button
                                        onClick={displayRedirectModal}
                                        value={data.resource_link}>
                                        {data.resource_link} <FontAwesomeIcon icon="external-link-alt" />
                                    </button>
                                    : '--'
                                }
                            </div>
                        </div>
                    </div>
                    <div className="usa-dt-modal__column">
                        <div className="usa-dt-modal__section">
                            <div className="usa-dt-modal__section__title">
                                <h6>Opportunities on Grants.gov From This Program</h6>
                            </div>
                            <div className="usa-dt-modal__section__description">
                                <button
                                    onClick={displayRedirectModal}
                                    value={`https://www.grants.gov/search-grants.html?cfda=${data.code}`}>
                                    {`https://www.grants.gov/search-grants.html?cfda=${data.code}`} <FontAwesomeIcon icon="external-link-alt" />
                                </button>
                                {data.code && <CFDAOpportunityTotals code={data.code} />}
                            </div>
                        </div>
                        <div className="usa-dt-modal__section">
                            <div className="usa-dt-modal__section__title">
                                <h6>Applicant Elligibility</h6>
                            </div>
                            <div className="usa-dt-modal__section__description">
                                <ReadMore text={data.applicant_eligibility || '--'} />
                            </div>
                        </div>
                        <div className="usa-dt-modal__section">
                            <div className="usa-dt-modal__section__title">
                                <h6>Beneficiary Eligibility</h6>
                            </div>
                            <div className="usa-dt-modal__section__description">
                                <ReadMore text={data.beneficiary_eligibility || '--'} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="usa-dt-modal__footer">
                    <div className="usa-dt-modal__footer__body">
                        <div className="usa-dt-modal__footer__title">
                            <h5>View this CFDA Program in Advanced Search</h5>
                        </div>
                        <div className="usa-dt-modal__footer__description">
                            <p>To see all COVID-19 awards funded by the program and more, visit the Advanced Search page</p>
                        </div>
                        <div className="usa-dt-modal__footer__button">
                            <button
                                onClick={updateAdvancedSearchFilters}
                                value={data.code}>
                                View in Advanced Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

CFDADetailModal.propTypes = propTypes;
export default CFDADetailModal;
