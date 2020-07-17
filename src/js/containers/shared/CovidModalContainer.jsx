import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Router from 'containers/router/Router';

const options = 'test';

const CovidModalContainer = ({
    showModal = false,
    closeModal,
    goToAdvancedSearch
}) => {
    const handleGoToAdvancedSearch = (e) => {
        // e.preventDefault();
        Router.history.push('/search');
        goToAdvancedSearch(options);
    };
    return (
        <Modal
            mounted={showModal}
            onExit={closeModal}
            titleText="New to USAspending: Official COVID-19 Response Data"
            dialogClass="usas-modal"
            verticallyCenter
            escapeExits>
            <div className="usas-modal covid-modal">
                <div className="usas-modal__header covid-header">
                    <h1>New to USAspending: Official COVID-19 Response Data</h1>
                    <button
                        className="usas-modal__close-button"
                        onClick={closeModal}
                        title="Close"
                        aria-label="Close">
                        <FontAwesomeIcon icon="times" size="10x" />
                    </button>
                </div>
                <div className="usas-modal__body covid-modal-body">
                    <h2 className="covid-modal-h2">Official spending data from the federal government&apos;s response to COVID-19 is now available on USAspending, which includes:</h2>
                    <div>
                        <ul>
                            <li className="covid-modal-li">
                                Disaster Emergency Fund (DEF) Code tags that highlight funding from the CARES Act and supplemental legislation
                            </li>
                            <li className="covid-modal-li">
                                Outlay data showing what agencies have spent, in addition to the existing obligation data about what agencies have promised to pay
                            </li>
                            <li className="covid-modal-li">
                                Breakdown of spending data by federal agency, award recipient, and a variety of budget categories
                            </li>
                        </ul>
                    </div>
                    <h2 className="covid-modal-h2">Visit our new <a href="#/disaster/covid-19">profile page dedicated to the COVID-19 Response:</a></h2>
                    <div>
                        <ul>
                            <li className="covid-modal-li">
                                Our newest profile page shows you official COVID-19 spending information as submitted by federal agencies. Learn more about who received funding, which agencies outlayed funds, and what those funds purchased.
                            </li>
                        </ul>
                    </div>
                    <h2 className="covid-modal-h2">Try out our new <a onClick={handleGoToAdvancedSearch} href="#/search">Advanced Search</a> Filter for COVID-19:</h2>
                    <div>
                        <ul>
                            <li className="covid-modal-li">
                                Use the new &apos;Disaster Emergency Fund (DEF) Code&apos; filter to display awards related to the COVID-19 Response. Additional columns in the search results table show COVID-19 Response DEF Codes, Obligations, and Outlays.
                            </li>
                        </ul>
                    </div>
                    <h2 className="covid-modal-h2">Keep an eye out for the purple COVID-19 Response badge found throughout the site. These badges indicate that the page contains information about COVID-19 spending.</h2>
                    <div className="usas-modal__link covid-modal-button">
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

CovidModalContainer.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    goToAdvancedSearch: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    goToAdvancedSearch: (args) => dispatch()
});

export default connect(null, mapDispatchToProps)(CovidModalContainer);
