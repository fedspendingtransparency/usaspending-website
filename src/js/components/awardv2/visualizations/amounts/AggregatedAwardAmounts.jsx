/**
 * AggregatedAwardAmounts.jsx
 * Created by David Trinh 2/8/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { determineSpendingScenario } from 'helpers/aggregatedAmountsHelper';
import ChartError from 'components/search/visualizations/ChartError';
import { Table } from 'components/sharedComponents/icons/Icons';
import AwardsBanner from './AwardsBanner';
import NormalChart from './charts/NormalChart';
import ExceedsCurrentChart from './charts/ExceedsCurrentChart';


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

    generateVisualization() {
        const awardAmounts = this.props.awardAmounts;
        const visualizationType = determineSpendingScenario(awardAmounts);
        let visualization;
        let overspendingRow = null;
        switch (visualizationType) {
            case ('normal'):
                visualization = (<NormalChart awardAmounts={awardAmounts} />);
                break;
            case ('exceedsCurrent'):
                visualization = (<ExceedsCurrentChart awardAmounts={awardAmounts} />);
                overspendingRow = (
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_overspending" />Exceeds Combined Current Award Amounts</div>
                        <span>{awardAmounts.overspending}</span>
                    </div>
                );
                break;
            default:
                visualization = (
                    <div className="award-amounts-viz award-amounts-viz_insufficient">
                        <h4>Chart Not Available</h4>
                        <p>Data in this instance is not suitable for charting.</p>
                    </div>
                );
        }

        return (
            <div className="award-amounts__content">
                <AwardsBanner
                    jumpToReferencedAwardsTable={this.jumpToReferencedAwardsTable} />
                {visualization}
                <div className="award-amounts__data">
                    <span>Awards Under this IDV</span><span>{awardAmounts.idvCount + awardAmounts.contractCount}</span>
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
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_blue" />Combined Obligated Amounts</div>
                        <span>{awardAmounts.obligation}</span>
                    </div>
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_gray" />Combined Current Award Amounts</div>
                        <span>{awardAmounts.combinedCurrentAwardAmounts}</span>
                    </div>
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_transparent" />Combined Potential Award Amounts</div>
                        <span>{awardAmounts.combinedPotentialAwardAmounts}</span>
                    </div>
                    {overspendingRow}
                </div>
            </div>
        );
    }

    render() {
        if (this.props.inFlight) {
            // API request is still pending
            return (
                <div className="visualization-message-container">
                    <div className="visualization-loading">
                        <div className="message">
                            Gathering your data...
                        </div>
                    </div>
                </div>);
        }
        else if (this.props.error) {
            return (<ChartError />);
        }
        return this.generateVisualization();
    }
}
AggregatedAwardAmounts.propTypes = propTypes;

