/**
 * SpendingByIndustryCodeVisualizationContainer.jsx
 * Created by Kevin Li 5/4/17
 */


import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isEqual, max } from 'lodash';

import SpendingByIndustryCodeSection from
    'components/search/visualizations/rank/sections/SpendingByIndustryCodeSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import * as FilterFields from 'dataMapping/search/filterFields';

import * as AwardTypeQuery from 'models/search/queryBuilders/AwardTypeQuery';
import { awardTypeGroups } from 'dataMapping/search/awardType';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';

const propTypes = {
    reduxFilters: PropTypes.object,
    meta: PropTypes.object
};

export class SpendingByIndustryCodeVisualizationContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            labelSeries: [],
            dataSeries: [],
            descriptions: [],
            page: 1,
            scope: 'psc',
            next: '',
            previous: '',
            hasNextPage: false,
            hasPreviousPage: false
        };

        this.changeScope = this.changeScope.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.apiRequest = null;
    }

    componentDidMount() {
        this.newSearch();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.newSearch();
        }
    }

    changeScope(scope) {
        this.setState({
            scope,
            page: 1,
            hasNextPage: false
        }, () => {
            this.fetchData();
        });
    }

    newSearch() {
        this.setState({
            page: 1,
            hasNextPage: false
        }, () => {
            this.fetchData();
        });
    }

    nextPage() {
        if (this.state.hasNextPage) {
            this.setState({
                page: this.state.page + 1
            }, () => {
                this.fetchData();
            });
        }
    }

    previousPage() {
        // change the state by subtracting 2 (since the page number is already incremented)
        const prevPage = max([1, this.state.page - 1]);
        this.setState({
            page: prevPage
        }, () => {
            this.fetchData();
        });
    }

    fetchData() {
        this.setState({
            loading: true
        });

        // Cancel API request if it exists
        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        // Fetch data from the Awards v2 endpoint
        this.fetchAwards("Industry Code Rank Visualization");
    }

    fetchAwards(auditTrail = null) {
        const operation = new SearchAwardsOperation();
        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        let group = [FilterFields.transactionFields.psc];
        if (this.state.scope === 'naics') {
            group = [
                FilterFields.transactionFields.naics,
                FilterFields.transactionFields.naicsDescription
            ];
        }

        // because industry codes are only available for contracts, restrict the query to only
        // contract types
        const contractFilter = AwardTypeQuery.buildQuery(awardTypeGroups.contracts, 'transaction');
        searchParams.awardType = contractFilter;

        // Generate the API parameters
        const apiParams = {
            group,
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        if (auditTrail) {
            apiParams.auditTrail = auditTrail;
        }

        this.apiRequest = SearchHelper.performTransactionsTotalSearch(apiParams);

        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data, group);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
            });
    }

    parseData(data, labelFields) {
        const labelSeries = [];
        const dataSeries = [];
        const descriptions = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            let label = '';
            if (labelFields.length === 1) {
                label = item[labelFields];
            }
            else {
                const key = item[labelFields[0]];
                const value = item[labelFields[1]];
                if (key && value) {
                    label = `${item[labelFields[0]]}: ${item[labelFields[1]]}`;
                }
                else if (key) {
                    label = key;
                }
                else if (value) {
                    label = value;
                }
                else {
                    label = '';
                }
            }

            labelSeries.push(label);
            dataSeries.push(parseFloat(item.aggregate));

            const description = `Spending by ${label}: \
${MoneyFormatter.formatMoney(parseFloat(item.aggregate))}`;
            descriptions.push(description);
        });

        this.setState({
            labelSeries,
            dataSeries,
            descriptions,
            loading: false,
            next: data.page_metadata.next,
            previous: data.page_metadata.previous,
            hasNextPage: data.page_metadata.has_next_page,
            hasPreviousPage: data.page_metadata.has_previous_page
        });
    }

    render() {
        return (
            <SpendingByIndustryCodeSection
                {...this.state}
                meta={this.props.meta}
                changeScope={this.changeScope}
                nextPage={this.nextPage}
                previousPage={this.previousPage} />
        );
    }
}

SpendingByIndustryCodeVisualizationContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.filters,
        meta: state.resultsMeta.toJS()
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SpendingByIndustryCodeVisualizationContainer);
