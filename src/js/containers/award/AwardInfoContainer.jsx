/**
  * AwardInfoContainer.jsx
  * Created by Emily Gullo 01/20/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import SummaryBar from 'components/award/SummaryBar';
import AwardInfoBar from 'components/award/AwardInfoBar';

import * as awardActions from 'redux/actions/award/awardActions';

const propTypes = {
    getSelectedAward: React.PropTypes.func
};

class AwardInfoContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            agencyType: "awarding_agency",
            agencyTitle: "Awarding",
            toptier: { name: "Awarding Agency", value: null },
            subtier: { name: "Awarding Subtier Agency", value: null },
            office: { name: "Awarding Office", value: null },
            status: ""
        };

        this.toggleAgency = this.toggleAgency.bind(this);
        this.setAwardValues = this.setAwardValues.bind(this);
        this.getStatus = this.getStatus.bind(this);
    }

    componentWillMount() {
        this.props.getSelectedAward();
    }

    setAwardValues(type, obj) {
        if (obj.office_agency) {
            this.setState({
                office: { name: `${type} Office`, value: obj.office_agency.name }
            });
        }
        this.setState({
            toptier: { name: `${type} Agency`, value: obj.toptier_agency.name },
            subtier: { name: `${type} Subtier Agency`, value: obj.subtier_agency.name }
        });
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

        this.setState({
            status: progress
        });
    }

    toggleAgency(e) {
        this.setState({
            agencyType: `${e.target.value}_agency`,
            agencyTitle: _.startCase(e.target.value)
        });
    }

    render() {
        return (
            <div>
                <SummaryBar
                    {...this.props}
                    agencyType={this.state.agencyType}
                    getStatus={this.getStatus}
                    awardStatus={this.state.status} />
                <div className="wrapper">
                    <AwardInfoBar
                        {...this.props}
                        toggleAgency={this.toggleAgency}
                        agencyType={this.state.agencyType}
                        agencyTitle={this.state.agencyTitle}
                        toptierAgency={this.state.toptier}
                        subtierAgency={this.state.subtier}
                        officeAgency={this.state.office}
                        setAwardValues={this.setAwardValues} />
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
