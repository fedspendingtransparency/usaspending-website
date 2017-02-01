/**
 * AgencyInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import InfoSnippet from './InfoSnippet';

const propTypes = {
    toggleAgency: React.PropTypes.func,
    agencyType: React.PropTypes.string,
    selectedAward: React.PropTypes.object
};

export default class AgencyInfo extends React.Component {

    render() {
        const award = this.props.selectedAward;
        const toptierAgency = `${this.props.agencyType}_agency_name`;
        const subtierAgency = `${this.props.agencyType}_subtier_agency_name`;
        const officeAgency = `${this.props.agencyType}_office_agency_name`;

        const dropdown = (
            <select className="agency-option" onChange={this.props.toggleAgency}>
                <option name="awarding" value="awarding">Awarding Agency</option>
                <option name="funding" value="funding">Funding Agency</option>
            </select>
        );
        return (
            <div className="agency-wrapper">
                <div className="agency-info">
                    { dropdown }
                    <div className="agency-name">
                        {award[toptierAgency]}
                    </div>
                    <ul className="agency-subtiers">
                        <InfoSnippet
                            titleValue="Sub-tier Agency"
                            nameValue={award[subtierAgency]} />
                        <InfoSnippet
                            titleValue="Office"
                            nameValue={award[officeAgency]} />
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
