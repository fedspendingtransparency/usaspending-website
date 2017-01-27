/**
 * AwardInfoBar.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import AgencyInfo from './AgencyInfo';
import RecipientInfo from './RecipientInfo';

const propTypes = {
    selectedAward: React.PropTypes.object,
    toggleAgency: React.PropTypes.func,
    agencyType: React.PropTypes.string,
    toptierAgency: React.PropTypes.object,
    subtierAgency: React.PropTypes.object,
    officeAgency: React.PropTypes.object,
    setAwardValues: React.PropTypes.func
};

export default class AwardInfoBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            awardingAgency: null,
            fundingAgency: null,
            recipient: null
        };
    }

    render() {
        let agencies = null;
        if (this.props.selectedAward) {
            agencies = (
                <div className="award-info-bar">
                    <AgencyInfo
                        {...this.props}
                        toggleAgency={this.props.toggleAgency}
                        agencySet={this.props.selectedAward[this.props.agencyType]}
                        toptierAgency={this.props.toptierAgency}
                        subtierAgency={this.props.subtierAgency}
                        officeAgency={this.props.officeAgency}
                        setAwardValues={this.props.setAwardValues} />
                    <RecipientInfo
                        recipient={this.props.selectedAward.recipient} />
                </div>
            );
        }
        return (
            <div>
                { agencies }
            </div>
        );
    }
}

AwardInfoBar.propTypes = propTypes;
