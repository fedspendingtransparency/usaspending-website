/**
 * SearchResults.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import TopFilterBarContainer from 'containers/search/topFilterBar/TopFilterBarContainer';
import VisualizationWrapperContainer from 'containers/search/visualizations/VisualizationWrapperContainer';

const propTypes = {
    filters: PropTypes.object,
    isMobile: PropTypes.bool,
    filterCount: PropTypes.number,
    showMobileFilters: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    noFiltersApplied: PropTypes.bool,
    toggleMobileFilters: PropTypes.func
};

const SearchResults = (props) => {
    let mobileFilters = '';
    if (props.showMobileFilters && props.isMobile) {
        mobileFilters = 'behind-filters';
    }

    return (
        <div className="search-results-wrapper">
            <TopFilterBarContainer {...props} />
            <div className={`search-results ${mobileFilters}`}>
                <VisualizationWrapperContainer
                    isMobile={props.isMobile}
                    requestsComplete={props.requestsComplete}
                    noFiltersApplied={props.noFiltersApplied} />
            </div>
        </div>
    );
};

SearchResults.propTypes = propTypes;
export default SearchResults;
