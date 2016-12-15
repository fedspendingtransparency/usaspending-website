/**
  * TopFilterItem.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    title: React.PropTypes.string.isRequired,
    value: React.PropTypes.any
};

const defaultProps = {
    title: 'Filter'
};

export default class TopFilterItem extends React.Component {
    render() {
        const accessibleLabel = `Remove filter for ${this.props.title}`;

        return (
            <div className="filter-item-container">
                <div className="filter-item">
                    <div className="filter-item-title">
                        {this.props.title}
                    </div>
                    <div className="filter-item-remove-container">
                        <button
                            className="filter-remove"
                            aria-label={accessibleLabel}
                            title={accessibleLabel}>
                            <span className="sr-only">
                                {accessibleLabel}
                            </span>
                            <span className="close-icon">
                                <Icons.Times alt={accessibleLabel} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

TopFilterItem.propTypes = propTypes;
TopFilterItem.defaultProps = defaultProps;
