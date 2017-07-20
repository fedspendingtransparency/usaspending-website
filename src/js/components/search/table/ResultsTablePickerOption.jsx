/**
 * ResultsTablePickerOption.jsx
 * Created by Lizzie Salita 03/28/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';

const propTypes = {
    label: PropTypes.string,
    internal: PropTypes.string,
    active: PropTypes.bool,
    enabled: PropTypes.bool,
    switchTab: PropTypes.func,
    togglePicker: PropTypes.func
};

export default class ResultsTablePickerOption extends React.Component {
    constructor(props) {
        super(props);

        this.clickedTab = this.clickedTab.bind(this);
    }

    clickedTab() {
        this.props.switchTab(this.props.internal);
        this.props.togglePicker();
    }

    render() {
        const comingSoonModule = (<ComingSoonLabel />);
        let activeClass = '';
        let comingSoon = '';
        let disabledStatus = '';
        let status = '';
        if (this.props.active) {
            activeClass = ' active';
        }
        if (this.props.enabled === false) {
            comingSoon = comingSoonModule;
            status = ' coming-soon';
            disabledStatus = true;
        }
        else {
            status = '';
            disabledStatus = false;
        }

        return (
            <li
                className="field-item"
                key={`field-${this.props.label}`}>
                <button
                    className={`item-button table-type-toggle${activeClass}${status}`}
                    onClick={this.clickedTab}
                    title={`Show ${this.props.label}`}
                    disabled={disabledStatus}>
                    {this.props.label}
                    {comingSoon}
                </button>
            </li>
        );
    }
}

ResultsTablePickerOption.propTypes = propTypes;
