/**
 * FederalAccountContainer.jsx
 * Created by Kevin Li 6/29/17
 */

import React from 'react';
import { isCancel } from 'axios';

import * as AgencyHelper from 'helpers/agencyHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';


import FederalAccountVisualization from
    'components/agency/visualizations/federalAccount/FederalAccountVisualization';

const propTypes = {
    id: React.PropTypes.string,
    activeFY: React.PropTypes.string,
    obligatedAmount: React.PropTypes.number
};

export default class FederalAccountContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            linkSeries: [],
            labelSeries: [],
            dataSeries: [],
            descriptions: []
        };

        this.request = null;
    }

    componentWillMount() {
        this.loadData(this.props.id, this.props.activeFY);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id || this.props.activeFY !== nextProps.activeFY) {
            this.loadData(nextProps.id, nextProps.activeFY);
        }
    }

    loadData(id, fy) {
        if (!id || id === '' || !fy || fy === '') {
            // invalid ID or fiscal year
            return;
        }

        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        this.request = AgencyHelper.fetchAgencyFederalAccounts({
            fiscal_year: fy,
            funding_agency_id: id,
            limit: 10
        });

        this.request.promise
            .then((res) => {
                this.setState({
                    loading: false,
                    error: false
                });

                this.parseData(res.data.results);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        loading: false,
                        error: true
                    });

                    console.log(err);
                }

                this.request = null;
            });
    }

    parseData(data) {
        // keep only the top 10 in descending order
        const linkSeries = [];
        const dataSeries = [];
        const labelSeries = [];
        const descriptions = [];

        data.forEach((result) => {
            let parsedValue = parseFloat(result.obligated_amount);
            if (isNaN(parsedValue)) {
                // the aggregate value is invalid (most likely null)
                parsedValue = 0;
            }

            const account = result.account_title;

            linkSeries.push(result.id);
            labelSeries.push(account);
            dataSeries.push(parsedValue);
            const description = `${MoneyFormatter.formatMoney(parsedValue)} obligated for \
${account}`;
            descriptions.push(description);
        });


        this.setState({
            linkSeries,
            dataSeries,
            labelSeries,
            descriptions
        });
    }

    render() {
        return (
            <FederalAccountVisualization
                obligatedAmount={this.props.obligatedAmount}
                linkSeries={this.state.linkSeries}
                dataSeries={this.state.dataSeries}
                labelSeries={this.state.labelSeries}
                descriptions={this.state.descriptions}
                loading={this.state.loading}
                error={this.state.error} />
        );
    }
}

FederalAccountContainer.propTypes = propTypes;
