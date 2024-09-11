/**
* StateAgencyList.jsx
* Created by Nick Torres 8/12/2024
**/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { filter, sortBy, slice, concat } from 'lodash';
import { Search } from 'js-search';
import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';
import * as SearchHelper from 'helpers/searchHelper';

const propTypes = {
    changeScope: PropTypes.func,
    clearSearchFilters: PropTypes.func
};

const StateAgencyList = React.memo((props) => {
    const [agencySearchString, setAgencySearchString] = useState('');
    const [autocompleteAgencies, setAutocompleteAgencies] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [searchData, setSearchData] = useState({});

    let timeout = null;
    let apiRequest = null;

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
                    agencies.push({
                        title: `${item.subtier_agency.name} ${topAbbreviation}`,
                        data: Object.assign({}, item, {
                            agencyType: 'toptier'
                        })
                    });
                }
                else {
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

        if (agencies.length > 0) {
            setNoResults(false);
        }
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

            if (improvedResults.length > 0) {
                setNoResults(false);
            }

            // Add search results to Redux
            parseAutocompleteAgencies(improvedResults);
        }
    };

    const clearAutocompleteSuggestions = () => {
        setAutocompleteAgencies([]);
    };

    const queryAutocompleteAgencies = (inputVal) => {
        setNoResults(false);

        if (inputVal.length >= 3) {
            // Only search if search is 2 or more characters
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
        setAutocompleteAgencies([]);
    };

    useEffect(() => {
        if (Object.keys(searchData).length > 0) {
            props.changeScope(searchData, "agency");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData]);

    useEffect(() => {
        const el = document.getElementById("state__agency-id");
        el.addEventListener("focus", (e) => {
            if (e.target.value !== "") {
                el.select();
            }
        });
        el.addEventListener("blur", (e) => {
            if (e.target.value === "") {
                clearAutocompleteSuggestions();
                props.clearSearchFilters("agency");
                setAgencySearchString('');
            }
        });
        return () => {
            el.removeEventListener("focus", (e) => {
                if (e.target.value !== "") {
                    el.select();
                }
            });
            el.removeEventListener("blur", (e) => {
                if (e.target.value === "") {
                    clearAutocompleteSuggestions();
                    props.clearSearchFilters("agency");
                    setAgencySearchString('');
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Autocomplete
            {...props}
            id="state__agency-id"
            type="agency"
            values={autocompleteAgencies}
            handleTextInput={handleTextInput}
            onSelect={selectAgency}
            label={`${props.agencyType} Agency`}
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            retainValue />
    );
});

StateAgencyList.propTypes = propTypes;
export default StateAgencyList;
