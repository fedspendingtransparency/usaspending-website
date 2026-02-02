/**
* StateCFDAList.jsx
* Created by Nick Torres 8/13/2024
**/

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';
import { fetchCFDA } from "helpers/searchHelper";

const propTypes = {
    searchParams: PropTypes.string,
    changeScope: PropTypes.func,
    clearSearchFilters: PropTypes.func,
    selectedItemsDisplayNames: PropTypes.object
};

const StateCFDAList = ({
    searchParams,
    changeScope,
    clearSearchFilters,
    selectedItemsDisplayNames
}) => {
    const [autocompleteCFDA, setAutocompleteCFDA] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const request = useRef(null);
    const timeout = useRef(null);

    const clearAutocompleteSuggestions = useCallback(() => {
        setAutocompleteCFDA([]);
    }, []);

    useEffect(() => {
        const el = document.getElementById("state__cfda-id");

        const onFocus = (e) => {
            if (e.target.value !== "") {
                el?.select();
            }
        };

        const onBlur = (e) => {
            if (e.target.value === "") {
                clearAutocompleteSuggestions();
                clearSearchFilters("program_number");
            }
        };

        el.addEventListener("focus", onFocus);
        el.addEventListener("blur", onBlur);

        return () => {
            el.removeEventListener("focus", onFocus);
            el.removeEventListener("blur", onBlur);
        };
    }, [clearAutocompleteSuggestions, clearSearchFilters]);

    const onSelect = useCallback((cfda) => {
        const newTitle = `${cfda.program_number} - ${cfda.program_title}`;
        const newSearch = searchParams;
        newSearch.filters.program_numbers = [];
        newSearch.filters.program_numbers.push(cfda.program_number);

        // Clear Autocomplete results
        setAutocompleteCFDA([]);
        if (Object.keys(newSearch).length > 0) {
            changeScope(newSearch, "program_number", newTitle);
        }
    }, [searchParams, changeScope]);

    const parseAutocompleteCFDA = (cfda) => {
        const values = [];
        if (cfda && cfda.length > 0) {
            cfda.forEach((item) => {
                const title = `${item.program_number} - ${item.program_title}`;
                const subtitle = '';

                values.push({
                    title,
                    subtitle,
                    data: item
                });
            });
        }

        setAutocompleteCFDA(values);
    };

    const queryAutocompleteCFDA = useCallback((input) => {
        setNoResults(false);

        // Only search if input is 3 or more characters
        if (input.length >= 3) {
            if (request.current) {
                // A request is currently in-flight, cancel it
                request.current.cancel();
            }

            const cfdaSearchParams = {
                search_text: input,
                limit: 1000
            };

            request.current = fetchCFDA(cfdaSearchParams);

            request.current.promise
                .then((res) => {
                    const autocompleteData = res.data.results;
                    setNoResults(autocompleteData.length === 0);

                    // Add search results to Redux
                    parseAutocompleteCFDA(autocompleteData);
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
    }, []);

    const handleTextInput = useCallback((cfdaInput) => {
        // Clear existing cfdas to ensure user can't select an old or existing one
        setAutocompleteCFDA([]);

        // Grab input, clear any exiting timeout
        const input = cfdaInput.target?.value;
        window.clearTimeout(timeout.current);

        // Perform search if user doesn't type again for 300ms
        timeout.current = window.setTimeout(() => {
            queryAutocompleteCFDA(input);
        }, 300);

        return () => window.clearTimeout(timeout.current);
    }, [queryAutocompleteCFDA]);

    return (
        <Autocomplete
            values={autocompleteCFDA}
            handleTextInput={handleTextInput}
            onSelect={onSelect}
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            selectedItemsDisplayNames={selectedItemsDisplayNames}
            label="Assistance Listing"
            placeholder="Search for an assistance listing..."
            id="state__cfda-id"
            type="program_number"
            retainValue />
    );
};

StateCFDAList.propTypes = propTypes;
export default StateCFDAList;
