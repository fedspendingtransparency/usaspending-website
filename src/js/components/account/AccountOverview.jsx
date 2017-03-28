/**
 * AccountOverview.jsx
 * Created by 3/20/17
 */

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import SankeyVisualization from './visualizations/sankey/SankeyVisualization';

const propTypes = {
    account: React.PropTypes.object
};

export default class AccountOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 300,
            amounts: {
                budgetAuthority: 0,
                out: {
                    obligated: 0,
                    unobligated: 0
                }
            },
            summary: {
                flow: '',
                toDate: ''
            }
        };

        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    componentDidMount() {
        this.generateSummary(this.props.account);
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.account.id !== this.props.account.id) {
            this.generateSummary(nextProps.account);
        }
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
                visualizationWidth: Math.min(1200, this.sankeyHr.offsetWidth)
            });
        }
    }

    generateSummary(account) {
        // determine the current fiscal year and get the associated values
        const fy = FiscalYearHelper.currentFiscalYear();
        let fiscalYearAvailable = true;
        let authorityValue = 0;
        let obligatedValue = 0;
        if ({}.hasOwnProperty.call(account.totals.budgetAuthority, fy)) {
            authorityValue = account.totals.budgetAuthority[fy];
        }
        else {
            fiscalYearAvailable = false;
        }

        if ({}.hasOwnProperty.call(account.totals.obligated, fy)) {
            obligatedValue = account.totals.obligated[fy];
        }
        else {
            fiscalYearAvailable = false;
        }

        const authUnits = MoneyFormatter.calculateUnitForSingleValue(authorityValue);
        const authority = `${MoneyFormatter.formatMoney(authorityValue / authUnits.unit)}\
${authUnits.unitLabel}`;

        const obUnits = MoneyFormatter.calculateUnitForSingleValue(obligatedValue);

        let percentObligated = 'N/A';
        if (authorityValue !== 0) {
            percentObligated = Math.round((obligatedValue / authorityValue) * 1000) / 10;
        }
        const amountObligated = `${MoneyFormatter.formatMoney(obligatedValue / obUnits.unit)}\
${obUnits.unitLabel}`;

        const summary = {
            flow: `For this current fiscal year, this agency has been granted authority to spend \
${authority} out of this federal account.`,
            toDate: `To date, ${percentObligated}% (${amountObligated}) of the total \
${authority} has been obligated.`
        };

        let amounts = {
            budgetAuthority: authorityValue,
            out: {
                obligated: obligatedValue,
                unobligated: parseFloat(account.totals.unobligated[fy])
            }
        };

        if (!fiscalYearAvailable) {
            summary.flow = `No data is available for the current fiscal year (FY ${fy}).`;
            summary.toDate = '';

            amounts = {
                budgetAuthority: 0,
                out: {
                    obligated: 0,
                    unobligated: 0
                }
            };
        }

        this.setState({
            summary,
            amounts
        });
    }

    render() {
        return (
            <div className="account-overview">
                <h3>{this.props.account.title}</h3>
                <hr className="results-divider" />

                <div className="overview-content">
                    <div className="overview-section">
                        <h4>Account Description</h4>
                        <div className="section-content">
                            {this.props.account.description}
                        </div>
                    </div>

                    <div className="overview-section">
                        <h4>Fiscal Year Summary</h4>
                        <div className="section-content">
                            {this.state.summary.flow}
                            <br /><br />
                            {this.state.summary.toDate}
                        </div>
                    </div>
                </div>

                <h3>Fiscal Year Snapshot</h3>
                <hr
                    className="results-divider"
                    ref={(div) => {
                        this.sankeyHr = div;
                    }} />
                <div className="sankey-wrapper">
                    <SankeyVisualization
                        amounts={this.state.amounts}
                        width={this.state.visualizationWidth}
                        height={this.state.visualizationHeight + 40} />
                </div>
            </div>
        );
    }
}

AccountOverview.propTypes = propTypes;
