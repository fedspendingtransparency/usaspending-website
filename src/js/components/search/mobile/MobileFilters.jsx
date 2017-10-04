/**
 * MobileFilters.jsx
 * Created by Kevin Li 6/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import SearchSidebar from '../SearchSidebar';

const propTypes = {
    filters: PropTypes.object,
    showMobileFilters: PropTypes.bool,
    filterCount: PropTypes.number,
    toggleMobileFilters: PropTypes.func
};

export default class MobileFilters extends React.Component {
    render() {
        let content = null;
        if (this.props.showMobileFilters) {
            content = (
                <div className="mobile-filter-content">
                    <SearchSidebar
                        filters={this.props.filters}
                        toggleMobileFilters={this.props.toggleMobileFilters}
                        filterCount={this.props.filterCount}
                        mobile />
                </div>);
        }

        return (
            <CSSTransitionGroup
                transitionName="mobile-filter"
                transitionLeaveTimeout={195}
                transitionEnterTimeout={195}
                transitionLeave>
                {content}
            </CSSTransitionGroup>
        );
    }
}

MobileFilters.propTypes = propTypes;
