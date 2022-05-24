/**
 * AgencyLandingContainer.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import { Search } from 'js-search';
import { orderBy } from 'lodash';

import AgenciesTableFields from 'dataMapping/agencyLanding/agenciesTableFields';
import * as AgencyLandingHelper from 'helpers/agencyLandingHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import AgencyLandingContent from 'components/agencyLanding/AgencyLandingContent';

export class AgencyLandingContainer extends React.Component {
    static propTypes = {
        agenciesOrder: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            inFlight: false,
            currentFY: '',
            agencySearchString: '',
            fullData: [],
            results: []
        };

        this.agenciesRequest = null;
    }

    componentDidMount() {
        this.showColumns();
    }

    componentDidUpdate(prevProps) {
        if (this.props.agenciesOrder !== prevProps.agenciesOrder) {
            // table sort changed
            this.performSearch();
        }
    }

    componentWillUnmount() {
        if (this.agenciesRequest) {
            this.agenciesRequest.cancel();
        }
    }

    setAgencySearchString = (agencySearchString) => {
        let searchValue = '';
        if (agencySearchString.length > 2) {
            searchValue = agencySearchString;
        }

        this.setState({
            agencySearchString: searchValue
        }, () => {
            this.performSearch();
        });
    };

    showColumns() {
        const columns = [];
        const sortOrder = AgenciesTableFields.defaultSortDirection;

        AgenciesTableFields.order.forEach((col) => {
            let displayName = AgenciesTableFields[col];
            if ((col === 'budget_authority_amount') ||
                (col === 'percentage_of_total_budget_authority')) {
                // Add (FY YYYY) to Budget Authority and Percent of Total U.S. Budget column headers
                if (this.state.fy) {
                    displayName = `${displayName} (FY ${this.state.currentFY})`;
                }
            }
            const column = {
                columnName: col,
                displayName,
                defaultDirection: sortOrder[col]
            };
            columns.push(column);
        });

        this.setState({
            columns
        }, () => {
            this.fetchAgencies();
        });
    }

    fetchAgencies() {
        if (this.agenciesRequest) {
            // a request is in-flight, cancel it
            this.agenciesRequest.cancel();
        }

        this.setState({
            inFlight: true
        });

        // generate the params
        const params = {
            sort: this.props.agenciesOrder.field,
            order: this.props.agenciesOrder.direction
        };

        this.agenciesRequest = AgencyLandingHelper.fetchAllAgencies(params);

        this.agenciesRequest.promise
            .then((res) => {
                this.setState({
                    inFlight: false
                });

                this.parseAgencies(res.data);
            })
            .catch((err) => {
                this.agenciesRequest = null;
                if (!isCancel(err)) {
                    this.setState({
                        inFlight: false
                    });
                    console.log(err);
                }
            });
    }

    parseAgencies(data) {
        const agencies = [];
        data.results.forEach((item) => {
            // Format budget authority amount
            const formattedCurrency =
                MoneyFormatter.formatMoneyWithPrecision(item.budget_authority_amount, 0);

            // Convert from decimal value to percentage and round to 2 decimal places
            const formattedPercentage = (item.percentage_of_total_budget_authority * 100).toFixed(2);

            let percent = `${formattedPercentage}%`;
            if (percent === '0.00%') {
                percent = 'Less than 0.01%';
            }

            let abbreviation = '';
            if (item.abbreviation !== null && item.abbreviation !== '') {
                abbreviation = `(${item.abbreviation})`;
            }

            const agency = {
                agency_id: item.agency_slug || item.agency_id,
                agency_name: `${item.agency_name} ${abbreviation}`,
                budget_authority_amount: item.budget_authority_amount,
                percentage_of_total_budget_authority: item.percentage_of_total_budget_authority,
                display: {
                    agency_name: `${item.agency_name} (${item.abbreviation})`,
                    budget_authority_amount: formattedCurrency,
                    percentage_of_total_budget_authority: percent,
                    congressional_justification_url: item.congressional_justification_url
                    || 'not available'
                }
            };
            agencies.push(agency);
        });

        this.setState({
            fullData: agencies
        }, () => {
            this.performSearch();
        });
    }

    performSearch() {
    // perform a local search
        const search = new Search('agency_id');
        search.addIndex('agency_name');
        search.addDocuments(this.state.fullData);

        // return the full data set if no search string is provided
        let results = this.state.fullData;
        if (this.state.agencySearchString !== '') {
            results = search.search(this.state.agencySearchString);
        }

        // now sort the results by the appropriate table column and direction
        const orderedResults = orderBy(results,
            [this.props.agenciesOrder.field], [this.props.agenciesOrder.direction]);

        this.setState({
            results: orderedResults
        });
    }

    render() {
        const resultsCount = this.state.results.length;
        let resultsText = `${resultsCount} results`;
        if (resultsCount === 1) {
            resultsText = `${resultsCount} result`;
        }

        return (
            <AgencyLandingContent
                resultsText={resultsText}
                results={this.state.results}
                agencySearchString={this.state.agencySearchString}
                inFlight={this.state.inFlight}
                columns={this.state.columns}
                sort={this.props.agenciesOrder}
                setAgencySearchString={this.setAgencySearchString} />
        );
    }
}

export default connect(
    (state) => ({
        agenciesOrder: state.agencyLanding.agenciesOrder
    })
)(AgencyLandingContainer);
