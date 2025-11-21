import React from "react";
import PropTypes from "prop-types";

const pluralizeFilterLabel = (count) => {
    if (count === 1) {
        return 'Filter';
    }
    return 'Filters';
};

const propTypes = {
    showMobileFilters: PropTypes.bool,
    sidebarOpen: PropTypes.bool,
    toggleMobileFilters: PropTypes.func,
    filterCount: PropTypes.number
};

const MobileFilterButton = ({
    showMobileFilters,
    sidebarOpen,
    toggleMobileFilters,
    filterCount
}) => {
    let showCountBadge = '';
    if (filterCount === 0) {
        showCountBadge = 'hide';
    }

    return (
        <div className={
            `mobile-filter-button-wrapper ${showMobileFilters && sidebarOpen ? 'hidden' : ''}`
        } >
            <button
                className="mobile-filter-button-v2"
                onClick={toggleMobileFilters}
                onKeyUp={(e) => {
                    if (e.key === "Escape" && showMobileFilters) {
                        toggleMobileFilters();
                    }
                }}>
                <div className="mobile-filter-button-content">
                    <div className={`mobile-filter-button-count ${showCountBadge}`}>
                        {filterCount}
                    </div>
                    <div className="mobile-filter-button-icon">
                        <img
                            className="usa-da-mobile-filter-icon"
                            alt="Toggle filters"
                            aria-label="Toggle filters"
                            src="img/Add-search-filters-icon.svg" />
                    </div>
                    <div className="mobile-filter-button-label">
                        {pluralizeFilterLabel(filterCount)}
                    </div>
                </div>
            </button>
        </div>
    );
};

MobileFilterButton.propTypes = propTypes;
export default MobileFilterButton;
