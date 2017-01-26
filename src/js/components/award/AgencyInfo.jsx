/**
 * AgencyInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';

export default class AgencyInfo extends React.Component {

    render() {
        // const agency = this.props[agencyType];
        return (
            <div className="agency-wrapper">
                <div className="agency-info">
                    <select className="agency-option">
                        <option name="awarding" id="awarding">Awarding Agency</option>
                        <option name="funding" id="funding">Funding Agency</option>
                    </select>
                    <div className="agency-name">
                        {this.props.awardingAgency.toptier_agency.name}
                    </div>
                    <ul className="agency-subtiers">
                        <li className="subtier-agency">
                            <div className="subtier title">
                                Awarding Subtier Agency
                            </div>
                            <div className="subtier name">
                                {this.props.awardingAgency.subtier_agency.name}
                            </div>
                        </li>
                        <li className="office-agency">
                            <div className="office title">
                                Awarding Office
                            </div>
                            <div className="office name">
                                Placeholder
                            </div>
                        </li>
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
