/**
 * ObligatedVisualization.jsx
 * Created by Lizzie Salita 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { capitalize, throttle } from 'lodash';

import AgencyObligatedGraph from './ObligatedGraph';

const propTypes = {
    activeFY: PropTypes.string,
    agencyName: PropTypes.string,
    obligatedAmount: PropTypes.number,
    budgetAuthority: PropTypes.number,
    outlay: PropTypes.number,
    asOfDate: PropTypes.string
};

export default class AgencyObligatedAmount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
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
        // Move props to variables for readability
        const obligatedAmount = this.props.obligatedAmount;
        const budgetAuthority = this.props.budgetAuthority;

        // Generate Budget Authority string
        const budgetAuthorityAmount = MoneyFormatter
            .calculateUnitForSingleValue(budgetAuthority);
        const formattedBudgetAuthority = `${MoneyFormatter
            .formatMoneyWithPrecision(budgetAuthority / budgetAuthorityAmount.unit, 1)}
        ${capitalize(budgetAuthorityAmount.longLabel)}`;

        // Generate Obligated Amount string
        const obligatedAmountValue = MoneyFormatter
            .calculateUnitForSingleValue(obligatedAmount);
        const formattedObligatedAmount = `${MoneyFormatter
            .formatMoneyWithPrecision(obligatedAmount / obligatedAmountValue.unit, 1)}
        ${capitalize(obligatedAmountValue.longLabel)}`;

        const legend = [
            {
                color: '#5C7480',
                label: 'Obligated Amount',
                offset: 0
            },
            {
                color: '#FBA302',
                label: 'Outlay Amount',
                offset: 130
            },
            {
                color: '#D6D7D9',
                label: 'Budgetary Resources',
                offset: 248
            }

        ];

        return (
            <div
                className="agency-section-wrapper"
                id="agency-obligated-amount">
                <div className="agency-callout-description">
                    <p>
                        Agencies spend their available budgetary resources by making binding
financial commitments called <strong>obligations</strong>. An agency incurs an obligation, for
example, when it places an order, signs a contract, awards a grant, purchases a service, or
takes other actions that require it to make a payment.
                    </p>
                </div>
                <div className="agency-section-wrapper">
                    <div className="agency-section-title">
                        <h4>Obligated Amount</h4>
                        <em>Data as of {this.props.asOfDate}</em>
                        <hr
                            className="results-divider"
                            ref={(hr) => {
                                this.sectionHr = hr;
                            }} />
                    </div>
                    <div className="agency-obligated-content">
                        <p className="fy-text">
                            In fiscal year {this.props.activeFY}, {this.props.agencyName} has obligated...
                        </p>
                        <p className="against-auth-text">
                            <span className="number number-bolder">{formattedObligatedAmount}</span> against its <span className="number">{formattedBudgetAuthority}</span> in Budgetary Resources
                        </p>
                        <AgencyObligatedGraph
                            obligatedAmount={this.props.obligatedAmount}
                            budgetAuthority={this.props.budgetAuthority}
                            outlay={this.props.outlay}
                            width={this.state.visualizationWidth}
                            obligatedText={formattedObligatedAmount}
                            legend={legend} />
                    </div>
                </div>
            </div>
        );
    }
}

AgencyObligatedAmount.propTypes = propTypes;
