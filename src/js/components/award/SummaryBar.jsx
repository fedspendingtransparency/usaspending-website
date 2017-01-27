/**
 * SummaryBar.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import * as Icons from '../sharedComponents/icons/Icons';

const propTypes = {
    selectedAward: React.PropTypes.object,
    getStatus: React.PropTypes.func,
    awardStatus: React.PropTypes.string
};

export default class SummaryBar extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (this.props.awardStatus === "" || this.props.awardStatus !== nextProps.awardStatus) {
            if (this.props.selectedAward) {
                this.props.getStatus(this.props.selectedAward);
            }
        }
    }

    render() {
        let summaryBar = null;
        if (this.props.selectedAward) {
            const award = this.props.selectedAward;
            summaryBar = (
                <div className="summary-bar-wrap">
                    <h1 className="summary-title">{award.type_description} Summary</h1>
                    <div className="summary-status">
                        <ul className="summary-status-items">
                            <li>
                                <div className="format-item">
                                    <div className="item-label">Award ID</div>
                                    <div className="item-value">{award.id}</div>
                                </div>
                            </li>
                            <li>
                                <div className="format-item">
                                    <div className="item-label">Parent Award ID</div>
                                    <div className="item-value">Not Available</div>
                                </div>
                            </li>
                            <li>
                                <div className="format-item">
                                    <div className="item-label">Status</div>
                                    <div className="item-value">{this.props.awardStatus}</div>
                                </div>
                            </li>
                            <li>
                                <div className="format-item">
                                    <Icons.MoreOptions />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
        return (
            <div className="usa-da-summary-bar">
                { summaryBar }
            </div>
        );
    }
}
SummaryBar.propTypes = propTypes;
