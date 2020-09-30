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

export default class MobileFilters extends React.Component {
    render() {
        return (
            <TransitionGroup>
                {this.props.showMobileFilters && (
                    <CSSTransition
                        classNames="mobile-filter"
                        timeout={195}
                        exit>
                        <div className="mobile-filter-content">
                            <SearchSidebar
                                filters={this.props.filters}
                                toggleMobileFilters={this.props.toggleMobileFilters}
                                filterCount={this.props.filterCount}
                                mobile />
                        </div>
                    </CSSTransition>
                )}
            </TransitionGroup>
        );
    }
}

MobileFilters.propTypes = propTypes;
