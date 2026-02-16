/**
* ProgramActivityList.jsx
* Created by Andrea Blackwell 09/05/2024
**/

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';

import { fetchProgramActivity } from "helpers/searchHelper";
import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    changeScope: PropTypes.func,
    clearSearchFilters: PropTypes.func,
    searchParams: PropTypes.string,
    selectedItemsDisplayNames: PropTypes.object
};

const ProgramActivityList = ({
    searchParams,
    changeScope,
    clearSearchFilters,
    selectedItemsDisplayNames
}) => {
    const [autocompleteList, setAutocompleteList] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const request = useRef(null);
    const timeout = useRef(null);

    const clearAutocompleteSuggestions = useCallback(() => {
        setAutocompleteList([]);
    }, []);

    useEffect(() => {
        const el = document.getElementById("state__program-activity-id");

        const onFocus = (e) => {
            if (e.target.value !== "") {
                el.current.select();
            }
        };

        const onBlur = (e) => {
            if (e.target.value === "") {
                clearAutocompleteSuggestions();
                clearSearchFilters("program_activity");
            }
        };

        el.addEventListener("focus", onFocus);
        el.addEventListener("blur", onBlur);

        return () => {
            el.removeEventListener("focus", onFocus);
            el.removeEventListener("blur", onBlur);
        };
    }, [clearAutocompleteSuggestions, clearSearchFilters]);


    const parseAutocompleteProgramActivity = (programActivity) => {
        const values = [];
        if (programActivity && programActivity.length > 0) {
            programActivity.forEach((item) => {
                const title = item.program_activity_name;

                values.push({
                    title,
                    data: item
                });
            });
        }

        setAutocompleteList(values);
    };

    const queryAutocompleteProgramActivity = useCallback((input) => {
        setNoResults(false);

        // Only search if input is 3 or more characters
        if (input.length >= 3) {
            if (request.current) {
                // A request is currently in-flight, cancel it
                request.current.cancel();
            }

            const params = {
                search_text: input,
                limit: 1000
            };

            request.current = fetchProgramActivity(params);

            request.current.promise
                .then((res) => {
                    const autocompleteData = res.data.results;
                    setNoResults(autocompleteData.length === 0);

                    // Add search results to Redux
                    parseAutocompleteProgramActivity(autocompleteData);
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

    const onSelect = useCallback((programActivity) => {
        const newSearch = searchParams;

        newSearch.filters.program_activities = [];
        newSearch.filters.program_activities.push({
            name: programActivity.program_activity_name
        });

        // Clear Autocomplete results
        setAutocompleteList([]);
        if (Object.keys(newSearch).length > 0) {
            changeScope(newSearch, "program_activity", programActivity.program_activity_name);
        }
    }, [searchParams, changeScope]);

    const handleTextInput = useCallback((inputVal) => {
        // Clear existing cfdas to ensure user can't select an old or existing one
        setAutocompleteList([]);

        // Grab input, clear any exiting timeout
        const input = inputVal.target?.value;
        window.clearTimeout(timeout.current);

        // Perform search if user doesn't type again for 300ms
        timeout.current = window.setTimeout(() => {
            queryAutocompleteProgramActivity(input);
        }, 300);

        return () => window.clearTimeout(timeout.current);
    }, [queryAutocompleteProgramActivity]);

    return (
        <Autocomplete
            values={autocompleteList}
            handleTextInput={handleTextInput}
            onSelect={onSelect}
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            selectedItemsDisplayNames={selectedItemsDisplayNames}
            label="Program Activity"
            placeholder="Search for a program activity..."
            id="state__program-activity-id"
            type="program_activity"
            retainValue />
    );
};

ProgramActivityList.propTypes = propTypes;
export default ProgramActivityList;
