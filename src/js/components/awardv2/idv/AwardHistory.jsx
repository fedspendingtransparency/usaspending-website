/**
  * AwardInfo.jsx
  * Created by David Trinh 12/10/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';

import { AwardLoop } from 'components/sharedComponents/icons/Icons';
import TablesSection from './TablesSection';
import InfoTooltip from './InfoTooltip';
import { awardHistoryInfo } from './InfoTooltipContent';

const propTypes = {
    overview: PropTypes.object,
    setActiveTab: PropTypes.func,
    activeTab: PropTypes.string
};

export default class AwardHistory extends React.Component {
    render() {
        return (
            <div id="award-award-history" className="award-viz award-history">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <AwardLoop alt="Award History" />
                    </div>
                    <h3 className="award-viz__title">
                        Award History for this IDV
                    </h3>
                    <InfoTooltip left>
                        {awardHistoryInfo}
                    </InfoTooltip>
                </div>
                <hr />
                <TablesSection
                    overview={this.props.overview}
                    clickTab={this.props.setActiveTab}
                    activeTab={this.props.activeTab} />
            </div>
        );
    }
}
AwardHistory.propTypes = propTypes;
