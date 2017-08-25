/**
 * RecipientOverview.jsx
 * Created by Lizzie Salita 8/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import Accounting from 'accounting';

import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    recipient: PropTypes.object
};

export default class RecipientOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            duns: '',
            parentCompany: '',
            parentDuns: '',
            address2: '',
            formattedNaics: '',
            formattedAwarded: '',
            formattedHistoricalAwarded: '',
            formattedActiveAwards: '',
            formattedHistoricalAwards: ''
        };
    }

    componentDidMount() {
        this.prepareOverview(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recipient.id !== this.props.recipient.id) {
            this.prepareOverview(nextProps);
        }
    }

    prepareOverview(props) {
        let duns = 'Not available';
        if (props.recipient.duns !== '') {
            duns = props.recipient.duns;
        }

        let parentCompany = 'Not available';
        if (props.recipient.parentCompany !== '') {
            parentCompany = props.recipient.parentCompany;
        }

        let parentDuns = 'Not available';
        if (props.recipient.parentDuns !== '') {
            parentDuns = props.recipient.parentDuns;
        }

        // Generate NAICS string
        let formattedNaics = 'Not available';
        if (props.recipient.primaryNaics) {
            formattedNaics = `${props.recipient.primaryNaics} - ${props.recipient.naicsDescription}`;
        }

        // Generate Address Line 2
        const address2 = `${props.recipient.city}, ${props.recipient.state} ${props.recipient.zip}`;

        // Move props to variables for readability
        const awarded = props.recipient.awardedAmount;
        const historicalAwarded = props.recipient.historicalAwardedAmount;
        const formattedActiveAwards = Accounting.formatNumber(props.recipient.activeAwards);
        const formattedHistoricalAwards = Accounting.formatNumber(props.recipient.historicalAwards);

        // Generate Awarded Amount string
        const awardedAmount = MoneyFormatter
            .calculateUnitForSingleValue(awarded);
        const formattedAwarded = `${MoneyFormatter
            .formatMoneyWithPrecision(awarded / awardedAmount.unit, 0)}
            ${capitalize(awardedAmount.longLabel)}`;

        // Generate Historical Awarded Amount string
        const historicalAwardedAmount = MoneyFormatter
            .calculateUnitForSingleValue(historicalAwarded);
        const formattedHistoricalAwarded = `${MoneyFormatter
            .formatMoneyWithPrecision(historicalAwarded / historicalAwardedAmount.unit, 1)}
            ${capitalize(historicalAwardedAmount.longLabel)}`;


        this.setState({
            duns,
            parentCompany,
            parentDuns,
            address2,
            formattedNaics,
            formattedAwarded,
            formattedHistoricalAwarded,
            formattedActiveAwards,
            formattedHistoricalAwards
        });
    }

    render() {
        return (
            <div className="recipient-overview">
                <div className="title">
                    <h3>{this.props.recipient.name}</h3>
                </div>
                <hr className="results-divider" />
                <div className="overview-content">
                    <div className="recipient-award">
                        <h4>Recipient Award Summary</h4>
                        <hr className="results-divider" />
                        <div className="award-amounts">
                            <div className="current">
                                <div><b>Awarded Amount</b></div>
                                <div>(Trailing 12 Months)</div>
                                <h3>
                                    {this.state.formattedAwarded}
                                </h3>
                            </div>
                            <div className="historical">
                                <div><b>Historical Awarded Amount</b></div>
                                <div>(Since FY 2006)</div>
                                <h5>
                                    {this.state.formattedHistoricalAwarded}
                                </h5>
                            </div>
                        </div>
                        <div className="award-counts">
                            <div className="current">
                                <div><b>Active Awards</b></div>
                                <div>(Trailing 12 Months)</div>
                                <h3>
                                    {this.state.formattedActiveAwards}
                                </h3>
                            </div>
                            <div className="historical">
                                <div><b>Historical Awards</b></div>
                                <div>(Since FY 2006)</div>
                                <h5>
                                    {this.state.formattedHistoricalAwards}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="recipient-details">
                        <h4>Recipient Details</h4>
                        <hr className="results-divider" />
                        <table>
                            <tbody>
                                <tr>
                                    <th>Address</th>
                                    <td>
                                        <div>{this.props.recipient.street}</div>
                                        <div>{this.state.address2}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>DUNS</th>
                                    <td>{this.state.duns}</td>
                                </tr>
                                <tr>
                                    <th>Parent DUNS</th>
                                    <td>{this.state.parentDuns}</td>
                                </tr>
                                <tr>
                                    <th>Parent Company</th>
                                    <td>{this.state.parentCompany}</td>
                                </tr>
                                <tr>
                                    <th>Recipient Type</th>
                                    <td>
                                        {this.props.recipient.types.map((type, i) =>
                                            <div key={i}>{type}</div>)}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Primary NAICS</th>
                                    <td>{this.state.formattedNaics}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

RecipientOverview.propTypes = propTypes;
