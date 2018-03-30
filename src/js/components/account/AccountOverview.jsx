/**
 * AccountOverview.jsx
 * Created by 3/20/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import SankeyVisualization from './visualizations/sankey/SankeyVisualization';

const propTypes = {
    account: PropTypes.object
};

export default class AccountOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 300,
            fyAvailable: false,
            amounts: {
                budgetAuthority: 0,
                out: {
                    obligated: 0,
                    unobligated: 0
                },
                in: {
                    bbf: 0,
                    other: 0,
                    appropriations: 0
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
        const fy = FiscalYearHelper.defaultFiscalYear();
        const fiscalYearAvailable = account.totals.available;
        const summary = {
            flow: `No data is available for the current fiscal year (FY ${fy}).`,
            toDate: ''
        };
        let amounts = {};

        if (!fiscalYearAvailable) {
            amounts = {
                budgetAuthority: 0,
                out: {
                    obligated: 0,
                    unobligated: 0
                }
            };
            this.setState({
                summary,
                amounts,
                fyAvailable: fiscalYearAvailable
            });
            return;
        }

        const authorityValue = account.totals.budgetAuthority || 0;
        const obligatedValue = account.totals.obligated || 0;
        const balanceBroughtForwardValue = account.totals.balanceBroughtForward || 0;
        const otherValue = account.totals.otherBudgetaryResources || 0;
        const appropriationsValue = account.totals.appropriations || 0;

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

        const bbfUnits = MoneyFormatter.calculateUnitForSingleValue(balanceBroughtForwardValue);
        const bbfString = `${MoneyFormatter.formatMoney(balanceBroughtForwardValue / bbfUnits.unit)}\
${bbfUnits.unitLabel}`;

        const appropUnits = MoneyFormatter.calculateUnitForSingleValue(appropriationsValue);
        const appropString = `${MoneyFormatter.formatMoney(appropriationsValue / appropUnits.unit)}\
${appropUnits.unitLabel}`;

        const otherUnits = MoneyFormatter.calculateUnitForSingleValue(otherValue);
        const otherString = `${MoneyFormatter.formatMoney(otherValue / otherUnits.unit)}\
${otherUnits.unitLabel}`;

        summary.flow = `For this current fiscal year, this agency has been granted authority to spend \
${authority} out of this federal account. They carried over a balance of ${bbfString} from last \
year, were given ${appropString} in new appropriations, and have authority to use ${otherString} \
of other budgetary resources.`;
        summary.toDate = `To date, ${percentObligated}% (${amountObligated}) of the total \
${authority} has been obligated.`;

        amounts = {
            budgetAuthority: authorityValue,
            out: {
                obligated: obligatedValue,
                unobligated: parseFloat(account.totals.unobligated)
            },
            in: {
                bbf: balanceBroughtForwardValue,
                other: otherValue,
                appropriations: appropriationsValue
            }
        };

        this.setState({
            summary,
            amounts,
            fyAvailable: fiscalYearAvailable
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

                <h3>FY {FiscalYearHelper.defaultFiscalYear()} Snapshot</h3>
                <hr
                    className="results-divider"
                    ref={(div) => {
                        this.sankeyHr = div;
                    }} />
                <div className="sankey-wrapper">
                    <SankeyVisualization
                        fyAvailable={this.state.fyAvailable}
                        amounts={this.state.amounts}
                        width={this.state.visualizationWidth}
                        height={this.state.visualizationHeight + 40} />
                </div>
            </div>
        );
    }
}

AccountOverview.propTypes = propTypes;
