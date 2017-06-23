/**
 * MobileFilters.jsx
 * Created by Kevin Li 6/22/17
 */

import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { ArrowUp } from 'components/sharedComponents/icons/Icons';

import SearchSidebar from './SearchSidebar';

const propTypes = {
    showMobileFilters: React.PropTypes.bool,
    filterCount: React.PropTypes.number
};

export default class MobileFilters extends React.Component {

    pluralizeFilters(count) {
        if (count !== 1) {
            return `${count} Filters Applied`;
        }
        return `${count} Filter Applied`;
    }

    render() {
        let content = null;
        if (this.props.showMobileFilters) {
            content = (
                <div className="mobile-filter-content">
                    <div className="mobile-filter-header">
                        <div className="filter-header-count">
                            {this.pluralizeFilters(this.props.filterCount)}
                        </div>
                        <div className="filter-header-collapse">
                            <button className="filter-collapse">
                                <div className="filter-collapse-content">
                                    <div className="icon">
                                        <ArrowUp alt="Hide Filters" />
                                    </div>
                                    <div className="label">
                                        Hide Filters
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <SearchSidebar mobile />
                </div>);
        }

        return (
            <CSSTransitionGroup
                transitionName="mobile-filter"
                transitionLeaveTimeout={500}
                transitionEnterTimeout={500}
                transitionLeave>
                {content}
            </CSSTransitionGroup>
        );
    }
}

MobileFilters.propTypes = propTypes;
