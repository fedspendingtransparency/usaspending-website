/**
 * MapVisualizationContainer.jsx
 * Created by Emily Gullo 04/05/2017
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import MapVisualization from
    'components/homepage/visualizations/geo/MapVisualization';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';

const propTypes = {
    reduxFilters: React.PropTypes.object
};

export class MapVisualizationContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                values: [],
                states: []
            },
            renderHash: `geo-${_.uniqueId()}`,
            loading: true
        };

        this.apiRequest = null;
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
        // generate the API parameters
        const apiParams = {
            field: 'federal_action_obligation',
            group: `place_of_performance__state_code`,
            order: ['item'],
            aggregate: 'sum',
            limit: 60,
            filter: {
                field: 'submission__reporting_fiscal_year',
                operation: 'equals',
                value: '2016'
            }
        };

        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        this.setState({
            loading: true
        });

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
        let totalAmount = 0;
        const spendingValues = [];
        const spendingStates = [];

        data.results.forEach((item) => {
            // state must not be null or empty string
            if (item.item && item.item !== '') {
                spendingStates.push(item.item);
                spendingValues.push(parseFloat(item.aggregate));
            }

            totalAmount += parseFloat(item.aggregate);
        });

        this.setState({
            data: {
                values: spendingValues,
                states: spendingStates,
                total: totalAmount
            },
            renderHash: `geo-${_.uniqueId()}`,
            loading: false
        });
    }

    render() {
        return (
            <MapVisualization
                {...this.state} />
        );
    }
}

MapVisualizationContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters, resultsMeta: state.resultsMeta.toJS() }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(MapVisualizationContainer);
