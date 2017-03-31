/**
 * RankVisualizationSectionContainer.jsx
 * Created by Kevin Li 2/9/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import RankVisualizationSection from
    'components/search/visualizations/rank/RankVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';

import SearchTransactionOperation from 'models/search/SearchTransactionOperation';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    meta: React.PropTypes.object
};

export class RankVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            labelSeries: [],
            dataSeries: [],
            page: 1,
            agencyScope: 'toptier',
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
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.newSearch();
        }
    }

    changeScope(scope) {
        this.setState({
            agencyScope: scope,
            page: 1
        }, () => {
            this.fetchData();
        });
    }

    newSearch() {
        this.setState({
            page: 1
        }, () => {
            this.fetchData();
        });
    }

    nextPage() {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.fetchData();
        });
    }

    previousPage() {
        // change the state by subtracting 2 (since the page number is already incremented)
        const prevPage = _.max([1, this.state.page - 1]);
        this.setState({
            page: prevPage
        }, () => {
            this.fetchData();
        });
    }

    fetchData() {
        // build a new search operation from the Redux state, but create a transaction-based search
        // operation instead of an award-based one
        const operation = new SearchTransactionOperation();
        operation.fromState(this.props.reduxFilters);

        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            field: 'federal_action_obligation',
            group: `awarding_agency__${this.state.agencyScope}_agency__name`,
            order: ['-aggregate'],
            aggregate: 'sum',
            filters: searchParams,
            limit: 5,
            page: this.state.page
        };

        this.setState({
            loading: true
        });


        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        this.apiRequest = SearchHelper.performTransactionsTotalSearch(apiParams);
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

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((item) => {
            labelSeries.push(item.item);
            dataSeries.push(parseFloat(item.aggregate));
        });

        this.setState({
            labelSeries,
            dataSeries,
            loading: false,
            next: data.page_metadata.next,
            previous: data.page_metadata.previous,
            hasNextPage: data.page_metadata.has_next_page,
            hasPreviousPage: data.page_metadata.has_previous_page
        });
    }

    render() {
        return (
            <RankVisualizationSection
                {...this.state}
                meta={this.props.meta}
                changeScope={this.changeScope}
                nextPage={this.nextPage}
                previousPage={this.previousPage} />
        );
    }
}

RankVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.filters,
        meta: state.resultsMeta.toJS()
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RankVisualizationSectionContainer);
