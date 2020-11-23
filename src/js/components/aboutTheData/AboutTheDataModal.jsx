/**
 * AboutTheDataModal.jsx
 * Created by Jonathan Hill 11/19/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { periodToQuarterMapping } from 'dataMapping/aboutTheData/periodToQuarterMapping';
import { modalContentMapping } from './dataMapping/modals/modalContentMapping';

const propTypes = {
    mounted: PropTypes.bool,
    closeModal: PropTypes.func,
    type: PropTypes.string,
    title: PropTypes.string,
    agencyCode: PropTypes.string,
    agencyName: PropTypes.string,
    fiscalYear: PropTypes.number,
    fiscalPeriod: PropTypes.number,
    className: PropTypes.string
};

const AboutTheDataModal = ({
    mounted,
    closeModal,
    type,
    title,
    agencyCode,
    agencyName,
    fiscalYear,
    fiscalPeriod,
    className
}) => (
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
                    <div className="about-the-data-modal__agency-name">{agencyName}</div>
                    <h1 className="usa-dt-modal__title">
                        {title}
                    </h1>
                    <div className="about-the-data-modal__fiscal-year-quarter-period">
                        {`FY ${fiscalYear} Q${periodToQuarterMapping[fiscalPeriod]} / P${fiscalPeriod}`}
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
                {modalContentMapping({ agencyCode, fiscalYear, fiscalPeriod })[type]}
            </div>
        </div>
    </Modal>
);

AboutTheDataModal.propTypes = propTypes;
export default AboutTheDataModal;
