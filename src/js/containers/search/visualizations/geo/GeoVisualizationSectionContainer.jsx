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
import { stateCenterFromFips, performCountryGeocode } from 'helpers/mapHelper';
import { stateFIPSByAbbreviation } from 'dataMapping/state/stateNames';

import GeoVisualizationSection from
    'components/search/visualizations/geo/GeoVisualizationSection';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';
import { updateMapLegendToggle } from 'redux/actions/search/mapLegendToggleActions';

import MapBroadcaster from 'helpers/mapBroadcaster';
import Analytics from 'helpers/analytics/Analytics';
import { performSpendingByGeographySearch } from 'apis/search';

import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import { parseRows } from 'helpers/search/visualizations/geoHelper';

const propTypes = {
    reduxFilters: PropTypes.object,
    resultsMeta: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool,
    mapLegendToggle: PropTypes.string,
    updateMapLegendToggle: PropTypes.func,
    className: PropTypes.string
};

const apiScopes = {
    country: 'country',
    state: 'state',
    county: 'county',
    congressionalDistrict: 'district'
};

const logMapLayerEvent = (layer) => {
    Analytics.event({
        event: 'search_map_layer_event',
        category: 'Advanced Search - Map - Map Layer',
        action: layer,
        gtm: true
    });
};

const logMapScopeEvent = (scope) => {
    Analytics.event({
        event: 'search_map_location_type_event',
        category: 'Advanced Search - Map - Location Type',
        action: scope,
        gtm: true
    });
};


export class GeoVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scope: 'place_of_performance',
            mapLayer: 'state',
            rawAPIData: [],
            data: {
                values: [],
                locations: []
            },
            visibleEntities: [],
            renderHash: `geo-${uniqueId()}`,
            country_USA_data: null,
            loading: true,
            loadingTiles: true,
            error: false,
            center: [-95.569430, 38.852892]
        };

        this.apiRequest = null;
        this.mapListeners = [];

        this.changeScope = this.changeScope.bind(this);
        this.changeMapLayer = this.changeMapLayer.bind(this);
        this.receivedEntities = this.receivedEntities.bind(this);
        this.mapLoaded = this.mapLoaded.bind(this);
        this.prepareFetch = this.prepareFetch.bind(this);
        this.mapScopeLogic = this.mapScopeLogic.bind(this);
        this.updateMapScope = this.updateMapScope.bind(this);
    }

    componentDidMount() {
        const doneListener = MapBroadcaster.on('mapMeasureDone', this.receivedEntities);
        this.mapListeners.push(doneListener);
        const measureListener = MapBroadcaster.on('mapReady', this.mapLoaded);
        this.mapListeners.push(measureListener);
        const movedListener = MapBroadcaster.on('mapMoved', this.prepareFetch);
        this.mapListeners.push(movedListener);

        this.updateMapScope();

        // log the initial event
        logMapScopeEvent(this.state.scope);
        logMapLayerEvent(this.state.mapLayer);
    }

    componentDidUpdate(prevProps) {
        let updateMap = false;
        if (!isEqual(prevProps.reduxFilters, this.props.reduxFilters) && !this.props.noApplied) {
            this.prepareFetch(true);
            updateMap = true;
        }
        else if (prevProps.subaward !== this.props.subaward && !this.props.noApplied) {
            // subaward toggle changed, update the search object
            this.prepareFetch(true);
            updateMap = true;
        }
        else if (prevProps.mapLegendToggle !== this.props.mapLegendToggle) {
            this.handleMapLegendToggleChange();
        }

        if (updateMap) {
            this.updateMapScope();
        }
    }

    componentWillUnmount() {
    // remove any broadcast listeners
        this.mapListeners.forEach((listenerRef) => {
            MapBroadcaster.off(listenerRef.event, listenerRef.id);
        });
    }

    setParsedData() {
        this.props.setAppliedFilterCompletion(true);

        this.setState({
            data: this.valuesLocationsLabelsFromAPIData(),
            renderHash: `geo-${uniqueId()}`,
            loading: false,
            error: false
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

        // if no entities are visible, don't make an API request because nothing in the US is visible
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

        // if subawards is true, newAwardsOnly cannot be true, so we remove
        // dateType for this request
        if (this.props.subaward && operation.dateType) {
            delete operation.dateType;
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
        this.apiRequest = performSpendingByGeographySearch(apiParams);
        this.apiRequest.promise
            .then((res) => {
                this.apiRequest = null;
                const parsedData = parseRows(res.data.results, apiParams);
                this.setState({ rawAPIData: parsedData }, this.setParsedData);

                this.setState({
                    loading: false,
                    error: false
                });
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

    mapToggleDataKey = () => (this.props.mapLegendToggle === 'totalSpending' ? 'aggregated_amount' : 'per_capita');
    /**
     * handleMapLegendToggleChange
     * - updates data values property and label value properties to respective spending total
     * @returns {null}
     */
    handleMapLegendToggleChange = () => {
        this.setState({
            data: Object.assign({}, this.valuesLocationsLabelsFromAPIData()),
            renderHash: `geo-${uniqueId()}`
        });
    };

    calculateCenterPoint(location) {
        console.log(location);

        if (location) {
            this.locationRequest = performCountryGeocode(location);

            this.locationRequest.promise
                .then((res) => {
                    console.log(res);
                    this.setState({ center: res.data?.features[0]?.center ? res.data?.features[0]?.center : [-95.569430, 38.852892] });
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        console.log(err);
                        this.locationRequest = null;
                    }
                });
        }
        else {
            this.setState({ center: [-95.569430, 38.852892] });
        }
    }

    /**
     * valuesLocationsLabelsFromAPIData
     * - creates locations, values, and labels for the map visualization from api data
     * @returns {Object} - object with locations, values and labels properties
     */
    valuesLocationsLabelsFromAPIData = () => {
        const values = [];
        const locations = [];
        const labels = {};
        this.state.rawAPIData.forEach((item) => {
            // state must not be null or empty string
            if (item.shape_code && item.shape_code !== '') {
                locations.push(item.shape_code);
                values.push(parseFloat(item[this.mapToggleDataKey()]));
                labels[item.shape_code] = {
                    label: item.display_name,
                    value: parseFloat(item[this.mapToggleDataKey()])
                };
            }
        });

        return { values, locations, labels };
    };

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

    updateMapLegendToggle = (value) => {
        this.props.updateMapLegendToggle(value);
    };

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

    mapScopeLogic(type) {
        const selectedLocationByType = type === "pop" ? "selectedLocations" : "selectedRecipientLocations";
        // there is only 1 item, place of performance
        if (this.props.reduxFilters[selectedLocationByType].size === 1) {
            const onlyObject = this.props.reduxFilters[selectedLocationByType].first().filter;
            if (onlyObject.district_current || onlyObject.district_original) {
                this.changeMapLayer("congressionalDistrict");
                this.setState({
                    center: stateCenterFromFips(stateFIPSByAbbreviation[onlyObject.state]),
                    singleLocationSelected: onlyObject
                });
            }
            else if (onlyObject.county) {
                this.changeMapLayer("county");
                this.setState({
                    center: stateCenterFromFips(stateFIPSByAbbreviation[onlyObject.state]),
                    singleLocationSelected: onlyObject
                });
            }
            else if (onlyObject.state) {
                this.setState({ center: stateCenterFromFips(stateFIPSByAbbreviation[onlyObject.state]) });
                // do not change the map layer, it is already state
            }
            else if (onlyObject.country !== "USA") {
                // TODO - Commenting out this line to ensure the map always shows results
                //  before DEV-10520 is completed; For DEV-10520 change this back to country
                console.log("country");
                this.changeMapLayer("country");
                this.calculateCenterPoint(onlyObject.country);
            }
            // defaults to state
        }
        else if (this.props.reduxFilters[selectedLocationByType].size > 1) {
            const onlyObject = this.props.reduxFilters[selectedLocationByType];
            let numStates = 0;
            let numCountries = 0;
            let numCounties = 0;
            let numCDs = 0;
            let international = false;
            for (const entry of onlyObject.entries()) {
                // key value pair [0] is key
                if (entry.length === 2) {
                    // country can be usa or international
                    if (entry[0].length === 3) {
                        if (entry[0] === 'USA') {
                            numCountries++;
                        }
                        else {
                            numCountries++;
                            international = true;
                        }
                    }
                    // country and state, ONLY USA
                    else if (entry[0].length === 6) {
                        numStates++;
                    }
                    else if (entry[0].length === 9 || entry[0].length === 10) {
                        // cd or county
                        if (entry[1].display.entity === 'County') {
                            numCounties++;
                        }
                        else if (entry[1].display.entity.includes('congressional district')) {
                            numCDs++;
                        }
                    }
                }
            }

            // change map layers based on make up of items
            if (numCountries === onlyObject.size) { // only countries
                // TODO - Changing this line to state to ensure the map always shows results
                //  before DEV-10520 is completed; For DEV-10520 change this back to country
                this.changeMapLayer("country");
            }
            else if (numStates === onlyObject.size) { // only states
                this.changeMapLayer("state");
            }
            else if (numCounties === onlyObject.size) { // only counties
                this.changeMapLayer("county");
            }
            else if (numCDs === onlyObject.size) { // only cds
                this.changeMapLayer("congressionalDistrict");
            }
            else if ((numCDs + numCounties) === onlyObject.size ||
                                       (numStates + numCDs) === onlyObject.size ||
                                       (numStates + numCounties) === onlyObject.size) {
                this.changeMapLayer("state");
            }
            else if (international === true) {
                // TODO - Changing this line to state to ensure the map always shows results
                //  before DEV-10520 is completed; For DEV-10520 change this back to country
                this.changeMapLayer("country");
            }
        }
        else if (this.props.reduxFilters[selectedLocationByType].size === 0) {
            this.changeMapLayer("state");
        }
    }
    updateMapScope() {
        if (this.props.reduxFilters.selectedLocations.size > 0) {
            this.mapScopeLogic('pop');
        }

        if (this.props.reduxFilters.selectedRecipientLocations.size > 0) {
            this.mapScopeLogic('recipient');
        }

        if (this.props.reduxFilters.selectedLocations.size === 0 && this.props.reduxFilters.selectedRecipientLocations.size > 0) {
            this.changeScope("recipient_location");
        }
    }
    render() {
        return (
            <GeoVisualizationSection
                {...this.state}
                noResults={this.state.data.values.length === 0}
                changeScope={this.changeScope}
                changeMapLayer={this.changeMapLayer}
                updateMapLegendToggle={this.updateMapLegendToggle}
                mapLegendToggle={this.props.mapLegendToggle}
                subaward={this.props.subaward}
                isDefCodeInFilter={this.props.reduxFilters?.defCodes?.counts}
                className={this.props.className} />
        );
    }
}

GeoVisualizationSectionContainer.propTypes = propTypes;
export default connect(
    (state) => ({
        reduxFilters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        subaward: state.searchView.subaward,
        mapLegendToggle: state.searchMapLegendToggle
    }),
    (dispatch) => ({
        ...bindActionCreators(Object.assign({}, searchFilterActions,
            { setAppliedFilterCompletion }, { updateMapLegendToggle }),
        dispatch)
    })
)(GeoVisualizationSectionContainer);
