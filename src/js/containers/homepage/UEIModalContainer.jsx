import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { applyStagedFilters, resetAppliedFilters, setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';

const CovidModalContainer = ({
    mounted,
    hideModal,
    clearFilters,
    resetFilters,
}) => {
    const history = useHistory();

    const handleGoToAdvancedSearch = (e) => {
        e.preventDefault();
        hideModal();
        clearFilters();
        resetFilters();
        history.push('/search');
    };

    const handleGoToKeywordSearch = (e) => {
        e.preventDefault();
        hideModal();
        clearFilters();
        resetFilters();
        history.push('/keyword_search');
    };

    return (
        <Modal
            mounted={mounted}
            onExit={hideModal}
            titleText="New to USAspending: COVID-19 Response Data"
            dialogClass="usa-dt-modal"
            verticallyCenter
            escapeExits>
            <div className="usa-dt-modal covid-modal">
                <div className="usa-dt-modal__header covid-header uei-modal-header">
                    <h1>Coming to USAspending: Unique Entity Identifiers</h1>
                    <button
                        className="usa-dt-modal__close-button"
                        onClick={hideModal}
                        title="Close"
                        aria-label="Close">
                        <FontAwesomeIcon icon="times" size="10x" />
                    </button>
                </div>
                <div className="usa-dt-modal__body interim-data-modal">
                    <p>
                        By April 2022, the federal government will transition from DUNS numbers to the new Unique Entity Identifier (UEI) as the official identifier for doing business with the U.S. government.
                    </p>
                    <p className="covid-modal-bold">
                        What does this transition mean for users of USAspending?
                    </p>
                    <div>
                        <ul>
                            <li className="covid-modal-li">
                                UEIs have been added to DUNS endpoints
                            </li>
                            <li className="covid-modal-li">
                                Download files that currently list DUNS numbers now also include UEIs
                            </li>
                            <li className="covid-modal-li">
                                You will start seeing UEI numbers alongside DUNS numbers in some instances on the following pages:
                                <ul>
                                    <li>Recipient Profiles</li>
                                    <li>Award Profile pages</li>
                                </ul>
                            </li>
                            <li>
                                You will be able to find federal awards using UEI or DUNS number via <Link onClick={handleGoToKeywordSearch} to="/keyword_search">Keyword Search</Link> or the &apos;Recipient&apos; filter on <Link onClick={handleGoToAdvancedSearch} to="/search">Advanced Search</Link>
                            </li>
                        </ul>
                    </div>
                    <p className="covid-modal-bold">
                        What is a UEI?
                    </p>
                    <p>
                        The UEI for an awardee or recipient is an alphanumeric code created in the System for Award Management (SAM.gov) that is used to uniquely identify specific commercial, nonprofit, or business entities registered to do business with the federal government.
                    </p>
                    <p>
                        <a href="mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Yes!%20I'd%20like%20to%20receive%20updates.">Sign up</a> to receive email notifications of future updates, new features, and more!
                    </p>
                </div>
            </div>
        </Modal>
    );
};

CovidModalContainer.propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    stageDefCodesForAdvancedSearch: PropTypes.func,
    clearFilters: PropTypes.func,
    resetFilters: PropTypes.func,
    setAppliedFilters: PropTypes.func,
    history: PropTypes.object
};

const mapDispatchToProps = (dispatch) => ({
    resetFilters: () => dispatch(resetAppliedFilters()),
    clearFilters: () => dispatch(clearAllFilters()),
    stageDefCodesForAdvancedSearch: (filters) => dispatch(applyStagedFilters(filters)),
    setAppliedFilters: (areApplied) => dispatch(setAppliedFilterCompletion(areApplied))
});

export default connect(null, mapDispatchToProps)(CovidModalContainer);
