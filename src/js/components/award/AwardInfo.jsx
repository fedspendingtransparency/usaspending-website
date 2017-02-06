/**
  * AwardInfoContainer.jsx
  * Created by Emily Gullo 01/20/2017
  **/

import React from 'react';

import SummaryBar from 'components/award/SummaryBar';
import AwardInfoBar from 'components/award/AwardInfoBar';
import AwardContract from './AwardContract';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardInfo extends React.Component {

    render() {
        return (
            <div>
                <SummaryBar
                    {...this.props}
                    selectedAward={this.props.selectedAward} />
                <div className="main-content">
                    <AwardInfoBar
                        {...this.props}
                        selectedAward={this.props.selectedAward} />
                    <AwardContract
                        {...this.props}
                        selectedAward={this.props.selectedAward} />
                </div>
            </div>
        );
    }
}
AwardInfo.propTypes = propTypes;

