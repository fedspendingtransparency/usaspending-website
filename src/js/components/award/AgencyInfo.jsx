/**
 * AgencyInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';

const propTypes = {
    toggleAgency: React.PropTypes.func,
    agencySet: React.PropTypes.object,
    agencyTitle: React.PropTypes.string,
    setAwardValues: React.PropTypes.func,
    toptierAgency: React.PropTypes.object,
    subtierAgency: React.PropTypes.object,
    officeAgency: React.PropTypes.object
};

export default class AgencyInfo extends React.Component {
    componentDidMount() {
        this.props.setAwardValues(this.props.agencyTitle, this.props.agencySet);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.agencyTitle !== nextProps.agencyTitle) {
            this.props.setAwardValues(nextProps.agencyTitle, nextProps.agencySet);
        }
    }

    render() {
        let toptierBundle = null;
        let subtierBundle = null;
        let officeBundle = null;

        toptierBundle = (
            <div className="agency-name">
                {this.props.toptierAgency.value}
            </div>
        );
        subtierBundle = (
            <li className="subtier-agency">
                <div className="subtier title">
                    {this.props.agencyTitle} Sub-tier Agency
                </div>
                <div className="subtier name">
                    {this.props.subtierAgency.value}
                </div>
            </li>
        );

        if (this.props.officeAgency.value) {
            officeBundle = (
                <li className="office-agency">
                    <div className="office title">
                        {this.props.agencyTitle} Office
                    </div>
                    <div className="office name">
                        {this.props.officeAgency.value}
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
