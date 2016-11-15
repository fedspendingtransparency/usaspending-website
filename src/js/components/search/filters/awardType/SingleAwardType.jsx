/**
 * SingleAwardType.jsx
 * Created by Kevin Li 11/7/16
 **/

import React from 'react';

const propTypes = {
    id: React.PropTypes.string,
    code: React.PropTypes.string,
    name: React.PropTypes.string,
    toggleAwardType: React.PropTypes.func,
    reduxFilters: React.PropTypes.object
};

export default class SingleAwardType extends React.Component {
    toggleFilter() {
        // indicate to Redux that this field needs to toggle
        this.props.toggleAwardType(this.props.code);
    }
    render() {
        const checked = this.props.reduxFilters.includes(this.props.code);
        return (
            <div className="primary-award-type">
                <div className="award-type-item-wrapper">
                    <input
                        type="checkbox"
                        id={this.props.id}
                        value={this.props.code}
                        checked={checked}
                        onChange={this.toggleFilter.bind(this)} />
                    <label htmlFor={this.props.id}>{this.props.name}</label>
                </div>
            </div>
        );
    }
}
SingleAwardType.propTypes = propTypes;
