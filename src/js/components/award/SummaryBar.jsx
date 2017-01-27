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
        let summaryTitle = null;
        let awardId = null;
        let parentAwardId = null;
        let status = null;
        let parentId = null;
        if (this.props.selectedAward) {
            const award = this.props.selectedAward;
            if (award.parent_award) {
                parentId = award.parent_award;
            }
            else if (!award.parent_award && award.type_description !== "Definitive Contract") {
                parentId = "Not Available";
            }
            else {
                parentId = null;
            }

            summaryTitle = (
                <h1 className="summary-title">{award.type_description} Summary</h1>);
            awardId = (
                <li>
                    <div className="format-item">
                        <div className="item-label">Award ID</div>
                        <div className="item-value">{award.id}</div>
                    </div>
                </li>);
            if (award.type_description === "Definitive Contract" && parentId === null) {
                parentAwardId = null;
            }
            else {
                parentAwardId = (
                    <li>
                        <div className="format-item">
                            <div className="item-label">Parent Award ID</div>
                            <div className="item-value">{parentId}</div>
                        </div>
                    </li>);
            }
            status = (
                <li>
                    <div className="format-item">
                        <div className="item-label">Status</div>
                        <div className="item-value">{this.props.awardStatus}</div>
                    </div>
                </li>);
        }
        return (
            <div className="usa-da-summary-bar">
                <div className="summary-bar-wrap">
                    { summaryTitle }
                    <div className="summary-status">
                        <ul className="summary-status-items">
                            { awardId }
                            { parentAwardId }
                            { status }
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
