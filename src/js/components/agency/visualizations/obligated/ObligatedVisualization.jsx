/**
 * ObligatedVisualization.jsx
 * Created by Lizzie Salita 6/8/17
 */

import React from 'react';
import moment from 'moment';
import { convertQuarterToDate } from 'helpers/fiscalYearHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import _ from 'lodash';

import AgencyObligatedGraph from './ObligatedGraph';

const propTypes = {
    activeFY: React.PropTypes.string,
    reportingFiscalQuarter: React.PropTypes.number,
    agencyName: React.PropTypes.string,
    obligatedAmount: React.PropTypes.number,
    budgetAuthority: React.PropTypes.number
};

export default class AgencyObligatedAmount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            this.setState({
                windowWidth,
                visualizationWidth: this.sectionHr.offsetWidth
            });
        }
    }

    render() {
        const obligatedValue = this.props.obligatedAmount;
        const authorityValue = this.props.budgetAuthority;

        const authUnits = MoneyFormatter.calculateUnitForSingleValue(authorityValue);
        const authority = `${MoneyFormatter.formatMoney(authorityValue / authUnits.unit)}
        ${authUnits.longLabel}`;

        const obUnits = MoneyFormatter.calculateUnitForSingleValue(obligatedValue);

        const amountObligated = `${MoneyFormatter.formatMoney(obligatedValue / obUnits.unit)}
        ${obUnits.longLabel}`;

        const endOfQuarter = convertQuarterToDate(this.props.reportingFiscalQuarter, this.props.activeFY);
        const asOfDate = moment(endOfQuarter, "YYYY-MM-DD").format("MMMM D, YYYY");

        const legend = [
            {
                color: '#5C7480',
                label: 'Obligations',
                offset: 0
            },
            {
                color: '#D6D7D9',
                label: 'Budget Authority',
                offset: 100
            },
            {
                color: '#ffffff',
                label: `*as of ${asOfDate}`,
                offset: this.state.visualizationWidth - 150
            }
        ];

        return (
            <div
                className="agency-section-wrapper"
                id="agency-obligated-amount">
                <div className="agency-callout-description">
                    <p>
                        Agencies spend their available budget authority by making binding&nbsp;
financial commitments called <strong>obligations</strong>. An agency incurs an obligation, for&nbpsp;
example, when it places an order, signs a contract, awards a grant, purchases a service, or&nbsp;
takes other actions that require it to make a payment.
                    </p>
                </div>
                <div className="agency-obligated-wrapper">
                    <div className="agency-obligated-title">
                        <h4 >Obligated Amount</h4>
                        <hr
                            className="results-divider"
                            ref={(hr) => {
                                this.sectionHr = hr;
                            }} />
                    </div>
                    <div className="agency-obligated-content">
                        <p className="fy-text">
                            In fiscal year {this.props.activeFY}*, {this.props.agencyName} has obligated
                        </p>
                        <p className="against-auth-text">
                            <span className="number number-bolder">{amountObligated}</span> against its <span className="number">{authority}</span> in Budget Authority
                        </p>
                        <AgencyObligatedGraph
                            activeFY={this.props.activeFY}
                            reportingFiscalQuarter={this.props.reportingFiscalQuarter}
                            obligatedAmount={this.props.obligatedAmount}
                            budgetAuthority={this.props.budgetAuthority}
                            width={this.state.visualizationWidth}
                            obligatedText={amountObligated}
                            legend={legend} />
                    </div>
                </div>
            </div>
        );
    }
}

AgencyObligatedAmount.propTypes = propTypes;
