/**
 * AccountOverview.jsx
 * Created by 3/20/17
 */

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

const propTypes = {
    account: React.PropTypes.object
};

export default class AccountOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            summary: {
                flow: '',
                toDate: ''
            }
        };
    }

    componentDidMount() {
        this.generateSummary(this.props.account);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.account.id !== this.props.account.id) {
            this.generateSummary(nextProps.account);
        }
    }

    generateSummary(account) {
        const summary = {
            flow: 'Not available',
            toDate: ''
        };
        // determine the current fiscal year and get the associated values
//         const fy = FiscalYearHelper.currentFiscalYear();
//         let authorityValue = 0;
//         let obligatedValue = 0;
//         if ({}.hasOwnProperty.call(account.totals.budget_authority, fy)) {
//             authorityValue = account.totals.budget_authority[fy];
//         }

//         if ({}.hasOwnProperty.call(account.totals.obligations, fy)) {
//             obligatedValue = account.totals.obligations[fy];
//         }

//         const authUnits = MoneyFormatter.calculateUnitForSingleValue(authorityValue);
//         const authority = `${MoneyFormatter.formatMoney(authorityValue / authUnits.unit)}\
// ${authUnits.unitLabel}`;

//         const obUnits = MoneyFormatter.calculateUnitForSingleValue(obligatedValue);

//         let percentObligated = 'N/A';
//         if (authorityValue !== 0) {
//             percentObligated = Math.round((obligatedValue / authorityValue) * 1000) / 10;
//         }
//         const amountObligated = `${MoneyFormatter.formatMoney(obligatedValue / obUnits.unit)}\
// ${obUnits.unitLabel}`;

//         const summary = {
//             flow: `For this current fiscal year, this agency has been granted authority to spend \
// ${authority} out of this federal account.`,
//             toDate: `To date, ${percentObligated}% (${amountObligated}) of the total \
// ${authority} has been obligated.`
//         };

        this.setState({
            summary
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
                <hr className="results-divider" />
                <div className="sankey-placeholder">
                    Coming Soon
                </div>
            </div>
        );
    }
}

AccountOverview.propTypes = propTypes;
