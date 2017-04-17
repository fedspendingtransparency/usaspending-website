/**
 * ObjectClassItem.jsx
 * Created by Kevin Li 3/30/17
 */

import React from 'react';

const propTypes = {
    code: React.PropTypes.string,
    label: React.PropTypes.string,
    checked: React.PropTypes.bool,
    toggleValue: React.PropTypes.func
};

export default class ObjectClassItem extends React.Component {
    render() {
        return (
            <li className="object-class-set">
                <div className="award-type-item-wrapper">
                    <input
                        type="checkbox"
                        id={`object-class-${this.props.code}`}
                        value={this.props.code}
                        checked={this.props.checked}
                        onChange={this.props.toggleValue} />
                    <label htmlFor={`object-class-${this.props.code}`}>
                        {this.props.label}</label>
                </div>
            </li>
        );
    }
}

ObjectClassItem.propTypes = propTypes;
