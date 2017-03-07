/**
  * AwardInfo.jsx
  * Created by Emily Gullo 01/20/2017
  **/

import React from 'react';

import { awardTypeGroups } from 'dataMapping/search/awardType';
import SummaryBar from './SummaryBar';
import AwardInfoBar from './AwardInfoBar';
import AwardContract from './AwardContract';
import AwardGrant from './AwardGrant';
import DetailsTableSection from './table/DetailsTableSection';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardInfo extends React.Component {

    render() {
        const isContract = _.includes(awardTypeGroups.contracts, this.props.selectedAward.award_type);
        let amountsDetailsSection = (
            <AwardContract
                {...this.props}
                selectedAward={this.props.selectedAward} />
        );
        if (!isContract) {
            amountsDetailsSection = (
                <AwardGrant
                    {...this.props}
                    selectedAward={this.props.selectedAward} />
            );
        }

        return (
            <div>
                <SummaryBar
                    {...this.props}
                    selectedAward={this.props.selectedAward} />
                <main id="main-content" className="main-content">
                    <AwardInfoBar
                        {...this.props}
                        selectedAward={this.props.selectedAward} />
                    {amountsDetailsSection}
                    <DetailsTableSection {...this.props} />
                </main>
            </div>
        );
    }
}
AwardInfo.propTypes = propTypes;

