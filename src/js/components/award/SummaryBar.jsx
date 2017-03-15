/**
 * SummaryBar.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import * as Icons from '../sharedComponents/icons/Icons';
import InfoSnippet from './InfoSnippet';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class SummaryBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: ""
        };

        this.getStatus = this.getStatus.bind(this);
    }

    componentWillMount() {
        this.getStatus(this.props.selectedAward);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedAward.id !== this.props.selectedAward.id) {
            this.getStatus(nextProps.selectedAward);
        }
    }

    getStatus(award) {
        const awardStart = moment(award.period_of_performance_start_date, 'MM-DD-YYYY');
        const awardEnd = moment(award.period_of_performance_current_end_date, 'MM-DD-YYYY');
        const current = moment();
        let progress = "";
        let awardType = "";
        let parentId = null;

        if (current.isSameOrBefore(awardStart, 'day')) {
            progress = "Awarded";
        }
        else if (current.isSameOrAfter(awardEnd, 'day')) {
            progress = "Complete";
        }
        else {
            progress = "In Progress";
        }

        if (_.includes(awardTypeGroups.contracts, award.award_type)) {
            awardType = "Contract";
        }
        else if (_.includes(awardTypeGroups.grants, award.award_type)) {
            awardType = "Grant";
        }
        else if (_.includes(awardTypeGroups.direct_payments, award.award_type)) {
            awardType = "Direct Payment";
        }
        else if (_.includes(awardTypeGroups.loans, award.award_type)) {
            awardType = "Loan";
        }
        else if (_.includes(awardTypeGroups.insurance, award.award_type)) {
            awardType = "Insurance";
        }

        if (award.recipient_parent_duns) {
            parentId = award.recipient_parent_duns;
        }
        else if (!award.parent_award && award.type !== "D") {
            parentId = "Not Available";
        }
        else {
            parentId = null;
        }

        this.setState({
            status: progress,
            type: awardType,
            parent: parentId
        });
    }

    render() {
        let parentAwardId = null;
        if (this.props.selectedAward.type !== "D" && this.state.parent !== null) {
            parentAwardId = (
                <InfoSnippet
                    label="Parent Award ID"
                    value={this.state.parent} />);
        }
        return (
            <div className="usa-da-summary-bar">
                <div className="summary-bar-wrap">
                    <h1 className="summary-title">{this.state.type}
                        &nbsp;Summary</h1>
                    <div className="summary-status">
                        <ul className="summary-status-items">
                            <InfoSnippet
                                label="Award ID"
                                value={this.props.selectedAward.award_id} />
                            { parentAwardId }
                            <InfoSnippet
                                label="Status"
                                value={this.state.status} />
                        </ul>
                        <div className="more-options">
                            <Icons.MoreOptions />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
SummaryBar.propTypes = propTypes;
