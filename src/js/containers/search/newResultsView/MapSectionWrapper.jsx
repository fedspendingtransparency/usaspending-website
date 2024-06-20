import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { uniqueId, keyBy } from 'lodash';
import { stateCenterFromFips, performCountryGeocode, stateNameFromCode } from 'helpers/mapHelper';
import { stateFIPSByAbbreviation, stateNameFromFips } from 'dataMapping/state/stateNames';

import GeoVisualizationSection from 'components/search/visualizations/geo/GeoVisualizationSection';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';
import { updateMapLegendToggle } from 'redux/actions/search/mapLegendToggleActions';

import MapBroadcaster from 'helpers/mapBroadcaster';
import Analytics from 'helpers/analytics/Analytics';
import { performSpendingByGeographySearch } from 'apis/search';

import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import SearchSectionWrapper from "../../../components/search/newResultsView/SearchSectionWrapper";
import * as MoneyFormatter from "../../../helpers/moneyFormatter";

const propTypes = {
    reduxFilters: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    subaward: PropTypes.bool,
    mapLegendToggle: PropTypes.string,
    updateMapLegendToggle: PropTypes.func,
    className: PropTypes.string,
    scope: PropTypes.string,
    setScope: PropTypes.func,
    wrapperProps: PropTypes.object
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


const MapSectionWrapper = React.memo((props) => {
    const USACenterPoint = [-95.569430, 38.852892];

    const [mapLayer, setMapLayer] = useState('state');
    const [rawAPIData, setRawAPIData] = useState([]);
    const [data, setData] = useState({
        values: [],
        locations: []
    });
    const [visibleEntities, setVisibleEntities] = useState([]);
    const [renderHash, setRenderHash] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingTiles, setLoadingTiles] = useState(true);
    const [error, setError] = useState(false);
    const [noData, setNoData] = useState(false);
    const [center, setCenter] = useState(USACenterPoint);
    const [singleLocationSelected, setSingleLocationSelected] = useState({});
    const [tableData, setTableData] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc');
    const [activeField, setActiveField] = useState('aggregated_amount');
    const [wrapperScreens, setWrapperScreens] = useState({
        wrapperLoading: false,
        wrapperError: false,
        wrapperNoData: false
    });

    const [mapViewType, setMapViewType] = useState('chart');
    let apiRequest = null;
    const mapListeners = [];

    // this ref as been added to stop the related useEffect triggering on initial render
    const useEffectRef = React.useRef({
        visibleEntities: false,
        rawAPIData: false,
        loadingTiles: true
    });

    const mapToggleDataKey = () => (props.mapLegendToggle === 'totalSpending' ? 'aggregated_amount' : 'per_capita');

    /**
     * valuesLocationsLabelsFromAPIData
     * - creates locations, values, and labels for the map visualization from api data
     * @returns {Object} - object with locations, values and labels properties
     */
    const valuesLocationsLabelsFromAPIData = () => {
        const values = [];
        const locations = [];
        const labels = {};
        const rows = [];

        rawAPIData.forEach((item) => {
            // state must not be null or empty string
            if (item.shape_code && item.shape_code !== '') {
                locations.push(item.shape_code);
                values.push(parseFloat(item[mapToggleDataKey()]));
                labels[item.shape_code] = {
                    label: item.display_name,
                    value: parseFloat(item[mapToggleDataKey()])
                };

                // for new search table
                const row = [];
                const stateCheck = item.shape_code.length < 3;
                const congressionalDistrictCheck = item.display_name.substring(2, 3) === "-";
                const countyCheck = parseInt(item.shape_code, 10);

                if (stateCheck) {
                    row.state_territory = item.display_name;
                }
                else if (congressionalDistrictCheck) {
                    row.d_district = item.display_name;
                    row.state_territory = stateNameFromCode(item.display_name.substring(0, 2));
                }
                else if (countyCheck) {
                    row.county = item.display_name;
                    row.state_territory = stateNameFromFips(item.shape_code.substring(0, 2));
                }
                else {
                    row.country = item.display_name;
                }
                row.obligations = item.aggregated_amount;
                row.per_capita = item.per_capita;

                rows.push(row);
            }
        });

        setTableData(rows);

        return { values, locations, labels };
    };

    const setParsedData = () => {
        props.setAppliedFilterCompletion(true);

        setData(valuesLocationsLabelsFromAPIData());
        setRenderHash(`geo-${uniqueId()}`);
        setLoading(false);
        setError(false);
    };

    const prepareFetch = (forced = false) => {
        if (useEffectRef.current?.loadingTiles) {
            // we can't measure visible entities if the tiles aren't loaded yet, so stop
            return;
        }

        MapBroadcaster.emit('measureMap', forced);
    };

    const mapLoaded = () => {
        setLoadingTiles(false);
        useEffectRef.current.loadingTiles = false;
    };

    const compareEntities = (entities) => {
        // check if the inbound list of entities is different from the existing visible entities
        const current = keyBy(visibleEntities);
        const inbound = keyBy(entities);

        for (const entity of entities) {
            if (!current[entity]) {
                // new entity entered view
                return true;
            }
        }

        for (const entity of visibleEntities) {
            if (!inbound[entity]) {
                // old entity exited view
                return true;
            }
        }

        return false;
    };

    const fetchData = () => {
        // build a new search operation from the Redux state, but create a transaction-based search
        // operation instead of an award-based one
        const operation = new SearchAwardsOperation();
        operation.fromState(props.reduxFilters);

        // if no entities are visible, don't make an API request because nothing in the US is visible
        if (visibleEntities.length === 0) {
            setLoading(false);
            setError(false);
            setData({
                values: [],
                locations: []
            });
            setNoData(true);

            return;
        }

        // if subawards is true, newAwardsOnly cannot be true, so we remove
        // dateType for this request
        if (props.subaward && operation.dateType) {
            delete operation.dateType;
        }

        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            scope: props.scope,
            geo_layer: apiScopes[mapLayer],
            geo_layer_filters: visibleEntities,
            filters: searchParams,
            subawards: props.subaward,
            auditTrail: 'Map Visualization'
        };

        if (apiRequest) {
            apiRequest.cancel();
        }

        setLoading(true);
        setError(false);

        props.setAppliedFilterCompletion(false);
        apiRequest = performSpendingByGeographySearch(apiParams);
        apiRequest.promise
            .then((res) => {
                apiRequest = null;
                useEffectRef.current.rawAPIData = true;
                setRawAPIData(res.data.results);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    apiRequest = null;

                    setLoading(false);
                    setError(true);

                    props.setAppliedFilterCompletion(true);
                }
            });
    };

    const receivedEntities = (entities, forced) => {
        if (!forced) {
            // only check if the returned entities list has changed if this is not a forced update
            const changed = compareEntities(entities);
            if (!changed) {
                // nothing changed
                return;
            }
        }

        useEffectRef.current.visibleEntities = true;
        setVisibleEntities(entities);
    };

    /**
     * handleMapLegendToggleChange
     * - updates data values property and label value properties to respective spending total
     * @returns {null}
     */
    const handleMapLegendToggleChange = () => {
        setData(Object.assign({}, valuesLocationsLabelsFromAPIData()));
        setRenderHash(`geo-${uniqueId()}`);
    };

    const changeScope = (newScope) => {
        if (newScope === props.scope) {
            // scope has not changed
            return;
        }

        props.setScope(newScope);
    };

    const changeMapLayer = (layer) => {
        setMapLayer(layer);
        setRenderHash(`geo-${uniqueId()}`);
        setLoadingTiles(true);
        useEffectRef.current.loadingTiles = true;


        logMapLayerEvent(layer);
    };

    const calculateCenterPoint = (location) => {
        if (location) {
            let locationRequest = performCountryGeocode(location);
            locationRequest.promise
                .then((res) => {
                    setCenter(res.data?.features[0]?.center ? res.data?.features[0]?.center : USACenterPoint);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        console.log(err);
                        locationRequest = null;
                    }
                });
        }
        else {
            setCenter(USACenterPoint);
        }
    };

    const mapScopeLogic = (type) => {
        const selectedLocationByType = type === "pop" ? "selectedLocations" : "selectedRecipientLocations";
        // there is only 1 item, place of performance
        if (props.reduxFilters[selectedLocationByType].size === 1) {
            const onlyObject = props.reduxFilters[selectedLocationByType].first().filter;
            setSingleLocationSelected(onlyObject);
            if (onlyObject.district_current || onlyObject.district_original) {
                changeMapLayer("congressionalDistrict");
                setCenter(stateCenterFromFips(stateFIPSByAbbreviation[onlyObject.state]));
            }
            else if (onlyObject.county) {
                changeMapLayer("county");
                setCenter(stateCenterFromFips(stateFIPSByAbbreviation[onlyObject.state]));
            }
            else if (onlyObject.state) {
                // do not change the map layer, it is already state
                setCenter(stateCenterFromFips(stateFIPSByAbbreviation[onlyObject.state]));
            }
            else if (onlyObject.country !== "USA") {
                changeMapLayer("country");
                calculateCenterPoint(onlyObject.country);
            }
            // defaults to state
        }
        else if (props.reduxFilters[selectedLocationByType].size > 1) {
            const onlyObject = props.reduxFilters[selectedLocationByType];
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
                changeMapLayer("country");
            }
            else if (numStates === onlyObject.size) { // only states
                changeMapLayer("state");
            }
            else if (numCounties === onlyObject.size) { // only counties
                changeMapLayer("county");
            }
            else if (numCDs === onlyObject.size) { // only cds
                changeMapLayer("congressionalDistrict");
            }
            else if ((numCDs + numCounties) === onlyObject.size ||
                (numStates + numCDs) === onlyObject.size ||
                (numStates + numCounties) === onlyObject.size) {
                changeMapLayer("state");
            }
            else if (international === true) {
                changeMapLayer("country");
            }
        }
        else if (props.reduxFilters[selectedLocationByType].size === 0) {
            changeMapLayer("state");
        }
    };

    const updateMapScope = () => {
        if (props.reduxFilters.selectedLocations.size > 0) {
            mapScopeLogic('pop');
        }

        if (props.reduxFilters.selectedRecipientLocations.size > 0) {
            mapScopeLogic('recipient');
        }

        if (props.reduxFilters.selectedLocations.size === 0 && props.reduxFilters.selectedRecipientLocations.size > 0) {
            changeScope("recipient_location");
        }
    };

    const standardColumns = [
        {
            title: "obligations",
            displayName: ["Obligations"],
            right: true
        },
        {
            title: "per_capita",
            displayName: ["Per Capita Obligations"],
            right: true
        }
    ];

    const columns = {
        state: [
            {
                title: "state_territory",
                displayName: ["State or Territory"],
                right: false
            },
            ...standardColumns
        ],
        country: [
            {
                title: "country",
                displayName: ["Country"],
                right: false
            },
            ...standardColumns
        ],
        county: [
            {
                title: 'county',
                displayName: ["County"],
                right: false
            },
            {
                title: "state_territory",
                displayName: ["State or Territory"],
                right: false
            },
            ...standardColumns
        ],
        congressionalDistrict: [
            {
                title: "congressional_district",
                displayName: ["Congressional District"],
                right: false
            },
            {
                title: "state_territory",
                displayName: ["State or Territory"],
                right: false
            },
            ...standardColumns
        ]
    };

    const createTableRows = (rows) => {
        const rowsArray = [];
        rows.forEach((row) => {
            const rowArray = [];
            Object.keys(row).forEach((key) => {
                if (key === 'obligations' || key === 'per_capita') {
                    rowArray.push(MoneyFormatter.formatMoneyWithPrecision(row[key], 0));
                }
                else {
                    rowArray.push(row[key]);
                }
            });
            rowsArray.push(rowArray);
        });
        setTableRows(rowsArray);
    };

    const sortBy = (field, direction) => {
        const updatedTable = [...tableData];
        if (direction === 'asc') {
            updatedTable.sort((a, b) => {
                if (a[field] < b[field]) {
                    return -1;
                }
                if (a[field] > b[field]) {
                    return 1;
                }
                return 0;
            });
        }
        else if (direction === 'desc') {
            updatedTable.sort((a, b) => {
                if (a[field] < b[field]) {
                    return 1;
                }
                if (a[field] > b[field]) {
                    return -1;
                }
                return 0;
            });
        }

        setSortDirection(direction);
        setActiveField(field);
        createTableRows(updatedTable);
    };

    useEffect(() => {
        const doneListener = MapBroadcaster.on('mapMeasureDone', receivedEntities);
        mapListeners.push(doneListener);

        const measureListener = MapBroadcaster.on('mapReady', mapLoaded);
        mapListeners.push(measureListener);

        const movedListener = MapBroadcaster.on('mapMoved', prepareFetch);
        mapListeners.push(movedListener);

        updateMapScope();

        // log the initial event
        logMapScopeEvent(props.scope);
        logMapLayerEvent(mapLayer);

        return () => {
            // remove any broadcast listeners
            mapListeners.forEach((listenerRef) => {
                MapBroadcaster.off(listenerRef.event, listenerRef.id);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!props.noApplied && mapViewType === 'chart') {
            prepareFetch(true);
            updateMapScope();
        }
        else if (!props.noApplied && mapViewType === 'table') {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.reduxFilters, props.subaward, mapViewType, props.wrapperProps.selectedDropdownOption]);

    useEffect(() => {
        handleMapLegendToggleChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.mapLegendToggle]);

    useEffect(() => {
        if (useEffectRef.current.visibleEntities) {
            fetchData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibleEntities]);

    useEffect(() => {
        if (useEffectRef.current.rawAPIData) {
            setParsedData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rawAPIData]);

    useEffect(() => {
        prepareFetch(true);
        logMapScopeEvent(props.scope);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.scope]);

    useEffect(() => {
        prepareFetch(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapLayer, loadingTiles]);

    useEffect(() => {
        sortBy("obligations", "desc");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableData]);

    useEffect(() => {
        if (mapViewType === 'chart') {
            setWrapperScreens({
                wrapperLoading: false,
                wrapperError: false,
                wrapperNoData: false
            });
        }
        else if (mapViewType === 'table') {
            setWrapperScreens({
                wrapperLoading: true,
                wrapperError: true,
                wrapperNoData: true
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapViewType]);

    return (
        <SearchSectionWrapper
            {...props.wrapperProps}
            isLoading={wrapperScreens.wrapperLoading ? loading : false}
            isError={wrapperScreens.wrapperError ? error : false}
            hasNoData={wrapperScreens.wrapperNoData ? noData : false}
            rows={tableRows}
            columns={columns[mapLayer]}
            sectionName="map"
            sortBy={sortBy}
            sortDirection={sortDirection}
            activeField={activeField}
            mapViewType={mapViewType}
            setMapViewType={setMapViewType} >
            <GeoVisualizationSection
                scope={props.scope}
                mapLayer={mapLayer}
                changeScope={changeScope}
                changeMapLayer={changeMapLayer}
                renderHash={renderHash}
                data={data}
                loading={loading}
                error={error}
                center={center}
                noResults={data.values.length === 0}
                mapLegendToggle={props.mapLegendToggle}
                updateMapLegendToggle={props.updateMapLegendToggle}
                subaward={props.subaward}
                className={props.className}
                isDefCodeInFilter={props.reduxFilters?.defCodes?.counts}
                singleLocationSelected={singleLocationSelected}
                newAdvancedSearch />
        </SearchSectionWrapper>
    );
});

MapSectionWrapper.propTypes = propTypes;

export default connect((state) => ({
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
)(MapSectionWrapper);
