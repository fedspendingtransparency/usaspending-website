/**
 * MobileFilters.jsx
 * Created by Kevin Li 6/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import SearchSidebar from '../SearchSidebar';

const propTypes = {
    filters: PropTypes.object,
    showMobileFilters: PropTypes.bool,
    filterCount: PropTypes.number,
    toggleMobileFilters: PropTypes.func
};

const MobileFilters = ({ filters, showMobileFilters }) => (
    <TransitionGroup>
        {showMobileFilters && (
            <CSSTransition
                classNames="mobile-filter"
                timeout={195}
                exit>
                <div className="mobile-filter-content">
                    <SearchSidebar filters={filters} />
                </div>
            </CSSTransition>
        )}
    </TransitionGroup>
);

MobileFilters.propTypes = propTypes;

export default MobileFilters;
