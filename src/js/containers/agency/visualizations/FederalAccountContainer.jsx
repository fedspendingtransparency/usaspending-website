/**
 * FederalAccountContainer.jsx
 * Created by Kevin Li 6/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { slice } from 'lodash';

import * as AgencyHelper from 'helpers/agencyHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';


import FederalAccountVisualization from
    'components/agency/visualizations/federalAccount/FederalAccountVisualization';

const propTypes = {
    id: PropTypes.string,
    activeFY: PropTypes.string,
    obligatedAmount: PropTypes.number,
    asOfDate: PropTypes.string
};

export default class FederalAccountContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            isInitialLoad: true,
            linkSeries: [],
            labelSeries: [],
            dataSeries: [],
            descriptions: [],
            page: 1,
            isLastPage: true
        };

        this.request = null;

        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.loadData(this.props.id, this.props.activeFY);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id || this.props.activeFY !== prevProps.activeFY) {
            this.setUpdateState(this.props);
        }
    }

    setUpdateState(props) {
        this.setState({
            isInitialLoad: true
        }, () => {
            this.loadData(props.id, props.activeFY, 1);
        });
    }

    loadData(id, fy, pageNumber = 1) {
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
            limit: 10,
            page: pageNumber
        });

        this.request.promise
            .then((res) => {
                this.setState({
                    loading: false,
                    error: false,
                    isInitialLoad: false,
                    page: pageNumber,
                    isLastPage: !res.data.page_metadata.has_next_page
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

    changePage(pageNumber) {
        if (pageNumber < 1 || (this.state.isLastPage && pageNumber > this.state.page)) {
            // don't do anything
            return;
        }

        this.setState({
            page: pageNumber
        }, () => {
            this.loadData(this.props.id, this.props.activeFY, pageNumber);
        });
    }

    parseData(data) {
    // keep only the top 10 in descending order
        const results = slice(data, 0, 10);
        const linkSeries = [];
        const dataSeries = [];
        const labelSeries = [];
        const descriptions = [];

        results.forEach((result) => {
            let parsedValue = parseFloat(result.obligated_amount);
            if (isNaN(parsedValue)) {
                // the aggregate value is invalid (most likely null)
                parsedValue = 0;
            }
            const account = result.account_title;

            linkSeries.push(result.account_number);
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
                activeFY={this.props.activeFY}
                obligatedAmount={this.props.obligatedAmount}
                linkSeries={this.state.linkSeries}
                dataSeries={this.state.dataSeries}
                labelSeries={this.state.labelSeries}
                descriptions={this.state.descriptions}
                loading={this.state.loading}
                error={this.state.error}
                isInitialLoad={this.state.isInitialLoad}
                asOfDate={this.props.asOfDate}
                page={this.state.page}
                isLastPage={this.state.isLastPage}
                changePage={this.changePage} />
        );
    }
}

FederalAccountContainer.propTypes = propTypes;
