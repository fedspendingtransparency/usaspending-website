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
    resetFilters
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
            titleText="ueimodal"
            dialogClass="usa-dt-modal"
            verticallyCenter
            escapeExits>
            <div className="usa-dt-modal covid-modal">
                <div className="usa-dt-modal__header uei-modal-header">
                    <h1 className="usa-dt-modal__title">New on USAspending: Unique Entity Identifiers</h1>
                    <button
                        className="usa-dt-modal__close-button"
                        onClick={hideModal}
                        title="Close"
                        aria-label="Close">
                        <FontAwesomeIcon icon="times" size="10x" />
                    </button>
                </div>
                <div className="usa-dt-modal__body uei-modal-body">
                    <p>
                        In April 2022, the federal government will transition from DUNS numbers to the new Unique Entity Identifier (UEI) as the official identifier for doing business with the U.S. government. To prepare for this change, we’re adding UEIs to USAspending.
                    </p>
                    <p className="covid-modal-bold">
                        What does this transition mean for users of USAspending?
                    </p>
                    <ul>
                        <li>
                            UEIs have been added to recipient endpoints
                        </li>
                        <li>
                            Download files that currently list DUNS numbers now also include UEIs
                        </li>
                        <li>
                            You will start seeing UEIs alongside DUNS numbers on the following pages:
                            <ul>
                                <li>Recipient Profiles</li>
                                <li>Award Profiles</li>
                                <li>Advanced Search</li>
                                <li>Keyword Search</li>
                            </ul>
                        </li>
                        <li>
                            You will be able to find federal awards using UEI or DUNS numbers via <Link onClick={handleGoToKeywordSearch} to="/keyword_search">Keyword Search</Link> or by using the &apos;Keyword&apos; or &apos;Recipient&apos; filters on <Link onClick={handleGoToAdvancedSearch} to="/search">Advanced Search</Link>
                        </li>
                        <li>
                            URLs to recipient profile pages will become associated with UEIs rather than DUNS — <span className="covid-modal-bold">please update any saved links to these pages to avoid service disruption</span>
                        </li>
                    </ul>
                    <p className="covid-modal-bold">
                        What is a UEI?
                    </p>
                    <p>
                        The UEI for an awardee or recipient is an alphanumeric code created in the System for Award Management (SAM) that is used to uniquely identify specific commercial, nonprofit, or business entities registered to do business with the federal government.
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
