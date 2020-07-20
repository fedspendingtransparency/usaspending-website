/**
 * GeoVisualizationSectionContainer.jsx => MapContainer.jsx
 * Created by Kevin Li 2/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId, keyBy, isEqual } from 'lodash';
import MapWrapper from 'components/covid19/recipient/map/MapWrapper';
// import * as SearchHelper from 'helpers/searchHelper';
import AwardFilterButtons from 'components/covid19/recipient/map/AwardFilterButtons';
import MapBroadcaster from 'helpers/mapBroadcaster';
import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapMessage from 'components/search/visualizations/geo/MapMessage';
import GeoVisualizationTooltip from 'components/search/visualizations/geo/GeoVisualizationTooltip';
import {
    centerOfMap,
    // apiScopes,
    awardTypeFilters,
    filters,
    logMapLayerEvent,
    logMapScopeEvent,
    filtersOnClickHandler
} from 'dataMapping/covid19/recipient/map/map';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { fetchRecipientSpendingByGeography } from 'helpers/disasterHelper';
import SummaryInsightsContainer from '../SummaryInsightsContainer';

const propTypes = {
    defCodes: PropTypes.array
};

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rawAPIData: [],
            data: {
                labels: {},
                values: [],
                locations: []
            },
            scope: 'state',
            activeFilters: {
                territory: 'state',
                spendingType: 'obligation',
                amountType: 'totalSpending',
                recipientType: 'all',
                awardType: 'all'
            },
            selectedItem: {},
            subAward: false,
            visibleEntities: [],
            showHover: false,
            renderHash: `geo-${uniqueId()}`,
            loading: true,
            loadingTiles: true,
            error: false
        };

        this.apiRequest = null;

        this.mapListeners = [];
    }

    componentDidMount() {
        const doneListener = MapBroadcaster.on('mapMeasureDone', this.receivedEntities);
        this.mapListeners.push(doneListener);
        const measureListener = MapBroadcaster.on('mapReady', this.mapLoaded);
        this.mapListeners.push(measureListener);
        const movedListener = MapBroadcaster.on('mapMoved', this.prepareFetch);
        this.mapListeners.push(movedListener);

        // log the initial event
        logMapLayerEvent(this.state.activeFilters.territory);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.defCodes, this.props.defCodes)) this.prepareFetch(true);
    }

    componentWillUnmount() {
        // remove any broadcast listeners
        this.mapListeners.forEach((listenerRef) => {
            MapBroadcaster.off(listenerRef.event, listenerRef.id);
        });
    }

    updateAmountTypeFilter = (value) => {
        this.setState(
            (currentState) => ({
                activeFilters: Object.assign(currentState.activeFilters, { amountType: value }),
                data: Object.assign({}, this.valuesLocationsLabelsFromAPIData()),
                renderHash: `geo-${uniqueId()}`
            }),
            () => this.prepareFetch(true)
        );
    }

    updateTerritoryFilter = (value) => {
        this.setState(
            (currentState) => ({
                activeFilters: Object.assign(
                    currentState.activeFilters, { territory: value }
                ),
                scope: value,
                renderHash: `geo-${uniqueId()}`,
                loadingTiles: true
            }),
            () => this.prepareFetch(true)
        );
    }
    updateSpendingTypeFilter = (value) => {
        this.setState(
            (currentState) => ({
                activeFilters: Object.assign(
                    currentState.activeFilters, { spendingType: value }
                )
            }),
            () => this.prepareFetch(true)
        );
    }
    updateRecipientTypeFilter = (value) => {
        this.setState(
            (currentState) => ({
                activeFilters: Object.assign(
                    currentState.activeFilters, { recipientType: value }
                )
            }),
            () => this.prepareFetch(true)
        );
    }
    updateAwardTypeFilter = (value) => {
        this.setState(
            (currentState) => ({
                activeFilters: Object.assign(
                    currentState.activeFilters, { awardType: value }
                )
            }),
            () => this.prepareFetch(true)
        );
    }

    mapLoaded = () => {
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

    prepareFetch = (forced = false) => {
        if (this.state.loadingTiles) {
            // we can't measure visible entities if the tiles aren't loaded yet, so stop
            return;
        }

        MapBroadcaster.emit('measureMap', forced);
    }

    compareEntities = (entities) => {
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

    receivedEntities = (entities, forced) => {
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

    fetchData = () => {
        const {
            visibleEntities,
            activeFilters
        } = this.state;
        // if no entities are visible, don't make an API rquest because nothing in the US is visible
        if (visibleEntities.length === 0) {
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
        // COVID-19 API Params
        const covidParams = {
            filter: {
                def_codes: this.props.defCodes.map((code) => code.code)
            },
            geo_layer: activeFilters.territory,
            geo_layer_filters: visibleEntities,
            spending_type: activeFilters.spendingType
            // TODO - uncomment this when filter is ready
            // recipient_type: recipientTypeGroups[activeFilters.recipientType],
        };
        // add specific award types
        if (activeFilters.awardType !== 'all') {
            covidParams.filter.award_type_codes = awardTypeGroups[activeFilters.awardType];
        }

        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });
        if (!this.props.defCodes.length) return;
        this.apiRequest = fetchRecipientSpendingByGeography(covidParams);

        // this.apiRequest = SearchHelper.performSpendingByGeographySearch(apiParams);
        this.apiRequest.promise
            .then((res) => {
                this.apiRequest = null;
                this.setState({ rawAPIData: res.data.results }, this.parseData);
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

    amountTypeKey = () => (this.state.activeFilters.amountType === 'totalSpending' ? 'amount' : 'per_capita');

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
                values.push(parseFloat(item[this.amountTypeKey()]));
                labels[item.shape_code] = {
                    label: item.display_name,
                    value: parseFloat(item[this.amountTypeKey()])
                };
            }
        });
        return { values, locations, labels };
    }

    parseData = () => {
        this.setState({
            data: this.valuesLocationsLabelsFromAPIData(),
            renderHash: `geo-${uniqueId()}`,
            loading: false,
            error: false
        });
    }

    showTooltip = (geoId, position) => {
        // convert state code to full string name
        const label = this.state.data.labels[geoId];
        this.setState({
            showHover: true,
            selectedItem: {
                label: label.label,
                value: label.value,
                x: position.x,
                y: position.y
            }
        });
    }

    hideTooltip = () => {
        this.setState({
            showHover: false,
            selectedItem: {}
        });
    }

    addOnClickToFilters = () => Object.keys(filters).reduce((acc, filter) => {
        const filterWithOnClick = {
            ...filters[filter],
            onClick: this[filtersOnClickHandler[filter]]
        };
        acc[filter] = filterWithOnClick;
        return acc;
    }, {});

    render() {
        let message = null;
        if (this.state.loading) {
            message = (
                <MapMessage>
                    <div className="map-loading">
                        <LoadingSpinner />
                        <div className="loading-message">
                            Gathering your data...
                        </div>
                    </div>
                </MapMessage>
            );
        }
        else if (this.state.error.error) {
            message = (
                <MapMessage>
                    <div className="map-no-results">
                        <div className="error-icon">
                            <FontAwesomeIcon icon="exclamation-triangle" />
                        </div>
                        <div className="title">
                            An error occurred.
                        </div>
                        <div className="description">
                            {this.state.error.message}
                        </div>
                    </div>
                </MapMessage>
            );
        }
        else if (this.state.data.values.length === 0) {
            message = (
                <MapMessage>
                    <div className="map-no-results">
                        <div className="no-results-icon" />
                        <div className="title">
                            No results found in the current map area.
                        </div>
                    </div>
                </MapMessage>
            );
        }

        return (
            <div
                className="results-visualization-geo-section"
                id="results-section-geo"
                aria-label="Spending by Geography">
                <AwardFilterButtons
                    onClick={this.updateAwardTypeFilter}
                    filters={awardTypeFilters}
                    activeAwardTypeFilter={this.state.activeFilters.awardType}
                    activeSpendingTypeFilter={this.state.activeFilters.spendingType} />
                <SummaryInsightsContainer activeFilter={this.state.activeFilters.awardType} />
                <MapWrapper
                    data={this.state.data}
                    scope={this.state.scope}
                    renderHash={this.state.renderHash}
                    awardTypeFilters={awardTypeFilters}
                    showHover={this.state.showHover}
                    activeFilters={this.state.activeFilters}
                    filters={this.addOnClickToFilters()}
                    selectedItem={this.state.selectedItem}
                    showTooltip={this.showTooltip}
                    hideTooltip={this.hideTooltip}
                    tooltip={GeoVisualizationTooltip}
                    center={centerOfMap}>
                    {message}
                </MapWrapper>
            </div>
        );
    }
}

MapContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        defCodes: state.covid19.defCodes
    })
)(MapContainer);
