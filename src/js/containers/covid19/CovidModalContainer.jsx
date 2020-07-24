import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Router from 'containers/router/Router';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { applyStagedFilters, resetAppliedFilters } from 'redux/actions/search/appliedFilterActions';
import { initialState as defaultFilters, CheckboxTreeSelections } from 'redux/reducers/search/searchFiltersReducer';

import { defCodes } from 'dataMapping/covid19/covid19';

const CovidModalContainer = ({
    showModal = false,
    closeModal,
    stageDefCodesForAdvancedSearch,
    clearFilters,
    resetFilters
}) => {
    const handleGoToAdvancedSearch = (e) => {
        e.preventDefault();
        clearFilters();
        resetFilters();
        stageDefCodesForAdvancedSearch({
            ...defaultFilters,
            defCodes: new CheckboxTreeSelections({
                require: defCodes,
                exclude: [],
                counts: [{ value: "COVID-19", count: defCodes.length, label: "COVID-19 Response" }]
            })
        });
        Router.history.push('/search');
    };
    return (
        <Modal
            mounted={showModal}
            onExit={closeModal}
            titleText="New to USAspending: Official COVID-19 Response Data"
            dialogClass="usa-dt-modal"
            verticallyCenter
            escapeExits>
            <div className="usa-dt-modal covid-modal">
                <div className="usa-dt-modal__header covid-header">
                    <h1>New to USAspending: Official COVID-19 Spending Data</h1>
                    <button
                        className="usa-dt-modal__close-button"
                        onClick={closeModal}
                        title="Close"
                        aria-label="Close">
                        <FontAwesomeIcon icon="times" size="10x" />
                    </button>
                </div>
                <div className="usa-dt-modal__body covid-modal-body">
                    <h2 className="covid-modal-h2">Official spending data from the federal government&apos;s response to COVID-19 is now available to view and download on USAspending. The new data includes:</h2>
                    <div>
                        <ul>
                            <li className="covid-modal-li">
                                <strong>Disaster Emergency Fund Code (DEFC)</strong> tags that highlight funding from the CARES Act and other COVID-19 supplemental appropriations
                            </li>
                            <li className="covid-modal-li">
                                <strong>Outlay data</strong> for COVID-19 showing what agencies have paid out, in addition to the existing obligation data showing what agencies have promised to pay
                            </li>
                            <li className="covid-modal-li">
                                <strong>Breakdown of spending data</strong> by federal agency, award recipient, and a variety of budget categories
                            </li>
                        </ul>
                    </div>
                    <h2 className="covid-modal-h2">Visit our new <a href="#/disaster/covid-19">profile page dedicated to the COVID-19 Spending:</a></h2>
                    <div>
                        <ul>
                            <li className="covid-modal-li">
                                Our newest profile page shows you official COVID-19 spending information as submitted by federal agencies. Learn more about <strong>who received funding, which agencies outlayed funds,</strong> and <strong>which programs were funded.</strong> All COVID-19 spending data is <strong>available for download</strong> on the page with one click.
                            </li>
                        </ul>
                    </div>
                    <h2 className="covid-modal-h2">Try out our new <a onClick={handleGoToAdvancedSearch} href="#/search">Advanced Search Filter</a> for COVID-19:</h2>
                    <div>
                        <ul>
                            <li className="covid-modal-li">
                                Use the new <strong>Disaster Emergency Fund Code (DEFC)</strong> filter to show awards related to COVID-19 spending. The new filter works alongside our existing filters, so you can narrow your search to exactly what you want. Additional columns were also added to the search results table to show <strong>COVID-19 spending DEFCs, Obligations,</strong> and <strong>Outlays.</strong>
                            </li>
                        </ul>
                    </div>
                    <h2 className="covid-modal-h2">See which awards were funded through COVID-19 appropriations on our Award Summary pages:</h2>
                    <div>
                        <ul>
                            <li className="covid-modal-li">
                                <strong>Purple COVID-19 badges</strong> on our Award Summary pages make it easy to identify which awards have been funded through COVID-19 appropriations. You can hover over the badge to see relevant <strong>DEFCs</strong> associated with that award. The charts found on Award Summary pages now feature <strong>COVID-19 obligation and outlay amounts.</strong>
                            </li>
                        </ul>
                    </div>
                    <h2 className="covid-modal-h2">We will update the site with new COVID-19 spending data and release more related features in the coming months. Sign up to receive email updates about when these new features, and more, are added!</h2>
                    <div className="usa-dt-modal__link covid-modal-button">
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
    stageDefCodesForAdvancedSearch: PropTypes.func,
    clearFilters: PropTypes.func,
    resetFilters: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    resetFilters: () => dispatch(resetAppliedFilters()),
    clearFilters: () => dispatch(clearAllFilters()),
    stageDefCodesForAdvancedSearch: (filters) => dispatch(applyStagedFilters(filters))
});

export default connect(null, mapDispatchToProps)(CovidModalContainer);
