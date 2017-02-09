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
    reduxFilters: React.PropTypes.object
};

export class RankVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            labelSeries: [],
            dataSeries: [],
            page: 1,
            agencyScope: 'toptier'
        };

        this.changeScope = this.changeScope.bind(this);
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
        const search = SearchHelper.performTransactionsTotalSearch(apiParams);
        search.promise
            .then((res) => {
                this.parseData(res.data);
            });
    }

    parseData(data) {
        const labelSeries = [];
        const dataSeries = [];

        // iterate through each response object and break it up into groups, x series, and y series
        const startIndex = 5 * (this.state.page - 1);
        const endIndex = _.min([startIndex + 5, data.results.length]);
        for (let i = startIndex; i < endIndex; i++) {
            const item = data.results[i];
            labelSeries.push(item.item);
            dataSeries.push(parseFloat(item.aggregate));
        }

        this.setState({
            labelSeries,
            dataSeries,
            loading: false,
            page: this.state.page + 1
        });
    }

    render() {
        return (
            <RankVisualizationSection
                {...this.state}
                meta={this.props.meta}
                changeScope={this.changeScope} />
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
