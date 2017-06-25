/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import { AddFilter, CloseCircle } from 'components/sharedComponents/icons/Icons';

import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';
import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';

import TimeVisualizationSectionContainer from
    'containers/search/visualizations/time/TimeVisualizationSectionContainer';
import RankVisualizationWrapperContainer from
    'containers/search/visualizations/rank/RankVisualizationWrapperContainer';
import GeoVisualizationSectionContainer from
    'containers/search/visualizations/geo/GeoVisualizationSectionContainer';

import MobileFilters from './mobile/MobileFilters';

const propTypes = {
    filterCount: React.PropTypes.number,
    showMobileFilters: React.PropTypes.bool,
    toggleMobileFilters: React.PropTypes.func,
    clearAllFilters: React.PropTypes.func
};

export default class SearchResults extends React.Component {
    render() {
        let mobileFilters = '';
        if (this.props.showMobileFilters) {
            mobileFilters = 'behind-filters';
        }

        let showClearButton = 'hide';
        if (this.props.filterCount > 0) {
            showClearButton = '';
        }

        let showCountBadge = '';
        if (this.props.filterCount === 0 || this.props.showMobileFilters) {
            showCountBadge = 'hide';
        }

        return (
            <div className="search-results-wrapper">
                <TopFilterBarContainer {...this.props} />
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
                                Filters
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
                        filterCount={this.props.filterCount}
                        showMobileFilters={this.props.showMobileFilters}
                        toggleMobileFilters={this.props.toggleMobileFilters} />
                </div>
                <div className={`search-results ${mobileFilters}`}>
                    <TimeVisualizationSectionContainer />
                    <RankVisualizationWrapperContainer />
                    <GeoVisualizationSectionContainer />
                    <ResultsTableContainer />
                </div>
            </div>
        );
    }
}

SearchResults.propTypes = propTypes;
