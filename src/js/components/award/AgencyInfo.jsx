/**
 * AgencyInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import _ from 'lodash';

const propTypes = {
    toggleAgency: React.PropTypes.func,
    agencyType: React.PropTypes.object
};

export default class AgencyInfo extends React.Component {

    // do a foreach on this.props.agencytype?
    // map name to value and classname

    render() {
        this.coolFunction();
        const toptier = this.props.agencyType.toptier_agency;
        const subtier = this.props.agencyType.subtier_agency;
        const office = this.props.agencyType.office_agency;
        let toptierBundle = null;
        let subtierBundle = null;
        let officeBundle = null;

        if (toptier) {
            toptierBundle = (
                <div className="agency-name">
                    {toptier.name}
                </div>
            );
        }

        if (subtier) {
            subtierBundle = (
                <li className="subtier-agency">
                    <div className="subtier title">
                        Awarding Subtier Agency
                    </div>
                    <div className="subtier name">
                        {subtier.name}
                    </div>
                </li>
            );
        }

        if (office) {
            officeBundle = (
                <li className="office-agency">
                    <div className="office title">
                        Awarding Office
                    </div>
                    <div className="office name">
                        {office.name}
                    </div>
                </li>
            );
        }

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
                    { toptierBundle }
                    <ul className="agency-subtiers">
                        { subtierBundle }
                        { officeBundle }
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
