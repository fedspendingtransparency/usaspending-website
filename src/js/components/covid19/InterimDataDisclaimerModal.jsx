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
                <p>At present, this page contains preliminary data that has not yet been certified. Data updates will be released in the coming days.</p>
                <div>
                    <ul className="interim-data-modal__list">
                        <li className="covid-modal-li">
                            <span className="covid-modal-bold">Disaster Emergency Fund Code (DEFC)</span> tags that highlight funding from the CARES Act and other COVID-19 supplemental appropriations.
                        </li>
                        <li className="covid-modal-li">
                            <span className="covid-modal-bold">Outlay data</span> for COVID-19 showing what agencies have paid out, in addition to the existing obligation data showing what agencies have promised to pay.
                        </li>
                        <li className="covid-modal-li">
                            <span className="covid-modal-bold">Breakdown of spending data</span> by federal agency, award recipient, and a variety of budget categories.
                        </li>
                    </ul>
                </div>
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
