/**
 * GeoVisualizationSectionContainer.jsx
 * Created by Kevin Li 2/13/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import GeoVisualizationSection from
    'components/search/visualizations/geo/GeoVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';

import SearchTransactionOperation from 'models/search/SearchTransactionOperation';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    resultsMeta: React.PropTypes.object
};

export class GeoVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scope: 'pop',
            data: {
                values: [],
                states: []
            },
            renderHash: `geo-${_.uniqueId()}`,
            loading: true
        };

        this.apiRequest = null;

        this.changeScope = this.changeScope.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.fetchData();
        }
    }

    changeScope(scope) {
        this.setState({
            scope
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

        let fieldName = 'place_of_performance';
        if (this.state.scope === 'recipient') {
            fieldName = 'recipient__location';
        }

        // generate the API parameters
        const apiParams = {
            field: 'federal_action_obligation',
            group: `${fieldName}__state_code`,
            order: ['item'],
            aggregate: 'sum',
            filters: searchParams,
            limit: 60,
            auditTrail: 'Geo visualization'
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
        const spendingValues = [];
        const spendingStates = [];

        data.results.forEach((item) => {
            // state must not be null or empty string
            if (item.item && item.item !== '') {
                spendingStates.push(item.item);
                spendingValues.push(parseFloat(item.aggregate));
            }
        });

        this.setState({
            data: {
                values: spendingValues,
                states: spendingStates
            },
            renderHash: `geo-${_.uniqueId()}`,
            loading: false
        });
    }

    render() {
        return (
            <GeoVisualizationSection
                {...this.state}
                total={this.props.resultsMeta.visualization.transaction_sum}
                changeScope={this.changeScope} />
        );
    }
}

GeoVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters, resultsMeta: state.resultsMeta.toJS() }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(GeoVisualizationSectionContainer);
