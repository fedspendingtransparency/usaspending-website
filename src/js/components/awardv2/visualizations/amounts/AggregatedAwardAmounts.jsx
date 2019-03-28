/**
 * AggregatedAwardAmounts.jsx
 * Created by David Trinh 2/8/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ChartError from 'components/search/visualizations/ChartError';
import { Table } from 'components/sharedComponents/icons/Icons';
import AwardsBanner from './AwardsBanner';
import AggregatedAwardAmountsInfo from './AggregatedAwardAmountsInfo';


const propTypes = {
    awardAmounts: PropTypes.object,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    jumpToSection: PropTypes.func
};

export default class AggregatedAwardAmounts extends React.Component {
    constructor(props) {
        super(props);

        this.jumpToReferencedAwardsTable = this.jumpToReferencedAwardsTable.bind(this);
    }
    jumpToReferencedAwardsTable() {
        this.props.jumpToSection('referenced-awards');
    }
    render() {
        let content = null;
        if (this.props.inFlight) {
            // API request is still pending
            content = (
                <div className="visualization-message-container">
                    <div className="visualization-loading">
                        <div className="message">
                            Gathering your data...
                        </div>
                    </div>
                </div>);
        }
        else if (this.props.error) {
            content = (<ChartError />);
        }
        else {
            // only mount the chart component if there is data to display
            const awardAmounts = this.props.awardAmounts;
            content = (
                <div className="award-amounts__content">
                    <AwardsBanner
                        jumpToReferencedAwardsTable={this.jumpToReferencedAwardsTable} />
                    <AggregatedAwardAmountsInfo awardAmounts={this.props.awardAmounts} />
                    <div className="award-amounts__data">
                        <span>Awards that Reference this IDV</span><span>{awardAmounts.idvCount + awardAmounts.contractCount}</span>
                    </div>
                    <button
                        onClick={this.jumpToReferencedAwardsTable}
                        className="award-viz__button">
                        <div className="award-viz__link-icon">
                            <Table />
                        </div>
                        <div className="award-viz__link-text">
                            View referencing awards table
                        </div>
                    </button>
                    <div className="award-amounts__data-wrapper">
                        <div className="award-amounts__data-content">
                            <div><span className="award-amounts__data-icon award-amounts__data-icon_blue" />Combined Obligated Amount</div>
                            <span>{awardAmounts.obligation}</span>
                        </div>
                        <div className="award-amounts__data-content">
                            <div><span className="award-amounts__data-icon award-amounts__data-icon_gray" />Combined Base &#38; Exercised Options</div>
                            <span>{awardAmounts.rolledBaseExercisedOptions}</span>
                        </div>
                        <div className="award-amounts__data-content">
                            <div><span className="award-amounts__data-icon award-amounts__data-icon_transparent" />Combined Base &#38; All Options</div>
                            <span>{awardAmounts.rolledBaseAllOptions}</span>
                        </div>
                    </div>
                </div>
            );
        }

        return content;
    }
}
AggregatedAwardAmounts.propTypes = propTypes;

