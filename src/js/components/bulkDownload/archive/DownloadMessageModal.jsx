/**
 * DownloadMessageModal.jsx
 * Created by Lizzie Salita 8/27/21
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

const DownloadMessageModal = ({
    mounted,
    closeModal
}) => (
    <Modal
        mounted={mounted}
        onExit={closeModal}
        titleText="This file is unavailable while we are making updates to USAspending."
        dialogClass="usa-dt-modal"
        verticallyCenter
        escapeExits>
        <div className="usa-dt-modal download-message-modal">
            <div className="usa-dt-modal__header">
                <h1 className="usa-dt-modal__title">
                    <FontAwesomeIcon className="database-download-message__icon" icon="exclamation-triangle" />
                    This file is unavailable while we are making updates to USAspending.
                </h1>
                <button
                    className="usa-dt-modal__close-button"
                    onClick={closeModal}
                    title="Close"
                    aria-label="Close">
                    <FontAwesomeIcon icon="times" size="lg" />
                </button>
            </div>
            <div className="usa-dt-modal__body">
                Looking for USAspending data? For award-related data, visit the Custom Award Data download. For federal account-related data, visit the Custom Account Data download.
            </div>
        </div>
    </Modal>
);

DownloadMessageModal.propTypes = propTypes;
export default DownloadMessageModal;
