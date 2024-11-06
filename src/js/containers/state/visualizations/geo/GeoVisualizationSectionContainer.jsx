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
                def_code: "",
                program_number: "",
                program_activity: ""
            },
            activeFilters: {
                territory: "county",
                def_codes: 'all'
            }
        };

        this.apiRequest = null;

        this.mapListeners = [];
        this.className = "";
        this.changeMapLayer = this.changeMapLayer.bind(this);
        this.mapLoaded = this.mapLoaded.bind(this);
        this.prepareFetch = this.prepareFetch.bind(this);
        this.pluralize = this.pluralize.bind(this);
        this.changeScope = this.changeScope.bind(this);
        this.hasFilters = this.hasFilters.bind(this);
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

    // need to figure out how the time period change affects this
    changeScope(newSearch, filterType, displayName) {
        if (this.apiRequest) {
            this.apiRequest.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        const tempSearchData = this.state.searchData;
        const filterTypePlural = this.pluralize(filterType);
        if (Object.prototype.hasOwnProperty.call(tempSearchData.filters, filterTypePlural)) {
            tempSearchData.filters[filterTypePlural] = newSearch.filters[filterTypePlural];
        }
        else {
            tempSearchData.filters[filterTypePlural] = [];
            tempSearchData.filters[filterTypePlural] = newSearch.filters[filterTypePlural];
        }

        this.apiRequest = SearchHelper.performSpendingByGeographySearch(tempSearchData);

        this.apiRequest.promise
            .then((res) => {
                this.setState((prevState) => ({
                    loading: false,
                    error: false,
                    searchData: tempSearchData,
                    activeFilters: {
                        ...prevState.activeFilters,
                        [filterTypePlural]: filterType === "agency" ? tempSearchData.filters[filterTypePlural][0].name : displayName[0]
                    },
                    selectedItemsDisplayNames: {
                        ...prevState.selectedItemsDisplayNames,
                        [filterType]: filterType === "agency" ? tempSearchData.filters[filterTypePlural][0].name : displayName
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

    clearSearchFilters(filterType) {
        const filterTypePlural = this.pluralize(filterType);
        const previousSelection = this.state.selectedItemsDisplayNames[filterType];
        this.setState((prevState) => {
            const newState = { ...prevState };
            newState
                .selectedItemsDisplayNames[filterType] = '';
            if (filterType === "def_code") {
                newState.activeFilters.def_codes = "all";
            }
            delete newState.searchData.filters[filterTypePlural];
            return (newState);
        }, () => {
            if (previousSelection.length > 0) {
                this.prepareFetch();
            }
        });
    }

    hasFilters() {
        return (this.state.searchData?.scope === 'place_of_performance' && this.state.searchData?.geo_layer.length > 0);
    }

    pluralize(string) {
        if (string[string.length - 1] === "y") {
            return `${string.slice(0, -1)}ies`;
        }
        return `${string}s`;
    }

    fetchData() {
    // Create the time period filter
        let timePeriod = null;
        const fy = this.props.stateProfile.fy;
        let dateRange = [];
        let searchParams;

        if (fy !== 'all') {
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


        if (this.hasFilters() && fy !== 'all') {
            searchParams = this.state.searchData.filters;
        }
        else {
            searchParams = {
                place_of_performance_locations: [
                    {
                        country: 'USA',
                        state: this.props.stateProfile.overview.code
                    }
                ]
            };
        }

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
            searchData: apiParams
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
        this.setState((prevState) => ({
            mapLayer: layer,
            renderHash: `geo-${uniqueId()}`,
            loadingTiles: true,
            activeFilters: {
                ...prevState.activeFilters,
                territory: layer
            }
        }), () => {
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
