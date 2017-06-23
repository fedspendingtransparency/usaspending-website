/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import { AddFilter } from 'components/sharedComponents/icons/Icons';

import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';
import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';

import TimeVisualizationSectionContainer from
    'containers/search/visualizations/time/TimeVisualizationSectionContainer';
import RankVisualizationWrapperContainer from
    'containers/search/visualizations/rank/RankVisualizationWrapperContainer';
import GeoVisualizationSectionContainer from
    'containers/search/visualizations/geo/GeoVisualizationSectionContainer';

import MobileFilters from './MobileFilters';

const propTypes = {
    filterCount: React.PropTypes.number,
    showMobileFilters: React.PropTypes.bool,
    toggleMobileFilters: React.PropTypes.func
};

export default class SearchResults extends React.Component {
    render() {
        let mobileFilters = '';
        if (this.props.showMobileFilters) {
            mobileFilters = 'behind-filters';
        }

        return (
            <div className="search-results-wrapper">
                <TopFilterBarContainer {...this.props} />
                <div className="mobile-filter-button-wrapper">
                    <button
                        className="mobile-filter-button"
                        onClick={this.props.toggleMobileFilters}>
                        <div className="mobile-filter-button-content">
                            <div className="mobile-filter-button-icon">
                                <AddFilter alt="Toggle filters" />
                            </div>
                            <div className="mobile-filter-button-label">
                                Filters
                            </div>
                        </div>
                    </button>
                </div>
                <div className="mobile-search-sidebar">
                    <MobileFilters
                        filterCount={this.props.filterCount}
                        showMobileFilters={this.props.showMobileFilters} />
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
