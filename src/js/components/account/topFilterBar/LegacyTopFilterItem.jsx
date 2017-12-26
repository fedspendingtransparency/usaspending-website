/**
  * LegacyTopFilterItem.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.any,
    removeFilter: PropTypes.func,
    compressed: PropTypes.bool
};

const defaultProps = {
    title: 'Filter',
    compressed: false
};

export default class LegacyTopFilterItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        if (this.props.compressed) {
            return;
        }
        this.props.removeFilter(this.props.value);
    }

    render() {
        const accessibleLabel = `Remove filter for ${this.props.title}`;

        let hideCompressed = '';
        if (this.props.compressed) {
            hideCompressed = 'hide';
        }

        return (
            <div className="filter-item-container">
                <button
                    className="filter-item"
                    aria-label={accessibleLabel}
                    title={accessibleLabel}
                    onClick={this.clickedButton}
                    disabled={this.props.compressed}>
                    <div className="filter-item-title">
                        {this.props.title}
                    </div>
                    <div className={`filter-item-remove-container ${hideCompressed}`}>
                        <div className="filter-remove">
                            <span className="sr-only">
                                {accessibleLabel}
                            </span>
                            <span className="close-icon">
                                <Icons.Close alt={accessibleLabel} />
                            </span>
                        </div>
                    </div>
                </button>
            </div>
        );
    }
}

LegacyTopFilterItem.propTypes = propTypes;
LegacyTopFilterItem.defaultProps = defaultProps;
