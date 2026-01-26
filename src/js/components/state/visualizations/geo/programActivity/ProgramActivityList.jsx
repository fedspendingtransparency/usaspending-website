/**
* ProgramActivityList.jsx
* Created by Andrea Blackwell 09/05/2024
**/

import React, { useCallback, useEffect, useState } from 'react';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';

import * as SearchHelper from 'helpers/searchHelper';
import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    changeScope: PropTypes.func,
    clearSearchFilters: PropTypes.func,
    searchData: PropTypes.string,
    selectedItemsDisplayNames: PropTypes.object
};

const ProgramActivityList = ({
    searchData,
    changeScope,
    clearSearchFilters,
    selectedItemsDisplayNames
}) => {
    const [autocompleteList, setAutocompleteList] = useState([]);
    const [noResults, setNoResults] = useState(false);

    let apiRequest = null;
    let timeout = null;

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

    const queryAutocompleteProgramActivity = (input) => {
        setNoResults(false);

        // Only search if input is 3 or more characters
        if (input.length >= 3) {
            if (apiRequest) {
                // A request is currently in-flight, cancel it
                apiRequest.cancel();
            }

            const searchParams = {
                search_text: input,
                limit: 1000
            };

            apiRequest = SearchHelper.fetchProgramActivity(searchParams);

            apiRequest.promise
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
        else if (apiRequest) {
            // A request is currently in-flight, cancel it
            apiRequest.cancel();
        }
    };

    const clearAutocompleteSuggestions = useCallback(() => {
        setAutocompleteList([]);
    }, []);

    useEffect(() => {
        const el = document.getElementById("state__program-activity-id");
        el.addEventListener("focus", (e) => {
            if (e.target.value !== "") {
                el.select();
            }
        });
        el.addEventListener("blur", (e) => {
            if (e.target.value === "") {
                clearAutocompleteSuggestions();
                clearSearchFilters("program_activity");
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
                    clearSearchFilters("program_activity");
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectProgramActivity = useCallback((programActivity) => {
        const newSearch = searchData;

        newSearch.filters.program_activities = [];
        newSearch.filters.program_activities.push({
            name: programActivity.program_activity_name
        });

        // Clear Autocomplete results
        setAutocompleteList([]);
        if (Object.keys(newSearch).length > 0) {
            changeScope(newSearch, "program_activity", programActivity.program_activity_name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData]);

    const handleTextInput = useCallback((inputVal) => {
        // Clear existing cfdas to ensure user can't select an old or existing one
        setAutocompleteList([]);

        // Grab input, clear any exiting timeout
        const input = inputVal.target?.value;
        window.clearTimeout(timeout);

        // Perform search if user doesn't type again for 300ms
        timeout = window.setTimeout(() => {
            queryAutocompleteProgramActivity(input);
        }, 300);
    }, []);

    return (
        <Autocomplete
            values={autocompleteList}
            handleTextInput={handleTextInput}
            onSelect={selectProgramActivity}
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
