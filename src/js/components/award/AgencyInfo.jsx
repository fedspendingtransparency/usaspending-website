/**
 * AgencyInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';
import InfoSnippet from './InfoSnippet';

const propTypes = {
    awardId: PropTypes.string,
    fundingAgency: PropTypes.object,
    awardingAgency: PropTypes.object,
    awardTypes: PropTypes.array
};

const defaultProps = {
    awardTypes: [
        {
            label: "Awarding Agency",
            value: "awarding"
        },
        {
            label: "Funding Agency",
            value: "funding"
        }
    ]
};

export default class AgencyInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agencyType: "awarding",
            selectedIndex: 0,
            showPicker: false
        };

        this.toggleAgency = this.toggleAgency.bind(this);
        this.togglePicker = this.togglePicker.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.awardId !== this.props.awardId) {
            this.setState({
                agencyType: "awarding",
                selectedIndex: 0
            });
        }
    }

    toggleAgency(e) {
        this.setState({
            agencyType: this.props.awardTypes[e.target.value].value,
            selectedIndex: e.target.value,
            showPicker: false
        });
    }

    togglePicker() {
        this.setState({
            showPicker: !this.state.showPicker
        });
    }

    render() {
        const toptier = this.props[`${this.state.agencyType}Agency`].toptierName;
        const subtierName = this.props[`${this.state.agencyType}Agency`].subtierName;
        const officeName = this.props[`${this.state.agencyType}Agency`].officeName;

        const options = this.props.awardTypes.map((label, index) => (
            <li
                className="field-item"
                key={`field-${label.value}`}>
                <button
                    className="item-button"
                    title={label.label}
                    aria-label={label.label}
                    value={index}
                    onClick={this.toggleAgency}>
                    {label.label}
                </button>
            </li>
        ));

        const currentField = this.props.awardTypes[this.state.selectedIndex].label;
        let showPicker = 'hide';
        let icon = <Icons.AngleDown alt="Pick a field" />;
        if (this.state.showPicker) {
            showPicker = '';
            icon = <Icons.AngleUp alt="Pick a field" />;
        }

        const dropdown = (
            <div className="field-picker">
                <button
                    className="selected-button"
                    title={currentField}
                    aria-label={currentField}
                    onClick={this.togglePicker}>
                    <span className="label">
                        {currentField}
                    </span>
                    <span className="arrow-icon">
                        {icon}
                    </span>
                </button>

                <div className={`field-list ${showPicker}`}>
                    <ul>
                        {options}
                    </ul>
                </div>
            </div>
        );

        let subtier = null;
        let office = null;

        if (subtierName) {
            subtier = (
                <InfoSnippet
                    label="Sub-Agency"
                    value={subtierName} />
            );
        }

        if (officeName) {
            office = (
                <InfoSnippet
                    label="Office"
                    value={officeName} />
            );
        }
        return (
            <div className="agency-wrapper">
                <div className="agency-info">
                    {dropdown}
                    <div className="agency-name">
                        {toptier}
                    </div>
                    <ul className="agency-subtiers">
                        {subtier}
                        {office}
                    </ul>
                </div>
            </div>
        );
    }
}
AgencyInfo.propTypes = propTypes;
AgencyInfo.defaultProps = defaultProps;
