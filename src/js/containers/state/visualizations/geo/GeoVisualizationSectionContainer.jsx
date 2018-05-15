/**
 * GeoVisualizationSectionContainer.jsx
 * Created by Lizzie Salita 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId, isEqual, keyBy } from 'lodash';

import GeoVisualizationSection from 'components/state/visualizations/geo/GeoVisualizationSection';

import * as SearchHelper from 'helpers/searchHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import MapBroadcaster from 'helpers/mapBroadcaster';

const propTypes = {
    stateProfile: PropTypes.object
};

const apiScopes = {
    county: 'county',
    congressionalDistrict: 'district'
};

export class GeoVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scope: 'place_of_performance',
            mapLayer: 'county',
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
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.stateProfile, this.props.stateProfile)) {
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

        // Create the time period filter
        let timePeriod = null;
        const fy = this.props.stateProfile.fy;
        if (fy !== 'all') {
            let dateRange = [];
            if (fy === 'latest') {
                dateRange = FiscalYearHelper.getTrailingTwelveMonths();
            }
            else {
                dateRange = FiscalYearHelper.convertFYToDateRange(parseInt(fy, 10));
            }
            timePeriod = [
                {
                    start_date: dateRange[0],
                    end_date: dateRange[1]
                }
            ];
        }

        const searchParams = {
            place_of_performance_locations: [
                {
                    country: 'USA',
                    state: this.props.stateProfile.overview.code
                }
            ]
        };

        if (timePeriod) {
            searchParams.time_period = timePeriod;
        }

        // generate the API parameters
        const apiParams = {
            scope: this.state.scope,
            geo_layer: apiScopes[this.state.mapLayer],
            geo_layer_filters: this.state.visibleEntities,
            filters: searchParams
        };

        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

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
        stateProfile: state.stateProfile
    })
)(GeoVisualizationSectionContainer);
