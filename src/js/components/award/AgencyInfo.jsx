/**
 * AgencyInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';
import InfoSnippet from './InfoSnippet';

const propTypes = {
    selectedAward: React.PropTypes.object,
    awardTypes: React.PropTypes.array
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
        if (nextProps.selectedAward.id !== this.props.selectedAward.id) {
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
        const award = this.props.selectedAward;
        const toptierAgency = `${this.state.agencyType}_agency_name`;
        const subtierAgency = `${this.state.agencyType}_subtier_name`;
        const officeAgency = `${this.state.agencyType}_office_name`;
        let office = "";
        let subtier = "";
        let toptier = "Not Available";

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
        if (award[toptierAgency]) {
            toptier = award[toptierAgency];
        }
        if (award[subtierAgency]) {
            subtier = (
                <InfoSnippet
                    label="Sub-Agency"
                    value={award[subtierAgency]} />
            );
        }
        if (award[officeAgency]) {
            office = (
                <InfoSnippet
                    label="Office"
                    value={award[officeAgency]} />
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
