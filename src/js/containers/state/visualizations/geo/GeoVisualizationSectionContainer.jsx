/**
 * GeoVisualizationSectionContainer.jsx
 * Created by Lizzie Salita 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId } from 'lodash';

import GeoVisualizationSection from 'components/state/visualizations/geo/GeoVisualizationSection';

import * as SearchHelper from 'helpers/searchHelper';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import MapBroadcaster from 'helpers/mapBroadcaster';

const propTypes = {
    stateProfile: PropTypes.object,
    className: PropTypes.string
};

const apiScopes = {
    county: 'county',
    congressionalDistrict: 'district'
};

export class GeoVisualizationSectionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapLayer: 'county',
            program_numbers: "",
            agency: {},
            data: {
                values: [],
                locations: []
            },
            renderHash: `geo-${uniqueId()}`,
            loading: true,
            loadingTiles: true,
            error: false,
            searchData: {},
            selectedItemsDisplayNames: {
                agency: "",
                cfda: "",
                program_activity: ""
            }
        };

        this.apiRequest = null;

        this.mapListeners = [];
        this.className = "";
        this.changeMapLayer = this.changeMapLayer.bind(this);
        this.mapLoaded = this.mapLoaded.bind(this);
        this.prepareFetch = this.prepareFetch.bind(this);
        this.setMapData = this.setMapData.bind(this);
        this.changeScope = this.changeScope.bind(this);
        this.clearSearchFilters = this.clearSearchFilters.bind(this);
    }

    componentDidMount() {
        const measureListener = MapBroadcaster.on('mapReady', this.mapLoaded);
        this.mapListeners.push(measureListener);
        const movedListener = MapBroadcaster.on('mapMoved', this.prepareFetch);
        this.mapListeners.push(movedListener);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stateProfile.fy !== this.props.stateProfile.fy) {
            this.prepareFetch();
        }
        if (prevProps.stateProfile.id !== this.props.stateProfile.id) {
            if (this.state.mapLayer !== 'county') {
                // Reset the map layer
                this.changeMapLayer('county');
            }
            this.prepareFetch();
        }
    }

    componentWillUnmount() {
    // remove any broadcast listeners
        this.mapListeners.forEach((listenerRef) => {
            MapBroadcaster.off(listenerRef.event, listenerRef.id);
        });
    }

    setMapData(spendingValues, spendingShapes, spendingLabels) {
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

    // need to figure out how the time period change affects this
    changeScope(newSearch, filterType) {
        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        const tempSearchData = this.state.searchData;

        if (filterType === "agency") {
            if (Object.prototype.hasOwnProperty.call(tempSearchData.filters, "agencies")) {
                tempSearchData.filters.agencies = newSearch.filters.agencies;
            }
            else {
                tempSearchData.filters.agencies = [];
                tempSearchData.filters.agencies = newSearch.filters.agencies;
            }
        }

        if (filterType === "cfda") {
            if (Object.prototype.hasOwnProperty.call(tempSearchData.filters, "cfda")) {
                tempSearchData.filters.agencies = newSearch.filters.agencies;
            }
            else {
                tempSearchData.filters.agencies = [];
                tempSearchData.filters.agencies = newSearch.filters.agencies;
            }
        }

        this.apiRequest = SearchHelper.performSpendingByGeographySearch(tempSearchData);
        this.apiRequest.promise
            .then((res) => {
                this.setState((prevState) => ({
                    loading: false,
                    error: false,
                    searchData: tempSearchData,
                    selectedItemsDisplayNames: {
                        ...prevState.selectedItemsDisplayNames,
                        agency: tempSearchData.filters.agencies[0].name
                    }
                }), () => {
                    this.parseData(res.data);
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
                }
            });
    }

    clearSearchFilters() {
        this.setState((prevState) => ({
            selectedItemsDisplayNames: {
                ...prevState.selectedItemsDisplayNames,
                agency: ''
            },
            searchData: {
                ...prevState.searchData,
                filters: {
                    ...prevState.searchData.filters,
                    agencies: []
                }
            }
        }), () => {
            this.prepareFetch();
        });
    }

    fetchData() {
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
            scope: 'place_of_performance',
            geo_layer: apiScopes[this.state.mapLayer],
            filters: searchParams
        };

        this.setState({
            apiParams
        });

        //
        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        this.setState({
            loading: true,
            error: false,
            searchData: apiParams
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
    prepareFetch() {
        if (this.state.loadingTiles) {
            // we can't measure visible entities if the tiles aren't loaded yet, so stop
            return;
        }

        this.fetchData();
    }
    changeMapLayer(layer) {
        this.setState({
            mapLayer: layer,
            renderHash: `geo-${uniqueId()}`,
            loadingTiles: true
        }, () => {
            this.prepareFetch();
        });
    }

    render() {
        return (
            <GeoVisualizationSection
                {...this.state}
                stateCenter={this.props.stateProfile.center}
                stateInfo={this.props.stateProfile.overview}
                noResults={this.state.data.values.length === 0}
                changeScope={this.changeScope}
                changeMapLayer={this.changeMapLayer}
                clearSearchFilters={this.clearSearchFilters}
                className={this.props.className} />
        );
    }
}

GeoVisualizationSectionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        stateProfile: state.stateProfile
    })
)(GeoVisualizationSectionContainer);
