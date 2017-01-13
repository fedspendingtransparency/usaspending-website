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

import SearchOperation from 'models/search/SearchOperation';

const propTypes = {
    reduxFilters: React.PropTypes.object
};

class TimeVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: ['2016'],
            xSeries: [['2016']],
            ySeries: [[10000000]]
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
        // build a new search operation from the Redux state
        const operation = new SearchOperation();
        operation.fromState(this.props.reduxFilters);
        // because the aggregation endpoint uses a different model object, we need to add a
        // prefix to all our filter field names
        const searchParams = operation.toParams('financial_accounts_by_awards__award__');

        // generate the API parameters
        const apiParams = {
            field: 'transaction_obligated_amount',
            group: 'create_date',
            order: ['item'],
            date_part: 'year',
            aggregate: 'sum',
            filters: searchParams
        };

        const search = SearchHelper.performAwardsTotalSearch(apiParams);
        search.promise
            .then((res) => {
                // this.parseData(res.data);
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
            ySeries
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
