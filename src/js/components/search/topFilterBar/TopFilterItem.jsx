/**
  * TopFilterItem.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.any,
    removeFilter: PropTypes.func
};

const defaultProps = {
    title: 'Filter'
};

export default class TopFilterItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.removeFilter(this.props.value);
    }

    render() {
        const accessibleLabel = `Remove filter for ${this.props.title}`;

        return (
            <div className="filter-item-container">
                <button
                    className="filter-item"
                    aria-label={accessibleLabel}
                    title={accessibleLabel}
                    onClick={this.clickedButton}>
                    <div className="filter-item-title">
                        {this.props.title}
                    </div>
                    <div className="filter-item-remove-container">
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

TopFilterItem.propTypes = propTypes;
TopFilterItem.defaultProps = defaultProps;
