/**
 * GeoVisualizationSectionContainer.jsx
 * Created by Kevin Li 2/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId, isEqual, keyBy } from 'lodash';

import GeoVisualizationSection from
    'components/search/visualizations/geo/GeoVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';

import * as SearchHelper from 'helpers/searchHelper';
import MapBroadcaster from 'helpers/mapBroadcaster';
import Analytics from 'helpers/analytics/Analytics';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';

const propTypes = {
    reduxFilters: PropTypes.object,
    resultsMeta: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool
};

const apiScopes = {
    state: 'state',
    county: 'county',
    congressionalDistrict: 'district'
};

const logMapLayerEvent = (layer) => {
    Analytics.event({
        category: 'Advanced Search - Map - Map Layer',
        action: layer
    });
};

const logMapScopeEvent = (scope) => {
    Analytics.event({
        category: 'Advanced Search - Map - Location Type',
        action: scope
    });
};

export class GeoVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scope: 'place_of_performance',
            mapLayer: 'state',
            data: {
                values: [],
                locations: []
            },
            visibleEntities: [],
            renderHash: `geo-${uniqueId()}`,
            loading: true,
            loadingTiles: true,
            error: false
        };

        this.apiRequest = null;

        this.mapListeners = [];

        this.changeScope = this.changeScope.bind(this);
        this.changeMapLayer = this.changeMapLayer.bind(this);
        this.receivedEntities = this.receivedEntities.bind(this);
        this.mapLoaded = this.mapLoaded.bind(this);
        this.prepareFetch = this.prepareFetch.bind(this);
    }

    componentDidMount() {
        const doneListener = MapBroadcaster.on('mapMeasureDone', this.receivedEntities);
        this.mapListeners.push(doneListener);
        const measureListener = MapBroadcaster.on('mapReady', this.mapLoaded);
        this.mapListeners.push(measureListener);
        const movedListener = MapBroadcaster.on('mapMoved', this.prepareFetch);
        this.mapListeners.push(movedListener);

        // log the initial event
        logMapScopeEvent(this.state.scope);
        logMapLayerEvent(this.state.mapLayer);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.reduxFilters, this.props.reduxFilters) && !this.props.noApplied) {
            this.prepareFetch(true);
        }
        else if (prevProps.subaward !== this.props.subaward && !this.props.noApplied) {
            // subaward toggle changed, update the search object
            this.prepareFetch(true);
        }
    }

    componentWillUnmount() {
        // remove any broadcast listeners
        this.mapListeners.forEach((listenerRef) => {
            MapBroadcaster.off(listenerRef.event, listenerRef.id);
        });
    }

    changeScope(scope) {
        if (scope === this.state.scope) {
            // scope has not changed
            return;
        }

        this.setState({
            scope
        }, () => {
            this.prepareFetch(true);
            logMapScopeEvent(scope);
        });
    }

    mapLoaded() {
        this.setState({
            loadingTiles: false
        }, () => {
            window.setTimeout(() => {
                // SUPER BODGE: wait 300ms before measuring the map
                // Mapbox source and render events appear to be firing the tiles are actually ready
                // when served from cache
                this.prepareFetch();
            }, 300);
        });
    }

    prepareFetch(forced = false) {
        if (this.state.loadingTiles) {
            // we can't measure visible entities if the tiles aren't loaded yet, so stop
            return;
        }

        MapBroadcaster.emit('measureMap', forced);
    }

    compareEntities(entities) {
        // check if the inbound list of entities is different from the existing visible entities
        const current = keyBy(this.state.visibleEntities);
        const inbound = keyBy(entities);

        for (const entity of entities) {
            if (!current[entity]) {
                // new entity entered view
                return true;
            }
        }

        for (const entity of this.state.visibleEntities) {
            if (!inbound[entity]) {
                // old entity exited view
                return true;
            }
        }

        return false;
    }

    receivedEntities(entities, forced) {
        if (!forced) {
            // only check if the returned entities list has changed if this is not a forced update
            const changed = this.compareEntities(entities);
            if (!changed) {
                // nothing changed
                return;
            }
        }

        this.setState({
            visibleEntities: entities
        }, () => {
            this.fetchData();
        });
    }

    fetchData() {
        // build a new search operation from the Redux state, but create a transaction-based search
        // operation instead of an award-based one
        const operation = new SearchAwardsOperation();
        operation.fromState(this.props.reduxFilters);

        // if no entities are visible, don't make an API rquest because nothing in the US is visible
        if (this.state.visibleEntities.length === 0) {
            this.setState({
                loading: false,
                error: false,
                data: {
                    values: [],
                    locations: []
                }
            });
            return;
        }

        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            scope: this.state.scope,
            geo_layer: apiScopes[this.state.mapLayer],
            geo_layer_filters: this.state.visibleEntities,
            filters: searchParams,
            subawards: this.props.subaward,
            auditTrail: 'Map Visualization'
        };

        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        this.props.setAppliedFilterCompletion(false);

        this.apiRequest = SearchHelper.performSpendingByGeographySearch(apiParams);
        this.apiRequest.promise
            .then((res) => {
                this.parseData(res.data);
                this.apiRequest = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.apiRequest = null;

                    this.setState({
                        loading: false,
                        error: true
                    });

                    this.props.setAppliedFilterCompletion(true);
                }
            });
    }

    parseData(data) {
        const spendingValues = [];
        const spendingShapes = [];
        const spendingLabels = {};

        data.results.forEach((item) => {
            // state must not be null or empty string
            if (item.shape_code && item.shape_code !== '') {
                spendingShapes.push(item.shape_code);
                spendingValues.push(parseFloat(item.aggregated_amount));
                spendingLabels[item.shape_code] = {
                    label: item.display_name,
                    value: parseFloat(item.aggregated_amount)
                };
            }
        });

        this.props.setAppliedFilterCompletion(true);

        this.setState({
            data: {
                values: spendingValues,
                locations: spendingShapes,
                labels: spendingLabels
            },
            renderHash: `geo-${uniqueId()}`,
            loading: false,
            error: false
        });
    }

    changeMapLayer(layer) {
        this.setState({
            mapLayer: layer,
            renderHash: `geo-${uniqueId()}`,
            loadingTiles: true
        }, () => {
            this.prepareFetch(true);
            logMapLayerEvent(layer);
        });
    }

    render() {
        return (
            <GeoVisualizationSection
                {...this.state}
                noResults={this.state.data.values.length === 0}
                changeScope={this.changeScope}
                changeMapLayer={this.changeMapLayer} />
        );
    }
}

GeoVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        subaward: state.searchView.subaward
    }),
    (dispatch) => bindActionCreators(Object.assign({}, searchFilterActions, {
        setAppliedFilterCompletion
    }), dispatch)
)(GeoVisualizationSectionContainer);
