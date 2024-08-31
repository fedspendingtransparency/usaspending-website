/**
* StateAgencyList.jsx
* Created by Nick Torres 8/12/2024
**/

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { filter, sortBy, slice, concat, uniqueId } from 'lodash';
import { Search } from 'js-search';
import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';
import * as SearchHelper from 'helpers/searchHelper';

const propTypes = {
    toggleAgency: PropTypes.func,
    placeHolder: PropTypes.string,
    selectedAgency: PropTypes.string
};

const StateAgencyList = (props) => {
    const [agencySearchString, setAgencySearchString] = useState('');
    // const [autocompleteType, setAutocompleteType] = useState('');
    const [autocompleteAgencies, setAutocompleteAgencies] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // const [data, setData] = useState({
    //     values: [],
    //     locations: []
    // });
    // const [renderHash, setRenderHash] = useState(`geo-${uniqueId()}`);
    const [agencyInput, setAgencyInput] = useState('');
    const [searchFilter, setSearchFilter] = useState({});

    let apiRequest = null;
    let timeout = null;
    let agencySearchRequest = null;
    const input = useRef(null);

    const parseAutocompleteAgencies = (results) => {
        let agencies = [];
        setNoResults(false);

        // Format results of search for use in Autocomplete component
        if (results) {
            results.forEach((item) => {
                let subAbbreviation = '';
                let topAbbreviation = '';
                if (item.subtier_agency.abbreviation) {
                    subAbbreviation = `(${item.subtier_agency.abbreviation})`;
                }
                if (item.toptier_agency.abbreviation) {
                    topAbbreviation = `(${item.toptier_agency.abbreviation})`;
                }

                // Only push items if they are not in selectedAgencies
                if (item.toptier_flag) {
                    if (props.selectedAgencies.size === 0
                        || !props.selectedAgencies.has(`${item.id}_toptier`)) {
                        agencies.push({
                            title: `${item.subtier_agency.name} ${topAbbreviation}`,
                            data: Object.assign({}, item, {
                                agencyType: 'toptier'
                            })
                        });
                    }
                }
                else if (props.selectedAgencies.size === 0
                    || !props.selectedAgencies.has(`${item.id}_subtier`)) {
                    agencies.push({
                        title: `${item.subtier_agency.name} ${subAbbreviation}`,
                        subtitle: `Sub-Agency of ${item.toptier_agency.name} ${topAbbreviation}`,
                        data: Object.assign({}, item, {
                            agencyType: 'subtier'
                        })
                    });
                }
            });

            if (agencies.length === 0) {
                setNoResults(true);
            }
        }

        // For searches for FEMA, leave the results in the same order as the API response
        if ((agencySearchString.toLowerCase() !== 'fem') && (agencySearchString.toLowerCase() !== 'fema')) {
            // Separate top and subtier agencies
            let toptierAgencies = filter(agencies, ['data.agencyType', 'toptier']);
            let subtierAgencies = filter(agencies, ['data.agencyType', 'subtier']);

            // Sort individual groups alphabetically
            toptierAgencies = sortBy(toptierAgencies, 'title');
            subtierAgencies = sortBy(subtierAgencies, 'title');

            agencies = slice(concat(toptierAgencies, subtierAgencies), 0, 10);
        }

        setNoResults(noResults);
        console.log("agencies", agencies);
        setAutocompleteAgencies(agencies);
    };

    const performSecondarySearch = (data) => {
        if ((agencySearchString.toLowerCase() === 'fem') || (agencySearchString.toLowerCase() === 'fema')) {
            // don't change the order of results returned from the API
            parseAutocompleteAgencies(slice(data, 0, 10));
        }

        else {
            // search within the returned data
            // create a search index with the API response records
            const search = new Search('id');
            search.addIndex(['toptier_agency', 'name']);
            search.addIndex(['subtier_agency', 'name']);
            search.addIndex(['toptier_agency', 'abbreviation']);
            search.addIndex(['subtier_agency', 'abbreviation']);

            // add the API response as the data source to search within
            search.addDocuments(data);

            // use the JS search library to search within the records
            const results = search.search(agencySearchString);

            const toptier = [];
            const subtier = [];

            // re-group the responses by top tier and subtier
            results.forEach((item) => {
                if (item.toptier_flag) {
                    toptier.push(item);
                }
                else {
                    subtier.push(item);
                }
            });

            // combine the two arrays and limit it to 10
            const improvedResults = slice(concat(toptier, subtier), 0, 10);

            // Add search results to Redux
            parseAutocompleteAgencies(improvedResults);
        }
    };

    const queryAutocompleteAgencies = (inputVal) => {
        setNoResults(false);

        // Only search if search is 2 or more characters
        if (inputVal.length >= 3) {
            setAgencySearchString(inputVal);


            if (agencySearchRequest) {
                // A request is currently in-flight, cancel it
                agencySearchRequest.cancel();
            }

            const agencySearchParams = {
                search_text: inputVal,
                limit: 20
            };

            agencySearchRequest = SearchHelper.fetchAwardingAgencies(agencySearchParams);

            agencySearchRequest.promise
                .then((res) => {
                    console.log("response", res);
                    performSecondarySearch(res.data.results);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        setNoResults(true);
                    }
                });
        }
        else if (agencySearchRequest) {
            // A request is currently in-flight, cancel it
            agencySearchRequest.cancel();
        }
    };


    const clearAutocompleteSuggestions = () => {
        setAutocompleteAgencies([]);
    };

    const handleTextInput = (inputEvent) => {
    // Clear existing agencies to ensure user can't select an old or existing one
        if (autocompleteAgencies.length > 0) {
            setAutocompleteAgencies([]);

        }
        const inputVal = inputEvent.target.value;

        // Grab input, clear any exiting timeout
        window.clearTimeout(timeout);

        // Perform search if user doesn't type again for 300ms
        timeout = window.setTimeout(() => {
            queryAutocompleteAgencies(inputVal);
        }, 300);
    };

    const selectAgency = (agency, valid) => {
        // Pass selected agency to parent selectAgency method, adding agencyType to method call
        props.toggleAgency(agency, valid, props.agencyType);

        // apply staged awarding agency filter here
        const newSearch = props.searchData;
        newSearch.filters.agencies = [];
        newSearch.filters.agencies.push(
            {
                name: valid.data.toptier_agency.name,
                tier: valid.data.agencyType,
                type: "awarding"
            }
        );
        setSearchFilter(newSearch);
        setAgencyInput(valid.data.toptier_agency.name);
        // Clear Autocomplete results
        setAutocompleteAgencies([]);
    };

    // const parseData = () => {
    //     const spendingValues = [];
    //     const spendingShapes = [];
    //     const spendingLabels = {};
    //
    //     data.results.forEach((item) => {
    //         // state must not be null or empty string
    //         if (item.shape_code && item.shape_code !== '') {
    //             spendingShapes.push(item.shape_code);
    //             spendingValues.push(parseFloat(item.aggregated_amount));
    //             spendingLabels[item.shape_code] = {
    //                 label: item.display_name,
    //                 value: parseFloat(item.aggregated_amount)
    //             };
    //         }
    //     });
    //
    //     props.setMapData(spendingValues, spendingShapes, spendingLabels);
    // };

    const getMapData = (newSearch) => {
        // generate the API parameters
        if (apiRequest) {
            apiRequest.cancel();
        }

        setLoading(true);
        setError(false);

        apiRequest = SearchHelper.performSpendingByGeographySearch(newSearch);
        apiRequest.promise
            .then((res) => {
                props.changeScope(res.data, newSearch);
                apiRequest = null;
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    apiRequest = null;

                    setLoading(false);
                    setError(true);
                }
            });
    };

    useEffect(() => {
        const inputBox = document.getElementById("state__agency-id");
        inputBox.value = agencyInput;
        getMapData(searchFilter);
    }, [searchFilter]);

    return (
        <Autocomplete
            {...props}
            id="state__agency-id"
            values={autocompleteAgencies}
            handleTextInput={handleTextInput}
            onSelect={selectAgency}
            placeholder={props.placeHolder !== '' ? props.placeHolder : `${props.agencyType} Agency`}
            ref={input}
            label={`${props.agencyType} Agency`}
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            retainValue />
    );
};

StateAgencyList.propTypes = propTypes;
export default StateAgencyList;
