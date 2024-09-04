/**
* StateCFDAList.jsx
* Created by Nick Torres 8/13/2024
**/

import React, { useEffect, useState } from 'react';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';

import * as SearchHelper from 'helpers/searchHelper';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectCFDA: PropTypes.func,
    selectedCFDA: PropTypes.object
};

const StateCFDAList = (props) => {
    const [cfdaTitleString, setCFDATitleString] = useState('');
    const [autocompleteCFDA, setAutocompleteCFDA] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [searchData, setSearchData] = useState({});

    let apiRequest = null;
    let timeout = null;
    const cfdaInput = React.createRef();

    const selectCFDA = (cfda) => {
        setCFDATitleString(`${cfda.program_number} - ${cfda.program_title}`);
        const newSearch = props.searchData;
        newSearch.filters.program_numbers = [];
        newSearch.filters.program_numbers.push(cfda.program_number);

        // Clear Autocomplete results
        setAutocompleteCFDA([]);
        setSearchData(newSearch);
    };

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

    const checkStatus = (e) => {
        if (e.target.value === '' && cfdaTitleString !== '') {
            setCFDATitleString('');
            setSearchData({});
            console.log("clear");
            props.clearSearchFilters("program_number");
        }
    };

    const queryAutocompleteCFDA = (input) => {
        setNoResults(false);

        if (input.length === 0) {
            setAutocompleteCFDA([]);
            props.clearSearchFilters("program_number");
        }
        // Only search if input is 3 or more characters
        else if (input.length >= 3) {
            if (apiRequest) {
                // A request is currently in-flight, cancel it
                apiRequest.cancel();
            }

            const cfdaSearchParams = {
                search_text: input,
                limit: 1000
            };

            apiRequest = SearchHelper.fetchCFDA(cfdaSearchParams);

            apiRequest.promise
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
        else if (apiRequest) {
            // A request is currently in-flight, cancel it
            apiRequest.cancel();
        }
    };

    const clearAutocompleteSuggestions = () => {
        setAutocompleteCFDA([]);
    };

    const handleTextInput = (cfdaInput) => {
    // Clear existing cfdas to ensure user can't select an old or existing one
        setAutocompleteCFDA([]);

        // Grab input, clear any exiting timeout
        const input = cfdaInput.target.value;
        window.clearTimeout(timeout);

        // Perform search if user doesn't type again for 300ms
        timeout = window.setTimeout(() => {
            queryAutocompleteCFDA(input);
        }, 300);
    };

    useEffect(() => {
        if (Object.keys(searchData).length > 0) {
            props.changeScope(searchData, "program_number", cfdaTitleString);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData]);

    useEffect(() => {
        const el = document.getElementById("state__cfda-id");
        el.addEventListener("focus", el.select());
        el.addEventListener("blur", e => checkStatus(e));

        return () => el.removeEventListener('focus', el.select());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Autocomplete
            {...props}
            id="state__cfda-id"
            ref={cfdaInput}
            label="Assistance Listing"
            values={autocompleteCFDA}
            handleTextInput={handleTextInput}
            onSelect={selectCFDA}
            type="program_number"
            placeholder="Search for an Assistance Listing..."
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults}
            retainValue />
    );
};

StateCFDAList.propTypes = propTypes;
export default StateCFDAList;
