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
        const fy = FiscalYearHelper.currentFiscalYear();
        let fiscalYearAvailable = true;
        let authorityValue = 0;
        let obligatedValue = 0;
        let bbfValue = 0;
        let otherValue = 0;
        let appropriationsValue = 0;

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

        if (fiscalYearAvailable) {
            const firstBBF = parseFloat(account.totals.balanceBroughtForward1[fy]);
            const secondBBF = parseFloat(account.totals.balanceBroughtForward2[fy]);
            bbfValue = firstBBF + secondBBF;
            otherValue = parseFloat(account.totals.otherBudgetaryResources[fy]);
            appropriationsValue = parseFloat(account.totals.appropriations[fy]);
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

        const bbfUnits = MoneyFormatter.calculateUnitForSingleValue(bbfValue);
        const bbfString = `${MoneyFormatter.formatMoney(bbfValue / bbfUnits.unit)}\
${bbfUnits.unitLabel}`;

        const appropUnits = MoneyFormatter.calculateUnitForSingleValue(appropriationsValue);
        const appropString = `${MoneyFormatter.formatMoney(appropriationsValue / appropUnits.unit)}\
${appropUnits.unitLabel}`;

        const otherUnits = MoneyFormatter.calculateUnitForSingleValue(otherValue);
        const otherString = `${MoneyFormatter.formatMoney(otherValue / otherUnits.unit)}\
${otherUnits.unitLabel}`;

        const summary = {
            flow: `For this current fiscal year, this agency has been granted authority to spend \
${authority} out of this federal account. They carried over a balance of ${bbfString} from last \
year, were given ${appropString} in new appropriations, and have authority to use ${otherString} \
of other budgetary resources.`,
            toDate: `To date, ${percentObligated}% (${amountObligated}) of the total \
${authority} has been obligated.`
        };

        let amounts = {
            budgetAuthority: authorityValue,
            out: {
                obligated: obligatedValue,
                unobligated: parseFloat(account.totals.unobligated[fy])
            },
            in: {
                bbf: bbfValue,
                other: otherValue,
                appropriations: appropriationsValue
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

                <h3>Fiscal Year Snapshot</h3>
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
