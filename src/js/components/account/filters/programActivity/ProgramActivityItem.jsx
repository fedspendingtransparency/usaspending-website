/**
 * ProgramActivityItem.jsx
 * Created by michaelbray on 4/14/17.
 */

import React from 'react';

const propTypes = {
    code: React.PropTypes.string,
    label: React.PropTypes.string,
    checked: React.PropTypes.bool,
    toggleValue: React.PropTypes.func
};

export default class ProgramActivityItem extends React.Component {
    render() {
        return (
            <li className="program-activity-set">
                <div className="award-type-item-wrapper">
                    <input
                        type="checkbox"
                        id={`program-activity-${this.props.code}`}
                        value={this.props.code}
                        checked={this.props.checked}
                        onChange={this.props.toggleValue} />
                    <label htmlFor={`program-activity-${this.props.code}`}>
                        {this.props.label}</label>
                </div>
            </li>
        );
    }
}

ProgramActivityItem.propTypes = propTypes;
