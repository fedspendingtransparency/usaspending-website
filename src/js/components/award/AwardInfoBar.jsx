/**
 * AwardInfoBar.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import AgencyInfo from './AgencyInfo';
import RecipientInfo from './RecipientInfo';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardInfoBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAward: null,
            awardingAgency: null,
            fundingAgency: null,
            recipient: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedAward: nextProps.selectedAward,
            awardingAgency: nextProps.selectedAward.awarding_agency,
            fundingAgency: nextProps.selectedAward.funding_agency,
            recipient: nextProps.selectedAward.recipient
        });
    }

    render() {
        let agencies = null;
        if (this.props.selectedAward) {
            agencies = (
                <div className="award-info-bar">
                    <AgencyInfo
                        awardingAgency={this.state.awardingAgency}
                        fundingAgency={this.state.fundingAgency} />
                    <RecipientInfo />
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
