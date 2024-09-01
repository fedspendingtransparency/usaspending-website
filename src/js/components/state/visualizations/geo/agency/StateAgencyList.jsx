/**
* StateAgencyList.jsx
* Created by Nick Torres 8/12/2024
**/

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { filter, sortBy, slice, concat } from 'lodash';
import { Search } from 'js-search';
import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';
import * as SearchHelper from 'helpers/searchHelper';

const propTypes = {
    toggleAgency: PropTypes.func,
    placeHolder: PropTypes.string,
    selectedAgency: PropTypes.string
};

const StateAgencyList = React.memo((props) => {
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
    const [searchData, setSearchData] = useState({});
    const [selectedItem, setSelectedItem] = useState('');

    let timeout = null;
    let apiRequest = null;
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
                    // if (props.selectedAgency.size === 0
                    //     || !props.selectedAgency.has(`${item.id}_toptier`)) {
                    agencies.push({
                        title: `${item.subtier_agency.name} ${topAbbreviation}`,
                        data: Object.assign({}, item, {
                            agencyType: 'toptier'
                        })
                    });
                    // }
                }
                // else if (props.selectedAgency.size === 0
                //     || !props.selectedAgency.has(`${item.id}_subtier`)) {
                agencies.push({
                    title: `${item.subtier_agency.name} ${subAbbreviation}`,
                    subtitle: `Sub-Agency of ${item.toptier_agency.name} ${topAbbreviation}`,
                    data: Object.assign({}, item, {
                        agencyType: 'subtier'
                    })
                });
                // }
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
        setAutocompleteAgencies(agencies);
    };

    const performSecondarySearch = (data, inputVal) => {
        if ((inputVal.toLowerCase() === 'fem') || (inputVal.toLowerCase() === 'fema')) {
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
            const results = search.search(inputVal);

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


            if (apiRequest) {
                // A request is currently in-flight, cancel it
                apiRequest.cancel();
            }

            const agencySearchParams = {
                search_text: inputVal,
                limit: 20
            };

            apiRequest = SearchHelper.fetchAwardingAgencies(agencySearchParams);

            apiRequest.promise
                .then((res) => {
                    performSecondarySearch(res.data.results, inputVal);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        setNoResults(true);
                    }
                });
        }
        else if (apiRequest) {
            // A request is currently in-flight, cancel it
            apiRequest.cancel();
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
        // apply awarding agency filter
        const newSearch = {
            filters: {}
        };
        newSearch.filters.agencies = [];
        newSearch.filters.agencies.push(
            {
                name: valid.data.toptier_agency.name,
                tier: valid.data.agencyType,
                type: "awarding"
            }
        );
        setSearchData(newSearch);
        setSelectedItem(valid.data.toptier_agency.name);
        // Clear Autocomplete results
        setAutocompleteAgencies([]);
    };

    useEffect(() => {
        // need to call a function in the geovisualizationsectioncontainer
        // need to set the selected item here too, must add the filter to the other search
        if (selectedItem.length > 0) {
            props.changeScope(searchData, "agency", selectedItem);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData]);

    useEffect(() => {
        console.log("reloaded");
    }, []);

    return (
        <Autocomplete
            {...props}
            id="state__agency-id"
            values={autocompleteAgencies}
            handleTextInput={handleTextInput}
            onSelect={selectAgency}
            placeholder={props.placeHolder !== '' ? props.placeHolder : `${props.agencyType} Agency`}
            ref={input}
            selectedItem={selectedItem}
            label={`${props.agencyType} Agency`}
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            retainValue />
    );
});

StateAgencyList.propTypes = propTypes;
export default StateAgencyList;
