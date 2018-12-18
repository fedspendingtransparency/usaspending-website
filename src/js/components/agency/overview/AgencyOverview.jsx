/**
 * AgencyOverview.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { capitalize, throttle } from 'lodash';
import { convertQuarterToDate } from 'helpers/fiscalYearHelper';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import { Glossary } from 'components/sharedComponents/icons/Icons';

import HorizontalBarItem from '../visualizations/obligated/HorizontalBarItem';

const propTypes = {
    agency: PropTypes.object
};

export default class AgencyOverview extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hideLogo: true,
            logo: '',
            mission: '',
            website: '',
            asOfDate: '',
            formattedBudgetAuthority: '',
            percentageElement: '',
            visualizationWidth: 0,
            obligatedWidth: 0,
            remainingWidth: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
        this.prepareOverview(this.props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.agency.id !== this.props.agency.id) {
            this.prepareOverview(this.props);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    prepareOverview(props) {
        let logo = null;
        let hideLogo = 'hide';
        if (props.agency.logo !== '') {
            hideLogo = '';
            logo = (<img
                src={`graphics/agency/${props.agency.logo}`}
                alt={props.agency.name} />);
        }

        let mission = 'Not available';
        if (props.agency.mission !== '') {
            mission = props.agency.mission;
        }

        let website = 'Not available';
        if (props.agency.website !== '') {
            website = (
                <a
                    className="agency-website"
                    href={props.agency.website}
                    target="_blank"
                    rel="noopener noreferrer">
                    {props.agency.website}
                </a>
            );
        }

        // Move props to variables for readability
        const budgetAuthority = props.agency.budgetAuthority;

        const federalBudget = props.agency.federalBudget;

        const fy = parseInt(props.agency.activeFY, 10);
        const quarter = parseInt(props.agency.activeFQ, 10);

        // Generate "as of" date
        const endOfQuarter = convertQuarterToDate(quarter, fy);
        const asOfDate = moment(endOfQuarter, "YYYY-MM-DD").format("MMMM D, YYYY");

        // Generate Budget Authority string
        const budgetAuthorityAmount = MoneyFormatter
            .calculateUnitForSingleValue(budgetAuthority);
        const formattedBudgetAuthority = `${MoneyFormatter
            .formatMoneyWithPrecision(budgetAuthority / budgetAuthorityAmount.unit, 1)}
        ${capitalize(budgetAuthorityAmount.longLabel)}`;

        // Generate Percentage string
        const percentage = MoneyFormatter.calculateTreemapPercentage(
            budgetAuthority, federalBudget);
        const percentageElement = (
            <span className="authority-statement-percentage">{percentage}</span>
        );

        // Generate initial visualization size
        let visualizationWidth = 0;
        if (this.containerDiv) {
            visualizationWidth = this.containerDiv.getBoundingClientRect().width;
        }

        this.setState({
            hideLogo,
            logo,
            mission,
            website,
            asOfDate,
            formattedBudgetAuthority,
            percentageElement,
            visualizationWidth
        }, () => {
            this.updateVisualizationState(props, visualizationWidth);
        });
    }

    updateVisualizationState(props, visualizationWidth) {
        // Generate visualization parameters
        let obligatedWidth = 0;

        // Only check the percentage width if the data is available
        if (props.agency.budgetAuthority !== 0 && props.agency.federalBudget !== 0) {
            const percentageNumber = props.agency.budgetAuthority / props.agency.federalBudget;
            obligatedWidth = visualizationWidth * percentageNumber;
        }

        // Account for 10 pixels of left padding
        const padding = 10;
        const remainingWidth = visualizationWidth - obligatedWidth - padding;

        this.setState({
            visualizationWidth,
            obligatedWidth,
            remainingWidth
        });
    }

    handleWindowResize() {
        // determine if the width changed
        const visualizationWidth = this.containerDiv.getBoundingClientRect().width;
        if (this.state.visualizationWidth !== visualizationWidth) {
            // width changed, update the visualization width
            this.updateVisualizationState(this.props, visualizationWidth);
        }
    }

    render() {
        return (
            <div
                className="agency-overview"
                id="agency-overview">
                <div className="title-wrapper">
                    <div className={`logo ${this.state.hideLogo}`}>
                        {this.state.logo}
                    </div>
                    <div className="title">
                        <h3>{this.props.agency.name}</h3>
                    </div>
                </div>
                <hr className="results-divider" />
                <div className="overview-content">
                    <div className="agency-details">
                        <h4>Agency Mission</h4>
                        <p>{this.state.mission}</p>

                        <div className="lower-details">
                            <div className="group">
                                <h5>Website</h5>
                                <div className="agency-website">
                                    {this.state.website}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div
                        className="budget-authority"
                        ref={(div) => {
                            this.containerDiv = div;
                        }}>
                        <h4>
                            Budgetary Resources
                            <a href={`#/agency/${this.props.agency.id}?glossary=budgetary-resources`}>
                                <Glossary />
                            </a>
                            for FY {this.props.agency.activeFY}
                        </h4>
                        <div className="budget-authority-date">
                            <em>
                                FY {this.props.agency.activeFY} data reported
                                through {this.state.asOfDate}
                            </em>
                        </div>
                        <div className="authority-amount">
                            {this.state.formattedBudgetAuthority}
                        </div>
                        <div className="authority-statement">
                            This is {this.state.percentageElement} of the total U.S.
                            federal budgetary resources for FY {this.props.agency.activeFY}.
                        </div>
                        <svg className="horizontal-bar">
                            <g>
                                <HorizontalBarItem
                                    description="Budgetary Resources"
                                    x={0}
                                    y={0}
                                    width={this.state.obligatedWidth}
                                    color="#597785" />
                                <HorizontalBarItem
                                    description="Remaining United States federal budget"
                                    x={this.state.obligatedWidth}
                                    y={0}
                                    width={this.state.remainingWidth}
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
