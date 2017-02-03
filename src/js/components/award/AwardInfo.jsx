/**
  * AwardInfoContainer.jsx
  * Created by Emily Gullo 01/20/2017
  **/

import React from 'react';
import moment from 'moment';

import SummaryBar from 'components/award/SummaryBar';
import AwardInfoBar from 'components/award/AwardInfoBar';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardInfo extends React.Component {

    constructor(props) {
        super(props);

        this.getStatus = this.getStatus.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedAward !== this.props.selectedAward) {
            this.getStatus(nextProps.selectedAward);
        }
    }

    getStatus(award) {
        const awardStart = moment(award.period_of_performance_start_date, 'YYYY-MM-DD');
        const awardEnd = moment(award.period_of_performance_current_end_date, 'YYYY-MM-DD');
        const current = moment();
        let progress = "";
        if (current.isBefore(awardStart)) {
            progress = "Awarded";
        }
        else if (current.isAfter(awardEnd)) {
            progress = "Complete";
        }
        else {
            progress = "In Progress";
        }
        this.progress = progress;
    }

    render() {
        return (
            <div>
                <SummaryBar
                    {...this.props}
                    awardStatus={this.progress}
                    selectedAward={this.props.selectedAward} />
                <div className="wrapper">
                    <AwardInfoBar
                        {...this.props}
                        selectedAward={this.props.selectedAward} />
                </div>
            </div>
        );
    }
}
AwardInfo.propTypes = propTypes;

