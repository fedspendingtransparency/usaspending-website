import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import kGlobalConstants from 'GlobalConstants';

import Router from 'containers/router/Router';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { applyStagedFilters, resetAppliedFilters } from 'redux/actions/search/appliedFilterActions';
import { initialState as defaultFilters, CheckboxTreeSelections } from 'redux/reducers/search/searchFiltersReducer';

import { defCodes } from 'dataMapping/covid19/covid19';

const CovidModalContainer = ({
    mounted,
    hideModal,
    stageDefCodesForAdvancedSearch,
    clearFilters,
    resetFilters
}) => {
    const handleGoToAdvancedSearch = (e) => {
        e.preventDefault();
        hideModal();
        clearFilters();
        resetFilters();
        stageDefCodesForAdvancedSearch({
            ...defaultFilters,
            defCodes: new CheckboxTreeSelections({
                require: defCodes,
                exclude: [],
                counts: [{ value: "COVID-19", count: defCodes.length, label: "COVID-19 Spending" }]
            })
        });
        Router.history.push('/search');
    };

    const handleGoToCovidProfile = (e) => {
        e.preventDefault();
        hideModal();
        Router.history.push('/disaster/covid-19');
    };

    const handleGoToDsm = (e) => {
        e.preventDefault();
        hideModal();
        Router.history.push('/disaster/covid-19/data-sources');
    };

    return (
        kGlobalConstants.CARES_ACT_RELEASED_2 ? (
            <Modal
                mounted={mounted}
                onExit={hideModal}
                titleText="New to USAspending: Official COVID-19 Response Data"
                dialogClass="usa-dt-modal"
                verticallyCenter
                escapeExits>
                <div className="usa-dt-modal covid-modal">
                    <div className="usa-dt-modal__header covid-header">
                        <h1>New to USAspending: Official COVID-19 Spending Data</h1>
                        <button
                            className="usa-dt-modal__close-button"
                            onClick={hideModal}
                            title="Close"
                            aria-label="Close">
                            <FontAwesomeIcon icon="times" size="10x" />
                        </button>
                    </div>
                    <div className="usa-dt-modal__body covid-modal-body">
                        <h2 className="covid-modal-h2"><span className="covid-modal-bold">Official spending data from the federal government&apos;s response to COVID-19 is now available to view and download on USAspending. The new data includes:</span></h2>
                        <div>
                            <ul>
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
                        <h2 className="covid-modal-h2 covid-modal-bold">Visit our new <a onClick={handleGoToCovidProfile} href="#/disaster/covid-19">profile page dedicated to the COVID-19 Spending:</a></h2>
                        <div>
                            <ul>
                                <li className="covid-modal-li">
                                    Our newest profile page shows you official COVID-19 spending information as submitted by federal agencies. Learn more about <span className="covid-modal-bold">who received funding, which agencies outlayed funds,</span> and <span className="covid-modal-bold">which programs were funded.</span> All COVID-19 spending data is <span className="covid-modal-bold">available for download</span> on the profile page with one click. Read about our datasets and calculations on the <a onClick={handleGoToDsm} href="#/disaster/covid-19/data-sources">Data Sources &amp; Methodology</a> page.
                                </li>
                            </ul>
                        </div>
                        <h2 className="covid-modal-h2 covid-modal-bold">Try out our new <a onClick={handleGoToAdvancedSearch} href="#/search">Advanced Search</a> Filter for COVID-19:</h2>
                        <div>
                            <ul>
                                <li className="covid-modal-li">
                                    Use the new <span className="covid-modal-bold">Disaster Emergency Fund Code (DEFC)</span> filter to show awards related to COVID-19 spending. The new filter works alongside our existing filters, so you can narrow your search to exactly what you want. Additional columns were also added to the search results table to show <span className="covid-modal-bold">COVID-19 obligations</span> and <span className="covid-modal-bold">outlays.</span>
                                </li>
                            </ul>
                        </div>
                        <h2 className="covid-modal-h2 covid-modal-bold">See which awards were funded through COVID-19 appropriations on our Award Summary pages:</h2>
                        <div>
                            <ul>
                                <li className="covid-modal-li">
                                    <span className="covid-modal-bold">Purple COVID-19 badges</span> on our Award Summary pages make it easy to identify which awards have been funded through COVID-19 appropriations. You can hover over the badge to see relevant <span className="covid-modal-bold">DEFCs</span> associated with that award. The charts found on Award Summary pages now feature <span className="covid-modal-bold">COVID-19 obligation and outlay amounts.</span>
                                </li>
                            </ul>
                        </div>
                        <h2 className="covid-modal-h2"><span className="covid-modal-bold">We will update the site with new COVID-19 spending data and release more related features in the coming months. <a href="mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Yes!%20I'd%20like%20to%20receive%20updates.">Sign up</a></span> to receive email updates about when these new features, and more, are added!</h2>
                        <div className="usa-dt-modal__link covid-modal-button">
                            <button onClick={hideModal}>Close</button>
                        </div>
                    </div>
                </div>
            </Modal>
        ) :
            (
                <Modal
                    mounted={mounted}
                    onExit={hideModal}
                    titleText="New to USAspending: Official COVID-19 Response Data"
                    dialogClass="usa-dt-modal"
                    verticallyCenter
                    escapeExits>
                    <div className="usa-dt-modal covid-modal">
                        <div className="usa-dt-modal__header covid-header">
                            <h1>New to USAspending: Preliminary COVID-19 Spending Data</h1>
                            <button
                                className="usa-dt-modal__close-button"
                                onClick={hideModal}
                                title="Close"
                                aria-label="Close">
                                <FontAwesomeIcon icon="times" size="10x" />
                            </button>
                        </div>
                        <div className="usa-dt-modal__body covid-modal-body">
                            <h2 className="covid-modal-h2"><span className="covid-modal-bold">Preliminary spending data from the federal government&apos;s response to COVID-19 is now available to view and download on USAspending. The new data includes:</span></h2>
                            <div>
                                <ul>
                                    <li className="covid-modal-li">
                                        <span className="covid-modal-bold">Disaster Emergency Fund Code (DEFC)</span> tags that highlight funding from the CARES Act and other COVID-19 supplemental appropriations.
                                    </li>
                                    <li className="covid-modal-li">
                                        <span className="covid-modal-bold">Outlay data</span> for COVID-19 showing what agencies have paid out, in addition to the existing obligation data showing what agencies have promised to pay.
                                    </li>
                                </ul>
                            </div>
                            <h2 className="covid-modal-h2 covid-modal-bold">Visit our preliminary <a onClick={handleGoToCovidProfile} href="#/disaster/covid-19">profile page dedicated to COVID-19 Spending:</a></h2>
                            <div>
                                <ul>
                                    <li className="covid-modal-li">
                                        Our newest profile page shows you official COVID-19 spending information as submitted by federal agencies. Read about our datasets and calculations on the <a onClick={handleGoToDsm} href="#/disaster/covid-19/data-sources">Data Sources &amp; Methodology</a> page.
                                    </li>
                                </ul>
                            </div>
                            <h2 className="covid-modal-h2 covid-modal-bold">Try out our new <a onClick={handleGoToAdvancedSearch} href="#/search">Advanced Search</a> Filter for COVID-19:</h2>
                            <div>
                                <ul>
                                    <li className="covid-modal-li">
                                        Use the new <span className="covid-modal-bold">Disaster Emergency Fund Code (DEFC)</span> filter to show awards related to COVID-19 spending. The new filter works alongside our existing filters, so you can narrow your search to exactly what you want. Additional columns were also added to the search results table to show <span className="covid-modal-bold">COVID-19 obligations</span> and <span className="covid-modal-bold">outlays.</span>
                                    </li>
                                </ul>
                            </div>
                            <h2 className="covid-modal-h2 covid-modal-bold">See which awards were funded through COVID-19 appropriations on our Award Summary pages:</h2>
                            <div>
                                <ul>
                                    <li className="covid-modal-li">
                                        <span className="covid-modal-bold">Purple COVID-19 badges</span> on our Award Summary pages make it easy to identify which awards have been funded through COVID-19 appropriations. You can hover over the badge to see relevant <span className="covid-modal-bold">DEFCs</span> associated with that award. The charts found on Award Summary pages now feature <span className="covid-modal-bold">COVID-19 obligation and outlay amounts.</span>
                                    </li>
                                </ul>
                            </div>
                            <h2 className="covid-modal-h2"><span className="covid-modal-bold">We will update the site with new COVID-19 spending data and related features. <a href="mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Yes!%20I'd%20like%20to%20receive%20updates.">Sign up</a></span> to receive email updates about when these new features, and more, are added!</h2>
                            <div className="usa-dt-modal__link covid-modal-button">
                                <button onClick={hideModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )
    );
};

CovidModalContainer.propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
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
