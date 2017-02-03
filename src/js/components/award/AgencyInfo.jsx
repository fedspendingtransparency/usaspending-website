/**
 * AgencyInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import InfoSnippet from './InfoSnippet';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AgencyInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            agencyType: "awarding"
        };

        this.toggleAgency = this.toggleAgency.bind(this);
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

        const dropdown = (
            <div className="agency-select">
                <select className="agency-option" onChange={this.toggleAgency}>
                    <option name="awarding" value="awarding">Awarding Agency</option>
                    <option name="funding" value="funding">Funding Agency</option>
                </select>
            </div>
        );
        if (award[officeAgency]) {
            office = (
                <InfoSnippet
                    titleValue="Office"
                    nameValue={award[officeAgency]} />
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
                            titleValue="Sub-tier Agency"
                            nameValue={award[subtierAgency]} />
                        {office}
                    </ul>
                </div>
                <div className="triangle-wrapper">
                    <div className="outer-triangle" />
                    <div className="triangle" />
                </div>
            </div>
        );
    }
}
AgencyInfo.propTypes = propTypes;
