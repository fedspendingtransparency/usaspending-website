/**
* AgencyListContainer.jsx
* Created by Emily Gullo 12/23/2016
**/

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { filter, sortBy, slice, concat } from 'lodash-es';
import { Search } from 'js-search';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';
import { autocompletePlaceholder } from "helpers/search/filterCheckboxHelper";

const propTypes = {
    toggleAgency: PropTypes.func,
    selectedAgencies: PropTypes.object,
    agencyType: PropTypes.string,
    fetchAgencies: PropTypes.func
};

const AgencyListContainer = ({
    toggleAgency,
    selectedAgencies,
    agencyType,
    fetchAgencies
}) => {
    const [autocompleteAgencies, setAutocompleteAgencies] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const request = useRef(null);

    let agencySearchString;
    let timeout = null;

    const parseAutocompleteAgencies = (results) => {
        let agencies = [];
        let localNoResults = false;

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
                    if (
                        selectedAgencies.size === 0 ||
                        !selectedAgencies.has(`${item.id}_toptier`)
                    ) {
                        agencies.push({
                            title: `${item.subtier_agency.name} ${topAbbreviation}`,
                            data: Object.assign({}, item, {
                                agencyType: 'toptier'
                            })
                        });
                    }
                }
                else if (
                    selectedAgencies.size === 0 ||
                    !selectedAgencies.has(`${item.id}_subtier`)
                ) {
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
                localNoResults = true;
            }
        }

        // For searches for FEMA, leave the results in the same order as the API response
        if (
            (agencySearchString.toLowerCase() !== 'fem') &&
            (agencySearchString.toLowerCase() !== 'fema')
        ) {
            // Separate top and subtier agencies
            let toptierAgencies = filter(agencies, ['data.agencyType', 'toptier']);
            let subtierAgencies = filter(agencies, ['data.agencyType', 'subtier']);

            // Sort individual groups alphabetically
            toptierAgencies = sortBy(toptierAgencies, 'title');
            subtierAgencies = sortBy(subtierAgencies, 'title');

            agencies = slice(concat(toptierAgencies, subtierAgencies), 0, 10);
        }

        setNoResults(localNoResults);
        setAutocompleteAgencies(agencies);
    };

    const performSecondarySearch = (data) => {
        if (
            (agencySearchString.toLowerCase() === 'fem') ||
            (agencySearchString.toLowerCase() === 'fema')
        ) {
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

    const queryAutocompleteAgencies = (input) => {
        setNoResults(false);

        // Only search if search is 2 or more characters
        if (input.length >= 3) {
            agencySearchString = input;

            if (request.current) {
                // A request is currently in-flight, cancel it
                request.current.cancel();
            }

            const agencySearchParams = {
                search_text: input,
                limit: 20
            };

            request.current = fetchAgencies(agencySearchParams);

            request.current.promise
                .then((res) => {
                    performSecondarySearch(res.data.results);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        setNoResults(true);
                    }
                });
        }
        else if (request.current) {
            // A request is currently in-flight, cancel it
            request.current.cancel();
        }
    };

    const clearAutocompleteSuggestions = () => {
        setAutocompleteAgencies([]);
    };

    const handleTextInput = (agencyInput) => {
        // Clear existing agencies to ensure user can't select an old or existing one
        if (autocompleteAgencies.length > 0) {
            setAutocompleteAgencies([]);
        }

        // Grab input, clear any exiting timeout
        const input = agencyInput.target.value;
        window.clearTimeout(timeout);

        // Perform search if user doesn't type again for 300ms
        timeout = window.setTimeout(() => {
            queryAutocompleteAgencies(input);
        }, 300);
    };

    const onSelect = (agency, valid) => {
        // Pass selected agency to parent toggleAgency method, adding agencyType to method call
        toggleAgency(agency, valid);

        // Clear Autocomplete results
        setAutocompleteAgencies([]);
    };

    return (
        <Autocomplete
            values={autocompleteAgencies}
            handleTextInput={handleTextInput}
            onSelect={onSelect}
            placeholder={autocompletePlaceholder}
            label={`${agencyType} Agency`}
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults} />
    );
};

AgencyListContainer.propTypes = propTypes;
export default AgencyListContainer;
