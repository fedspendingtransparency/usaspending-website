import React from "react";
import PropTypes from "prop-types";
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CovidModal = ({
    showModal = false,
    closeModal
}) => (
    <Modal
        mounted={showModal}
        onExit={closeModal}
        titleText="You're leaving a Bureau of the Fiscal Service website."
        dialogClass="usas-modal"
        verticallyCenter
        escapeExits>
        <div className="usas-modal covid-modal">
            <div className="usas-modal__header">
                <h1>New to USAspending: Official COVID-19 Response Data</h1>
                <button
                    className="usas-modal__close-button"
                    onClick={closeModal}
                    title="Close"
                    aria-label="Close">
                    <FontAwesomeIcon icon="times" size="10x" />
                </button>
            </div>
            <div className="usas-modal__body">
                <div className="usas-modal__title">
                    <div className="usas-modal__title-text">
                        You&apos;re leaving a Bureau of the Fiscal Service website.
                    </div>
                </div>
                <div className="usas-modal__explanation">
                    You&apos;re going to a website that is not managed or controlled by the Bureau of the Fiscal Service.
                    <br /> Its privacy policies may differ from ours.
                </div>
                <div className="usas-modal__directions">
                    Click this link to go to the website you have selected.
                </div>
                <div className="usas-modal__link">
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    </Modal>
);

CovidModal.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func
};

export default CovidModal;
