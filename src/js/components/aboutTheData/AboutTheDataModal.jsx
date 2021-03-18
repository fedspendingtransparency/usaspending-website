/**
 * AboutTheDataModal.jsx
 * Created by Jonathan Hill 11/19/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { periodToQuarterMapping } from 'dataMapping/aboutTheData/timeFilters';
import { showQuarterText } from 'helpers/aboutTheDataHelper';
import { modalContentMapping } from './componentMapping/modalContentMapping';

const propTypes = {
    mounted: PropTypes.bool,
    closeModal: PropTypes.func,
    type: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    agencyData: PropTypes.object
};

const AboutTheDataModal = ({
    mounted,
    closeModal,
    type,
    title,
    className,
    agencyData
}) => {
    if (!agencyData) return null;
    const fiscalYearQuarterPeriodText = showQuarterText(agencyData.fiscalPeriod) ?
        `FY ${agencyData.fiscalYear} Q${periodToQuarterMapping[agencyData.fiscalPeriod]} / P${agencyData.fiscalPeriod}` :
        `FY ${agencyData.fiscalYear} P${agencyData.fiscalPeriod}`;
    return (
        <Modal
            mounted={mounted}
            onExit={closeModal}
            titleText={title}
            dialogClass="usa-dt-modal"
            verticallyCenter
            escapeExits>
            <div className={`usa-dt-modal about-the-data-modal ${className}`}>
                <div className="usa-dt-modal__header">
                    <div className="about-the-data-modal__header-data">
                        <div className="about-the-data-modal__agency-name">{agencyData.agencyName ? agencyData.agencyName.toUpperCase() : ''}</div>
                        <h1 title={title} className="usa-dt-modal__title">
                            {title}
                        </h1>
                        <div className="about-the-data-modal__fiscal-year-quarter-period">
                            {fiscalYearQuarterPeriodText}
                        </div>
                    </div>
                    <button
                        className="usa-dt-modal__close-button"
                        onClick={closeModal}
                        title="Close"
                        aria-label="Close">
                        <FontAwesomeIcon icon="times" size="lg" />
                    </button>
                </div>
                <div className="usa-dt-modal__section">
                    {modalContentMapping({ agencyData })[type]}
                </div>
            </div>
        </Modal>
    );
};

AboutTheDataModal.propTypes = propTypes;
export default AboutTheDataModal;
