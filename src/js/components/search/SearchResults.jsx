/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { AddFilter } from 'components/sharedComponents/icons/Icons';
import { showModal } from 'redux/actions/modal/modalActions';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';
import VisualizationWrapperContainer from 'containers/search/visualizations/VisualizationWrapperContainer';
import MobileFilters from './mobile/MobileFilters';
import Button from "../sharedComponents/buttons/Button";

const propTypes = {
    filters: PropTypes.object,
    isMobile: PropTypes.bool,
    filterCount: PropTypes.number,
    showMobileFilters: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    noFiltersApplied: PropTypes.bool,
    toggleMobileFilters: PropTypes.func,
    clearAllFilters: PropTypes.func
};

const SearchResults = (props) => {
    const pluralizeFilterLabel = (count) => {
        if (count === 1) {
            return 'Filter';
        }
        return 'Filters';
    };

    const dispatch = useDispatch();
    let mobileFilters = '';
    if (props.showMobileFilters && props.isMobile) {
        mobileFilters = 'behind-filters';
    }

    let showCountBadge = '';
    if (props.filterCount === 0) {
        showCountBadge = 'hide';
    }

    return (
        <div className="search-results-wrapper">
            <div className="mobile-filter-button-wrapper">
                <button
                    className="mobile-filter-button"
                    onClick={props.toggleMobileFilters}>
                    <div className="mobile-filter-button-content">
                        <div className={`mobile-filter-button-count ${showCountBadge}`}>
                            {props.filterCount}
                        </div>
                        <div className="mobile-filter-button-icon">
                            <AddFilter alt="Toggle filters" />
                        </div>
                        <div className="mobile-filter-button-label">
                            {pluralizeFilterLabel(props.filterCount)}
                        </div>
                    </div>
                </button>
            </div>
            <div className="mobile-search-sidebar">
                <MobileFilters
                    filters={props.filters}
                    filterCount={props.filterCount}
                    showMobileFilters={props.showMobileFilters}
                    toggleMobileFilters={props.toggleMobileFilters} />
            </div>
            <div className="tablet-search__modal">
                {!props.showMobileFilters && <Button
                    onClick={(e) => {
                        e.persist();
                        dispatch(showModal(window.location.href, 'filter'));
                    }}
                    onKeyUp={(e) => {
                        e.persist();
                        if (e.key === 'Enter') {
                            dispatch(showModal(window.location.href, 'filter'));
                        }
                    }}
                    copy="Learn how active filters work"
                    buttonTitle="filter modal"
                    buttonSize="sm"
                    buttonType="text"
                    backgroundColor="light"
                    imageAlignment="right"
                    image={<FontAwesomeIcon icon="window-restore" />} />}
            </div>
            <div className="full-search-results-wrapper">
                <TopFilterBarContainer {...props} />
                <div className={`search-results ${mobileFilters}`}>
                    <VisualizationWrapperContainer
                        isMobile={props.isMobile}
                        requestsComplete={props.requestsComplete}
                        noFiltersApplied={props.noFiltersApplied} />
                </div>
            </div>
        </div>
    );
};

SearchResults.propTypes = propTypes;
export default SearchResults;
