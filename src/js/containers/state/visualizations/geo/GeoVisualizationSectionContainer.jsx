/**
 * GeoVisualizationSectionContainer.jsx
 * Created by Lizzie Salita 5/15/18
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isCancel } from 'axios';

import { convertFYToDateRange, getTrailingTwelveMonths } from "helpers/fiscalYearHelper";
import { performSpendingByGeographySearch } from "helpers/searchHelper";
import GeoVisualizationSection from 'components/state/visualizations/geo/GeoVisualizationSection';
import { cloneDeep } from "lodash-es";

const pluralize = (string) => {
    if (string[string.length - 1] === "y") {
        return `${string.slice(0, -1)}ies`;
    }
    return `${string}s`;
};

const apiScopes = {
    county: 'county',
    congressionalDistrict: 'district'
};

const GeoVisualizationSectionContainer = () => {
    const {
        fy, overview: stateInfo, center
    } = useSelector((state) => state.stateProfile);
    const { code } = stateInfo;
    const [mapLayer, setMapLayer] = useState('county');
    const [data, setData] = useState({
        values: [],
        locations: []
    });
    const [loading, setLoading] = useState(true);
    const [loadingTiles, setLoadingTiles] = useState(true);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useState({});
    const [selectedItemsDisplayNames, setSelectedItemsDisplayNames] = useState({
        agency: "",
        def_code: "",
        program_number: "",
        program_activity: ""
    });
    const [activeFilters, setActiveFilters] = useState({
        territory: "county",
        def_codes: 'all'
    });
    const request = useRef(null);
    const paramsRef = useRef({});

    const noResults = data.values.length === 0;

    const loadingTilesReady = useCallback(() => {
        setLoadingTiles(false);
    }, []);

    const getInitialApiParams = useCallback((params, year, state) => {
        // Create the time period filter
        let timePeriod = null;
        let dateRange = [];
        let newParams;

        if (year !== 'all') {
            if (year === 'latest') {
                dateRange = getTrailingTwelveMonths();
            }
            else {
                dateRange = convertFYToDateRange(parseInt(year, 10));
            }
            timePeriod = [
                {
                    start_date: dateRange[0],
                    end_date: dateRange[1]
                }
            ];
        }

        // if it has filters
        if (
            params?.scope === 'place_of_performance' &&
            params?.geo_layer.length > 0 &&
            year !== 'all'
        ) {
            newParams = params.filters;
        }
        else {
            newParams = {
                place_of_performance_locations: [
                    {
                        country: 'USA',
                        state
                    }
                ]
            };
        }

        if (timePeriod) {
            newParams.time_period = timePeriod;
        }

        // set initial search data and trigger data fetch
        setSearchParams({
            scope: 'place_of_performance',
            geo_layer: 'county',
            filters: newParams
        });
    }, []);

    useEffect(() => {
        // on mount, set apiParams and fetch data
        getInitialApiParams(paramsRef.current, fy, code);
    }, [code, fy, getInitialApiParams]);

    const parseData = useCallback((d) => {
        const spendingValues = [];
        const spendingShapes = [];
        const spendingLabels = {};

        d.results.forEach((item) => {
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

        setData({
            values: spendingValues,
            locations: spendingShapes,
            labels: spendingLabels
        });
        setLoading(false);
        setError(false);
    }, []);

    const fetchData = useCallback((params = null) => {
        if (request.current) {
            request.current.cancel();
        }

        setLoading(true);
        setError(false);

        request.current = performSpendingByGeographySearch(params);

        request.current.promise
            .then((res) => {
                parseData(res.data);
                request.current = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    request.current = null;

                    setLoading(false);
                    setError(true);
                }
            });
    }, [parseData]);

    useEffect(() => {
        if (loadingTiles) {
            // we can't measure visible entities if the tiles aren't loaded yet, so stop
            return;
        }

        fetchData(searchParams);
        paramsRef.current = searchParams;
    }, [searchParams, loadingTiles, fetchData]);

    const changeMapLayer = useCallback((layer) => {
        setMapLayer(layer);
        setLoadingTiles(true);
        setActiveFilters((prevState) => ({
            def_codes: prevState.def_codes,
            territory: layer
        }));
        setSearchParams((prevState) => ({ ...prevState, geo_layer: apiScopes[layer] }));
    }, []);

    // need to figure out how the time period change affects this
    const changeScope = useCallback((newSearch, filterType, displayName) => {
        const tempSearchData = cloneDeep(paramsRef.current);
        const filterTypePlural = pluralize(filterType);

        if (Object.prototype.hasOwnProperty.call(tempSearchData.filters, filterTypePlural)) {
            tempSearchData.filters[filterTypePlural] = newSearch.filters[filterTypePlural];
        }
        else {
            tempSearchData.filters[filterTypePlural] = [];
            tempSearchData.filters[filterTypePlural] = newSearch.filters[filterTypePlural];
        }

        setSearchParams(tempSearchData);
        setActiveFilters((prev) => ({
            ...prev,
            [filterTypePlural]: filterType === "agency" ?
                tempSearchData.filters[filterTypePlural][0].name :
                displayName[0]
        }));
        setSelectedItemsDisplayNames((prev) => ({
            ...prev,
            [filterType]: filterType === "agency" ?
                tempSearchData.filters[filterTypePlural][0].name :
                displayName
        }));
    }, []);

    const clearSearchFilters = useCallback((filterType) => {
        const tempSearchData = cloneDeep(paramsRef.current);
        const filterTypePlural = pluralize(filterType);

        delete tempSearchData.filters[filterTypePlural];

        setSearchParams(tempSearchData);

        setSelectedItemsDisplayNames((prevState) => ({
            ...prevState, [filterType]: ''
        }));

        if (filterType === "def_code") {
            setActiveFilters((prevState) => ({
                territory: prevState.territory,
                def_codes: "all"
            }));
        }
    }, []);

    return (
        <GeoVisualizationSection
            mapLayer={mapLayer}
            changeScope={changeScope}
            changeMapLayer={changeMapLayer}
            data={data}
            loading={loading}
            error={error}
            noResults={noResults}
            center={center}
            stateInfo={stateInfo}
            searchParams={searchParams}
            activeFilters={activeFilters}
            clearSearchFilters={clearSearchFilters}
            selectedItemsDisplayNames={selectedItemsDisplayNames}
            loadingTilesReady={loadingTilesReady} />
    );
};

export default GeoVisualizationSectionContainer;
