/**
 * MobileFiltersV2.jsx
 * Created by Nick Torres 1/7/2025
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transitioning';
import { FlexGridCol } from "data-transparency-ui";

import CollapsibleSidebar from "../collapsibleSidebar/SidebarWrapper";

const propTypes = {
    filters: PropTypes.object,
    showMobileFilters: PropTypes.bool,
    setShowMobileFilters: PropTypes.func,
    sidebarOpen: PropTypes.bool,
    setSidebarOpen: PropTypes.func
};

const MobileFiltersV2 = ({
    filters, showMobileFilters, setShowMobileFilters, sidebarOpen, setSidebarOpen
}) => (
    <FlexGridCol className={`mobile-search-sidebar-v2 ${sidebarOpen ? 'sidebar-opened' : ''}`}>
        <TransitionGroup id="mobile-filter-div">
            {showMobileFilters && (
                <CSSTransition
                    classNames="mobile-filter"
                    timeout={195}
                    exit>
                    <div className="mobile-filter-content">
                        <CollapsibleSidebar
                            filters={filters}
                            setShowMobileFilters={setShowMobileFilters}
                            showMobileFilters={showMobileFilters}
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen} />
                    </div>
                </CSSTransition>
            )}
        </TransitionGroup>
    </FlexGridCol>
);

MobileFiltersV2.propTypes = propTypes;

export default MobileFiltersV2;
