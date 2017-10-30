/**
 * GeoVisualizationSectionContainer.jsx
 * Created by Kevin Li 2/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uniqueId, isEqual } from 'lodash';

import GeoVisualizationSection from
    'components/search/visualizations/geo/GeoVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import * as SearchHelper from 'helpers/searchHelper';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';

const propTypes = {
    reduxFilters: PropTypes.object,
    resultsMeta: PropTypes.object
};

export class GeoVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scope: 'place_of_performance',
            mapScope: 'state',
            data: {
                values: [],
                locations: []
            },
            renderHash: `geo-${uniqueId()}`,
            loading: true
        };

        this.apiRequest = null;

        this.changeScope = this.changeScope.bind(this);
        this.changeMapLayer = this.changeMapLayer.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.reduxFilters, this.props.reduxFilters)) {
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
        // this visualization only uses the /transactions/total for all filter combinations
        // (and in unfiltered state)

        // build a new search operation from the Redux state, but create a transaction-based search
        // operation instead of an award-based one
        const operation = new SearchAwardsOperation();
        operation.fromState(this.props.reduxFilters);

        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            scope: this.state.scope,
            filters: searchParams,
            limit: 500,
            auditTrail: 'Map Visualization'
        };

        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        this.setState({
            loading: true
        });

        this.apiRequest = SearchHelper.performSpendingByGeographySearch(apiParams);
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
            if (item.state_code && item.state_code !== '') {
                spendingStates.push(item.state_code);
                spendingValues.push(parseFloat(item.aggregated_amount));
            }
        });

        this.setState({
            data: {
                values: spendingValues,
                locations: spendingStates
            },
            renderHash: `geo-${uniqueId()}`,
            loading: false
        });
    }

    changeMapLayer(layer) {
        this.setState({
            mapScope: layer,
            renderHash: `geo-${uniqueId()}`
        });
    }

    render() {
        return (
            <GeoVisualizationSection
                {...this.state}
                total={this.props.resultsMeta.visualization.transaction_sum}
                changeScope={this.changeScope}
                changeMapLayer={this.changeMapLayer} />
        );
    }
}

GeoVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters, resultsMeta: state.resultsMeta.toJS() }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(GeoVisualizationSectionContainer);
