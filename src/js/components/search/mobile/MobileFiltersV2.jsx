/**
 * MobileFiltersV2.jsx
 * Created by Nick Torres 1/7/2025
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
    <TransitionGroup id="mobile-filter-div">
        {showMobileFilters && (
            <CSSTransition
                classNames="mobile-filter"
                timeout={195}
                exit>
                <div className="mobile-filter-content">
                    <CollapsibleSidebar filters={filters} setShowMobileFilters={setShowMobileFilters} showMobileFilters={showMobileFilters} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                </div>
            </CSSTransition>
        )}
    </TransitionGroup>
);

MobileFiltersV2.propTypes = propTypes;

export default MobileFiltersV2;
