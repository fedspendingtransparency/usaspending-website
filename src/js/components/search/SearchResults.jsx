/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { AddFilter, CloseCircle } from 'components/sharedComponents/icons/Icons';

import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';

import VisualizationWrapper from './visualizations/VisualizationWrapper';
import MobileFilters from './mobile/MobileFilters';

const propTypes = {
    filters: PropTypes.object,
    isMobile: PropTypes.bool,
    filterCount: PropTypes.number,
    showMobileFilters: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    toggleMobileFilters: PropTypes.func,
    clearAllFilters: PropTypes.func
};

export default class SearchResults extends React.Component {
    pluralizeFilterLabel(count) {
        if (count === 1) {
            return 'Filter';
        }
        return 'Filters';
    }

    render() {
        let mobileFilters = '';
        if (this.props.showMobileFilters && this.props.isMobile) {
            mobileFilters = 'behind-filters';
        }

        let showClearButton = 'hide';
        if (this.props.filterCount > 0) {
            showClearButton = '';
        }

        let showCountBadge = '';
        if (this.props.filterCount === 0) {
            showCountBadge = 'hide';
        }

        return (
            <div className="search-results-wrapper">
                <div className="mobile-filter-button-wrapper">
                    <button
                        className="mobile-filter-button"
                        onClick={this.props.toggleMobileFilters}>
                        <div className="mobile-filter-button-content">
                            <div className={`mobile-filter-button-count ${showCountBadge}`}>
                                {this.props.filterCount}
                            </div>
                            <div className="mobile-filter-button-icon">
                                <AddFilter alt="Toggle filters" />
                            </div>
                            <div className="mobile-filter-button-label">
                                {this.pluralizeFilterLabel(this.props.filterCount)}
                            </div>
                        </div>
                    </button>
                    <button
                        className={`mobile-clear-all ${showClearButton}`}
                        onClick={this.props.clearAllFilters}>
                        <div className="mobile-clear-all-content">
                            <div className="icon">
                                <CloseCircle alt="Clear all filters" />
                            </div>
                            <div className="label">
                                Clear all filters
                            </div>
                        </div>
                    </button>
                </div>
                <div className="mobile-search-sidebar">
                    <MobileFilters
                        filters={this.props.filters}
                        filterCount={this.props.filterCount}
                        showMobileFilters={this.props.showMobileFilters}
                        toggleMobileFilters={this.props.toggleMobileFilters} />
                </div>
                <div className="full-search-results-wrapper">
                    <TopFilterBarContainer {...this.props} />
                    <div className={`search-results ${mobileFilters}`}>
                        <VisualizationWrapper
                            isMobile={this.props.isMobile}
                            requestsComplete={this.props.requestsComplete} />
                    </div>
                </div>
            </div>
        );
    }
}

SearchResults.propTypes = propTypes;
