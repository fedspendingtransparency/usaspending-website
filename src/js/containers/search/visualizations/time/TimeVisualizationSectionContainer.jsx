/**
 * TimeVisualizationSectionContainer.jsx
 * Created by Kevin Li 1/12/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import TimeVisualizationSection from
    'components/search/visualizations/time/TimeVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';

import SearchTransactionOperation from 'models/search/SearchTransactionOperation';

const propTypes = {
    reduxFilters: React.PropTypes.object
};

export class TimeVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            groups: [],
            xSeries: [],
            ySeries: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.fetchData();
        }
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
            group: 'action_date',
            order: ['item'],
            date_part: 'year',
            aggregate: 'sum',
            filters: searchParams
        };

        this.setState({
            loading: true
        });
        const search = SearchHelper.performAwardsTotalSearch(apiParams);
        search.promise
            .then((res) => {
                this.parseData(res.data);
            });
    }

    parseData(data) {
        const groups = [];
        const xSeries = [];
        const ySeries = [];

        // iterate through each response object and break it up into groups, x series, and y series
        data.results.forEach((group) => {
            groups.push(group.item);
            xSeries.push([group.item]);
            ySeries.push([parseFloat(group.aggregate)]);
        });

        this.setState({
            groups,
            xSeries,
            ySeries,
            loading: false
        });
    }

    render() {
        return (
            <TimeVisualizationSection data={this.state} />
        );
    }
}

TimeVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TimeVisualizationSectionContainer);
