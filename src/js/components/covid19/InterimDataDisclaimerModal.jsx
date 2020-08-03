import React from "react";
import PropTypes from "prop-types";
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InterimDataModal = ({
    mounted,
    hideModal
}) => (
    <Modal
        mounted={mounted}
        onExit={hideModal}
        titleText="New to USAspending: Official COVID-19 Response Data"
        dialogClass="usa-dt-modal"
        verticallyCenter
        escapeExits>
        <div className="usa-dt-modal covid-modal">
            <div className="usa-dt-modal__header covid-header">
                <h1>Data limitations of this page</h1>
                <button
                    className="usa-dt-modal__close-button"
                    onClick={hideModal}
                    title="Close"
                    aria-label="Close">
                    <FontAwesomeIcon icon="times" size="10x" />
                </button>
            </div>
            <div className="usa-dt-modal__body covid-modal-body interim-data-modal">
                <h2 className="covid-modal-h2 covid-modal-bold">Preliminary Data</h2>
                <p>At present, this page contains preliminary data submitted to USAspending from federal agencies. The data has not yet been certified, which will take place on August 14. Agencies may make changes or updates to their data at or before that time.</p>
                <h2 className="covid-modal-h2 covid-modal-bold">Sections Coming Soon</h2>
                <p>The following sections are not yet available but will soon be released:</p>
                <div>
                    <ul>
                        <li>Award Spending by Recipient</li>
                        <li>Award Spending by Agency</li>
                        <li>Award Spending by CFDA Program (Assistance Listing)</li>
                        <li>Data Sources and Methodologies</li>
                    </ul>
                </div>
                <h2 className="covid-modal-h2 covid-modal-bold">Questions about the Data</h2>
                <p>
                    If you have questions about the data on this page, we want to hear from you. Please send an email to <a href="mailto:usaspending.help@fiscal.treasury.gov?subject=COVID-19%20Spending%20Data">usaspending.help@fiscal.treasury.gov</a>.
                </p>
            </div>
        </div>
    </Modal>
);

InterimDataModal.propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func
};

export default InterimDataModal;
