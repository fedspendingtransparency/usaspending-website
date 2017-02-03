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
    agencyType: React.PropTypes.string
};

export default class AwardInfoBar extends React.Component {

    render() {
        let agencies = null;
        if (this.props.selectedAward) {
            agencies = (
                <div className="award-info-bar">
                    <AgencyInfo
                        {...this.props}
                        toggleAgency={this.props.toggleAgency}
                        agencyType={this.props.agencyType}
                        selectedAward={this.props.selectedAward} />
                    <RecipientInfo
                        recipient={this.props.selectedAward} />
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
