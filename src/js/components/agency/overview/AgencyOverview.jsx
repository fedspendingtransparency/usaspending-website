/**
 * AgencyOverview.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import moment from 'moment';
import { capitalize } from 'lodash';
import { convertQuarterToDate } from 'helpers/fiscalYearHelper';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import HorizontalBarItem from '../visualizations/obligated/HorizontalBarItem';

const propTypes = {
    agency: React.PropTypes.object
};

export default class AgencyOverview extends React.Component {
    render() {
        let title = `${this.props.agency.name} (${this.props.agency.abbreviation})`;
        if (this.props.agency.abbreviation === '') {
            title = this.props.agency.name;
        }

        let logo = null;
        let hideLogo = 'hide';
        if (this.props.agency.logo !== '') {
            hideLogo = '';
            logo = (<img src={this.props.agency.logo} alt={this.props.agency.name} />);
        }

        // Move props to variables for readability
        const budgetAuthority = this.props.agency.budgetAuthority;
        const federalBudget = this.props.agency.federalBudget;
        const fy = parseInt(this.props.agency.activeFY, 10);
        const quarter = parseInt(this.props.agency.activeFQ, 10);

        // Generate "as of" date
        const endOfQuarter = convertQuarterToDate(quarter, fy);
        const asOfDate = moment(endOfQuarter, "YYYY-MM-DD").format("MMMM D, YYYY");

        // Generate Budget Authority string
        const budgetAuthorityAmount = MoneyFormatter.calculateUnitForSingleValue(budgetAuthority);
        const formattedBudgetAuthority = `${MoneyFormatter.formatMoneyWithPrecision(
            budgetAuthority / budgetAuthorityAmount.unit, 1)}
            ${capitalize(budgetAuthorityAmount.longLabel)}`;

        // Generate Percentage string
        const percentage = MoneyFormatter.calculateTreemapPercentage(
            budgetAuthority, federalBudget);
        const percentageElement = (
            <span className="authority-statement-percentage">{percentage}</span>
        );

        // Generate visualization parameters
        let visualizationWidth = 0;
        if (this.containerDiv) {
            visualizationWidth = this.containerDiv.getBoundingClientRect().width;
        }
        let obligatedWidth = 0;

        // Only check the percentage width if the data is available
        if (budgetAuthority !== 0 && federalBudget !== 0) {
            const percentageNumber = budgetAuthority / federalBudget;
            obligatedWidth = visualizationWidth * percentageNumber;
        }

        const remainingWidth = visualizationWidth - obligatedWidth;

        return (
            <div
                className="agency-overview"
                id="agency-overview">
                <div className="title-wrapper">
                    <div className={`logo ${hideLogo}`}>
                        {logo}
                    </div>
                    <div className="title">
                        <h3>{title}</h3>
                    </div>
                </div>
                <hr className="results-divider" />
                <div className="overview-content">
                    <div className="agency-details">
                        <h4>Agency Mission</h4>
                        <p>Not available</p>

                        <div className="lower-details">

                            <div className="group">
                                <h5>Agency Head</h5>
                                <p>Not available</p>
                            </div>

                            <div className="group">
                                <h5>Website</h5>
                                <p>Not available</p>
                            </div>

                        </div>
                    </div>
                    <div
                        className="budget-authority"
                        ref={(div) => {
                            this.containerDiv = div;
                        }}>
                        <h4>Budgetary Resources for FY {this.props.agency.activeFY}</h4>
                        <div className="budget-authority-date">
                            <em>Data as of {asOfDate}</em>
                        </div>
                        <div className="authority-amount">
                            {formattedBudgetAuthority}
                        </div>
                        <div className="authority-statement">
                            This is {percentageElement} of the total U.S. federal budgetary
                            resources for FY {this.props.agency.activeFY}.
                        </div>
                        <svg className="horizontal-bar">
                            <g>
                                <HorizontalBarItem
                                    description="Budget Authority"
                                    x={0}
                                    y={0}
                                    width={obligatedWidth}
                                    color="#597785" />
                                <HorizontalBarItem
                                    description="Remaining United States federal budget"
                                    x={obligatedWidth}
                                    y={0}
                                    width={remainingWidth}
                                    color="#D8D8D8" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

AgencyOverview.propTypes = propTypes;
