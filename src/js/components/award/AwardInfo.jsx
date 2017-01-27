/**
 * AwardInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import AwardInfoBar from './AwardInfoBar';

const propTypes = {
    selectedAward: React.PropTypes.object,
    toggleAgency: React.PropTypes.func,
    agencyType: React.PropTypes.string
};

export default class AwardInfo extends React.Component {

    render() {
        let awardInfoBar = null;
        if (this.props.selectedAward) {
            awardInfoBar = (
                <div className="award-info-content">
                    <AwardInfoBar
                        {...this.props}
                        selectedAward={this.props.selectedAward}
                        toggleAgency={this.props.toggleAgency}
                        agencyType={this.props.selectedAward[this.props.agencyType]}
                        recipient={this.props.selectedAward.recipient} />
                </div>
            );
        }
        return (
            <div>
                { awardInfoBar }
            </div>
        );
    }
}
AwardInfo.propTypes = propTypes;
