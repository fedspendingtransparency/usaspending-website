/**
  * AwardInfoContainer.jsx
  * Created by Emily Gullo 01/20/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import SummaryBar from 'components/award/SummaryBar';
import AwardInfoBar from 'components/award/AwardInfoBar';

import * as awardActions from 'redux/actions/award/awardActions';

const propTypes = {
    selectedAward: React.PropTypes.object
};

class AwardInfoContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            agencyType: "awarding"
        };

        this.toggleAgency = this.toggleAgency.bind(this);
        this.getStatus = this.getStatus.bind(this);
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

    toggleAgency(e) {
        this.setState({
            agencyType: e.target.value
        });
    }

    render() {
        return (
            <div>
                <SummaryBar
                    {...this.props}
                    agencyType={this.state.agencyType}
                    getStatus={this.getStatus}
                    awardStatus={this.state.status}
                    progress={this.progress} />
                <div className="wrapper">
                    <AwardInfoBar
                        {...this.props}
                        toggleAgency={this.toggleAgency}
                        agencyType={this.state.agencyType}
                        selectedAward={this.props.selectedAward} />
                </div>
            </div>
        );
    }
}
AwardInfoContainer.propTypes = propTypes;

export default connect(
    (state) => ({ selectedAward: state.award.selectedAward }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardInfoContainer);
