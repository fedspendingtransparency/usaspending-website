/**
 * AgencyInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import _ from 'lodash';
import InfoSnippet from './InfoSnippet';

const propTypes = {
    selectedAward: React.PropTypes.object,
    awardTypes: React.PropTypes.array
};

const defaultProps = {
    awardTypes: [
        "awarding",
        "funding"
    ]
};

export default class AgencyInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            agencyType: "awarding"
        };

        this.toggleAgency = this.toggleAgency.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedAward.id !== this.props.selectedAward.id) {
            this.setState({
                agencyType: "awarding"
            });
        }
    }

    toggleAgency(e) {
        this.setState({
            agencyType: e.target.value
        });
    }

    render() {
        const award = this.props.selectedAward;
        const toptierAgency = `${this.state.agencyType}_agency_name`;
        const subtierAgency = `${this.state.agencyType}_subtier_name`;
        const officeAgency = `${this.state.agencyType}_office_name`;
        let office = "";

        const options = this.props.awardTypes.map((name) =>
            <option name={name} value={name} key={name}>
                {_.capitalize(name)} Agency</option>);

        const dropdown = (
            <div className="agency-select">
                <select
                    className="agency-option"
                    onChange={this.toggleAgency}
                    value={this.state.agencyType}>
                    { options }
                </select>
            </div>
        );
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
                        {award[toptierAgency]}
                    </div>
                    <ul className="agency-subtiers">
                        <InfoSnippet
                            label="Sub-tier Agency"
                            value={award[subtierAgency]} />
                        {office}
                    </ul>
                </div>
                <div className="triangle-wrapper" />
            </div>
        );
    }
}
AgencyInfo.propTypes = propTypes;
AgencyInfo.defaultProps = defaultProps;
