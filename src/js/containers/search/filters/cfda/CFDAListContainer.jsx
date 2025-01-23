/**
* CFDAListContainer.jsx
* Created by Emily Gullo 07/10/2017
**/

import React, { useState, useRef } from 'react';
import { isEqual, omit, differenceWith } from 'lodash';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';

import * as SearchHelper from 'helpers/searchHelper';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectCFDA: PropTypes.func,
    selectedCFDA: PropTypes.object,
    dirtyFilters: PropTypes.func
};

const CFDAListContainer = ({ selectCFDA, selectedCFDA, dirtyFilters }) => {
    const [cfdaSearchString, setCfdaSearchString] = useState('');
    const [autocompleteCFDA, setAutocompleteCFDA] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const cfdaSearchRequest = useRef();
    let timeout = null;

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

    const queryAutocompleteCFDA = (input) => {
        setNoResults(false);

        // Only search if input is 2 or more characters
        if (input.length >= 3) {
            setCfdaSearchString(input);

            if (cfdaSearchRequest.current) {
                // A request is currently in-flight, cancel it
                cfdaSearchRequest.current.cancel();
            }

            const cfdaSearchParams = {
                search_text: cfdaSearchString,
                limit: 1000
            };

            cfdaSearchRequest.current = SearchHelper.fetchCFDA(cfdaSearchParams);

            cfdaSearchRequest.current.promise
                .then((res) => {
                    const results = res.data.results;
                    let autocompleteData = [];

                    // Filter out any selected CFDA that may be in the result set
                    const currentCFDA =
                    selectedCFDA.toArray().map((cfda) => omit(cfda, 'identifier'));

                    if (results && results.length > 0) {
                        autocompleteData = differenceWith(results, currentCFDA, isEqual);
                    }
                    else {
                        autocompleteData = results;
                    }
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
        else if (cfdaSearchRequest.current) {
            // A request is currently in-flight, cancel it
            cfdaSearchRequest.current.cancel();
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

    return (
        <Autocomplete
            dirtyFilters={dirtyFilters}
            values={autocompleteCFDA}
            handleTextInput={handleTextInput}
            onSelect={selectCFDA}
            placeholder="e.g., 93.778 - Medical Assistance Program"
            clearAutocompleteSuggestions={clearAutocompleteSuggestions}
            noResults={noResults} />
    );
};

CFDAListContainer.propTypes = propTypes;
export default CFDAListContainer;
