/**
  * FormatItem.jsx
  * Created by Kevin Li 11/10/16
  **/

import React from 'react';

const defaultProps = {
    isActive: false
};

const propTypes = {
    isActive: React.PropTypes.bool,
    icon: React.PropTypes.element,
    label: React.PropTypes.string
};

export default class FormatItem extends React.Component {
    render() {
        let activeClass = '';
        if (this.props.isActive) {
            activeClass = ' active';
        }
        return (
            <button className={`format-item${activeClass}`}>
                <div className="item-icon">
                    {this.props.icon}
                </div>
                <div className="item-label">
                    {this.props.label}
                </div>
            </button>
        );
    }
}

FormatItem.propTypes = propTypes;
