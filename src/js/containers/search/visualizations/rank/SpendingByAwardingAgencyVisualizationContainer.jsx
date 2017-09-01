/**
 * SpendingByAwardingAgencyVisualizationContainer.jsx
 * Created by Kevin Li 2/9/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual, max } from 'lodash';

import SpendingByAgencySection from
    'components/search/visualizations/rank/sections/SpendingByAgencySection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';

const propTypes = {
    reduxFilters: PropTypes.object,
    meta: PropTypes.object
};

export class SpendingByAwardingAgencyVisualizationContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            labelSeries: [],
            dataSeries: [],
            descriptions: [],
            page: 1,
            agencyScope: 'agency',
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
            agencyScope: scope,
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

        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        // Fetch data from the Awards v2 endpoint
        this.fetchAwards("Awarding Agency Rank Visualization");
    }

    fetchAwards(auditTrail = null) {
        // Create Search Operation
        const operation = new SearchAwardsOperation();
        operation.fromState(this.props.reduxFilters);
        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            category: 'awarding_agency',
            scope: this.state.agencyScope,
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        if (auditTrail) {
            apiParams.auditTrail = auditTrail;
        }

        this.apiRequest = SearchHelper.performSpendingByCategorySearch(apiParams);
        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data);
                this.apiRequest = null;
            })
            .catch(() => {
                this.apiRequest = null;
            });
    }

    parseData(data) {
        const labelSeries = [];
        const dataSeries = [];
        const descriptions = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            let aggregate = parseFloat(item.aggregated_amount);
            if (isNaN(aggregate)) {
                // the aggregate value is invalid (most likely null)
                aggregate = 0;
            }

            const agencyName = item.agency_name;
            let agencyAbbreviation = '';

            if (item.agency_abbreviation !== null && item.agency_abbreviation !== '') {
                agencyAbbreviation = ` (${item.agency_abbreviation})`;
            }

            const label = `${agencyName}${agencyAbbreviation}`;

            labelSeries.push(`${label}`);
            dataSeries.push(aggregate);

            const description = `Spending by ${label}: \
${MoneyFormatter.formatMoney(aggregate)}`;
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
            <SpendingByAgencySection
                {...this.state}
                meta={this.props.meta}
                changeScope={this.changeScope}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
                agencyType="awarding" />
        );
    }
}

SpendingByAwardingAgencyVisualizationContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.filters,
        meta: state.resultsMeta.toJS()
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SpendingByAwardingAgencyVisualizationContainer);
