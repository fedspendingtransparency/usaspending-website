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
        if (current.isSameOrBefore(awardStart, 'day')) {
            progress = "Awarded";
        }
        else if (current.isSameOrAfter(awardEnd, 'day')) {
            progress = "Complete";
        }
        else {
            progress = "In Progress";
        }
        this.setState({
            status: progress
        });
    }

    render() {
        let parentAwardId = null;
        let parentId = null;
        let awardType = "";

        if (this.props.selectedAward) {
            const award = this.props.selectedAward;

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

            if (award.parent_award) {
                parentId = award.parent_award;
            }
            else if (!award.parent_award && award.award_type !== "D") {
                parentId = "Not Available";
            }
            else {
                parentId = null;
            }

            if (award.award_type === "D" && parentId === null) {
                parentAwardId = null;
            }
            else if (awardType === 'Grant') {
                parentAwardId = '';
            }
            else {
                parentAwardId = (
                    <InfoSnippet
                        label="Parent Award ID"
                        value={parentId} />);
            }
        }
        return (
            <div className="usa-da-summary-bar">
                <div className="summary-bar-wrap">
                    <h1 className="summary-title">{awardType}
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
                            <li>
                                <div className="format-item">
                                    <Icons.MoreOptions />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
SummaryBar.propTypes = propTypes;
