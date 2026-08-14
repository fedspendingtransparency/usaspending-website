import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { QAT } from "GlobalConstants";
import AIWhiteIcon from '../../../../img/AI_Search_white.svg';
import AICyanIcon from '../../../../img/AI_Search_cyan.svg';

const pluralizeFilterLabel = (count) => {
    if (count === 1) {
        return 'Filter';
    }
    return 'Filters';
};

const propTypes = {
    showMobileFilters: PropTypes.bool,
    mobileSidebarContent: PropTypes.string,
    setMobileSidebarContent: PropTypes.func,
    toggleMobileFilters: PropTypes.func,
    filterCount: PropTypes.number
};

const MobileFilterButton = ({
    showMobileFilters,
    mobileSidebarContent,
    setMobileSidebarContent,
    toggleMobileFilters,
    filterCount
}) => {
    let showCountBadge = '';
    if (filterCount === 0) {
        showCountBadge = 'hide';
    }
    return (
        <div className={
            `mobile-filter-button-wrapper ${!showMobileFilters && 'mobile-filter-closed-shadow'}`
        } >
            <button
                className={`mobile-filter-button-v2  ${showMobileFilters && mobileSidebarContent === "filters" ? 'opened filters' : ''}`}
                onClick={() => {
                    setMobileSidebarContent("filters");
                    if(!showMobileFilters){
                        toggleMobileFilters();
                    }
                 
                }
                }
                onKeyUp={(e) => {
                    if (e.key === "Escape" && showMobileFilters) {
                        setMobileSidebarContent("filters")
                        if(!showMobileFilters){
                            toggleMobileFilters();
                        }
                    }
                }}>
                <div className="mobile-filter-button-content">
                    <div className={`mobile-filter-button-count ${showCountBadge}`}>
                        {filterCount}
                    </div>
                    <div className="mobile-filter-button-icon">
                        <FontAwesomeIcon icon="fa-solid fa-filter-list" />
                    </div>
                    <div className="mobile-filter-button-label">
                        {pluralizeFilterLabel(filterCount)}
                    </div>
                </div>
            </button>
            { QAT &&
            <button
                className={`mobile-filter-button-v2  ${showMobileFilters && mobileSidebarContent === "natural language" ? 'opened natural-language' : ''}`}
                onClick={() => {
                    setMobileSidebarContent("natural language");
                    if(!showMobileFilters){
                        toggleMobileFilters();
                    }
                }
                }
                onKeyUp={(e) => {
                    if (e.key === "Escape" && showMobileFilters) {
                        setMobileSidebarContent("natural language");
                        if(!showMobileFilters){
                            toggleMobileFilters();
                        }
                    }
                }}>
                <div className="mobile-filter-button-content">
                    <div className={`mobile-filter-button-icon ${showMobileFilters && 'opened'}`}>
                        <img src={showMobileFilters && mobileSidebarContent === "natural language"  ? AIWhiteIcon : AICyanIcon} alt="AI Search Icon" className={`mobile-filter-button-icon__svg ${showMobileFilters && 'opened'}`} />
                    </div>
                    <div className="mobile-filter-button-label">
                        AI Search
                    </div>
                </div>
            </button>
            }
        </div>
    );
};

MobileFilterButton.propTypes = propTypes;
export default MobileFilterButton;
