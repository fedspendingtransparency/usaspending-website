/**
* ProgramActivityList.jsx
* Created by Andrea Blackwell 09/05/2024
**/

import React, { useEffect, useState } from 'react';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';

import * as SearchHelper from 'helpers/searchHelper';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectProgramActivity: PropTypes.func,
    selectedProgramActivity: PropTypes.object,
    placeholder: PropTypes.string
};

const ProgramActivityList = (props) => {
    const [titleString, setTitleString] = useState('');
    const [autocompleteList, setAutocompleteList] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [searchData, setSearchData] = useState({});

    let apiRequest = null;
    let timeout = null;

    const selectProgramActivity = (programActivity) => {
        setTitleString(programActivity.program_activity_name);
        const newSearch = props.searchData;
        newSearch.filters.program_activities = [];
        newSearch.filters.program_activities.push({
            name: programActivity.program_activity_name
        });
        // Clear Autocomplete results
        setAutocompleteList([]);
        setSearchData(newSearch);
    };

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

    const clearAutocompleteSuggestions = () => {
        setAutocompleteList([]);
    };

    const handleTextInput = (inputVal) => {
    // Clear existing cfdas to ensure user can't select an old or existing one
        setAutocompleteList([]);

        // Grab input, clear any exiting timeout
        const input = inputVal.target?.value;
        window.clearTimeout(timeout);

        // Perform search if user doesn't type again for 300ms
        timeout = window.setTimeout(() => {
            queryAutocompleteProgramActivity(input);
        }, 300);
    };

    useEffect(() => {
        if (Object.keys(searchData).length > 0) {
            props.changeScope(searchData, "program_activity", titleString);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData]);

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
                props.clearSearchFilters("program_activity");
                setTitleString('');
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
                    props.clearSearchFilters("program_activity");
                    setTitleString('');
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Autocomplete
            {...props}
            id="state__program-activity-id"
            label="Program Activity"
            values={autocompleteList}
            handleTextInput={handleTextInput}
            onSelect={selectProgramActivity}
            type="program_activity"
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            retainValue />
    );
};

ProgramActivityList.propTypes = propTypes;
export default ProgramActivityList;
