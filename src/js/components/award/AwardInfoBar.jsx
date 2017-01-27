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
    agencyType: React.PropTypes.object,
    recipient: React.PropTypes.object
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
                        toggleAgency={this.props.toggleAgency}
                        agencyType={this.props.agencyType} />
                    <RecipientInfo
                        recipient={this.props.recipient} />
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
