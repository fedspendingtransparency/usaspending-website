/**
 * DetailsTablePickerItem.jsx
 * Created by Lizzie Salita 03/28/17
 **/

import React from 'react';

const propTypes = {
    label: React.PropTypes.string,
    code: React.PropTypes.string,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    clickTab: React.PropTypes.func,
    togglePicker: React.PropTypes.func
};

export default class DetailsTablePickerItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.clickTab(this.props.code);
        this.props.togglePicker();
    }

    render() {
        let activeClass = '';
        if (this.props.active) {
            activeClass = 'active';
        }

        let disabledClass = '';
        if (this.props.disabled) {
            disabledClass = 'disabled';
        }

        return (
            <li
                className="field-item"
                key={`field-${this.props.label}`}>
                <button
                    className={`item-button table-tab-toggle ${activeClass} ${disabledClass}`}
                    title={this.props.label}
                    aria-label={this.props.label}
                    onClick={this.clickedButton}
                    disabled={this.props.disabled}>
                    {this.props.label}
                </button>
            </li>
        );
    }
}

DetailsTablePickerItem.propTypes = propTypes;
