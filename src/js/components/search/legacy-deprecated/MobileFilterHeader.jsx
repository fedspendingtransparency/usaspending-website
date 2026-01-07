/**
 * MobileFilterHeader.jsx
 * Created by Kevin Li 6/23/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ArrowUp } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    toggleMobileFilters: PropTypes.func,
    filterCount: PropTypes.number
};

export default class MobileFilterHeader extends React.Component {
    pluralizeFilters(count) {
        if (count !== 1) {
            return `${count} Filters Applied`;
        }
        return `${count} Filter Applied`;
    }

    render() {
        return (
            <div className="mobile-filter-header">
                <div className="filter-header-count">
                    {this.pluralizeFilters(this.props.filterCount)}
                </div>
                <div className="filter-header-collapse">
                    <button
                        className="filter-collapse"
                        onClick={this.props.toggleMobileFilters}>
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
        );
    }
}

MobileFilterHeader.propTypes = propTypes;
