/**
 * AboutTheDataModal.jsx
 * Created by Jonathan Hill 11/19/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    mounted: PropTypes.bool,
    closeModal: PropTypes.func,
    title: PropTypes.string
};

const AboutTheDataModal = ({
    mounted,
    closeModal,
    title
}) => (
    <Modal
        mounted={mounted}
        onExit={closeModal}
        titleText="PublicationDatesModal"
        dialogClass="usa-dt-modal"
        verticallyCenter
        escapeExits>
        <div className="usa-dt-modal">
            <div className="usa-dt-modal__header">
                <h1 className="usa-dt-modal__title">
                    {title}
                </h1>
                <button
                    className="usa-dt-modal__close-button"
                    onClick={closeModal}
                    title="Close"
                    aria-label="Close">
                    <FontAwesomeIcon icon="times" size="lg" />
                </button>
            </div>
            <div className="usa-dt-modal__section">
                <div className="usa-dt-modal__section__title">
                    <h6>Administrative Agency</h6>
                </div>
                <div className="usa-dt-modal__section__description">
                    <p className="administrative-agency">--</p>
                </div>
            </div>
        </div>
    </Modal>
);

AboutTheDataModal.propTypes = propTypes;
export default AboutTheDataModal;
