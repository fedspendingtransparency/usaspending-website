/**
 * SummaryBar.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import moment from 'moment';
import * as Icons from '../sharedComponents/icons/Icons';
import InfoSnippet from './InfoSnippet';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class SummaryBar extends React.Component {
    constructor(props) {
        super(props);

        this.getStatus = this.getStatus.bind(this);
    }

    componentWillMount() {
        this.getStatus(this.props.selectedAward);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedAward !== this.props.selectedAward) {
            this.getStatus(nextProps.selectedAward);
        }
    }

    getStatus(award) {
        const awardStart = moment(award.period_of_performance_start_date, 'MM-DD-YYYY');
        const awardEnd = moment(award.period_of_performance_current_end_date, 'MM-DD-YYYY');
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
        let parentAwardId = null;
        let parentId = null;

        if (this.props.selectedAward) {
            const award = this.props.selectedAward;
            if (award.parent_award) {
                parentId = award.parent_award;
            }
            else if (!award.parent_award && award.type !== "D") {
                parentId = "Not Available";
            }
            else {
                parentId = null;
            }

            if (award.type === "D" && parentId === null) {
                parentAwardId = null;
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
                    <h1 className="summary-title">{this.props.selectedAward.type_description}
                        &nbsp;Summary</h1>
                    <div className="summary-status">
                        <ul className="summary-status-items">
                            <InfoSnippet
                                label="Award ID"
                                value={this.props.selectedAward.award_id} />
                            { parentAwardId }
                            <InfoSnippet
                                label="Status"
                                value={this.progress} />
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
