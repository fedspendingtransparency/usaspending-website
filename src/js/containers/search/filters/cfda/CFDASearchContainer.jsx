/**
  * CFDASearchContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from 'axios';

import { fetchCFDA } from 'helpers/searchHelper';
import replaceString from 'helpers/replaceString';
import { updateSearchedFilterValues, updateSelectedCFDA } from 'redux/actions/search/searchFilterActions';
import AutocompleteWithCheckboxList from 'components/sharedComponents/autocomplete/AutocompleteWithCheckboxList';


const CFDASearchContainer = () => {
    const [cfdaSearchString, setCfdaSearchString] = useState('');
    const [autocompleteCFDA, setAutocompleteCFDA] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const selectedCFDA = useSelector((state) => state.filters.selectedCFDA);
    const searchedFilterValues = useSelector((state) => state.appliedFilters.filters.searchedFilterValues);

    const highlightText = (text) => replaceString(text, cfdaSearchString, 'bold-highlight');

    const cfdaSearchRequest = useRef();
    const dispatch = useDispatch();

    const toggleCFDA = ({ value }) => {
        const cfda = autocompleteCFDA.find((c) => c.data.program_number === value);

        if (cfda) dispatch(updateSelectedCFDA({ cfda: cfda.data }));

        const updatedSelected = [];
        if (selectedCFDA?.size > 0) {
            // some recipients have already been toggled
            // check if current is already toggeled
            selectedCFDA.forEach((scfda) => {
                if (scfda.program_number !== value.program_number) {
                    updatedSelected.push(scfda);
                }
            });
        }
        else {
            updatedSelected.push(value);
        }

        dispatch(updateSearchedFilterValues({
            filterType: "cfda",
            input: cfdaSearchString,
            selected: updatedSelected
        }));
    };

    const parseAutocompleteCFDA = (cfda) => {
        const values = [];
        if (cfda && cfda.length > 0) {
            cfda.forEach((item) => {
                const title = `${item.program_number} - ${item.program_title}`;
                const subtitle = '';

                values.push({
                    title: highlightText(title),
                    subtitle,
                    data: item,
                    value: item.program_number,
                    key: item.program_number
                });
            });
        }

        setAutocompleteCFDA(values);
    };

    const queryAutocompleteCFDA = () => {
        setNoResults(false);

        if (cfdaSearchRequest.current) {
            // A request is currently in-flight, cancel it
            cfdaSearchRequest.current.cancel();
        }

        const cfdaSearchParams = {
            search_text: cfdaSearchString,
            limit: 1000
        };

        setIsLoading(true);

        cfdaSearchRequest.current = fetchCFDA(cfdaSearchParams);

        cfdaSearchRequest.current.promise
            .then((res) => {
                const autocompleteData = res.data.results;
                setErrorMessage('');
                setNoResults(autocompleteData.length === 0);

                // Add search results to Redux
                parseAutocompleteCFDA(autocompleteData);
                setIsLoading(false);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setErrorMessage(err.message);
                    setIsLoading(false);
                }
            });
    };

    const handleTextInputChange = (e) => {
        setCfdaSearchString(e.target.value);
    };

    const handleSearchClear = () => {
        setCfdaSearchString(''); // clean up if previously set
        setAutocompleteCFDA([]);
    };

    const handleClearAll = () => {
        selectedCFDA.forEach((cfda) => {
            dispatch(updateSelectedCFDA({ cfda }));
        });

        handleSearchClear();
    };


    const toggleAll = (selectAll) => {
        const selectedArray = selectedCFDA.toArray();

        if (selectAll) {
            let filteredList = autocompleteCFDA;
            if (selectedArray?.length) {
                filteredList = autocompleteCFDA.filter((cfda) => !selectedArray.some((c) => c.program_number === cfda.data.program_number));
            }

            filteredList.forEach((fcfda) => {
                dispatch(updateSelectedCFDA({ cfda: fcfda.data }));
            });

            dispatch(updateSearchedFilterValues({
                filterType: "cfda",
                input: cfdaSearchString,
                selected: selectedArray
            }));
        }
        else {
            selectedCFDA.forEach((cfda) => {
                dispatch(updateSelectedCFDA({ cfda }));
            });
            dispatch(updateSearchedFilterValues({
                filterType: "cfda",
                input: cfdaSearchString,
                selected: []
            }));
        }
    };


    useEffect(() => {
        let searchValues = null;
        if (searchedFilterValues?.cfda) {
            searchValues = searchedFilterValues.cfda;
        }
        else if (searchedFilterValues?.get('cfda')) {
            searchValues = searchedFilterValues.get('cfda');
        }
        if (searchValues && (!cfdaSearchString || cfdaSearchString !== searchValues?.input)) {
            setCfdaSearchString(searchValues.input);
            queryAutocompleteCFDA();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchedFilterValues]);

    useEffect(() => {
        if (cfdaSearchString?.length >= 3) {
            queryAutocompleteCFDA();
            dispatch(updateSearchedFilterValues({
                filterType: "cfda",
                input: cfdaSearchString,
                selected: selectedCFDA
            }));
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cfdaSearchString]);

    return (
        <div className="cfda-filter">
            <AutocompleteWithCheckboxList
                placeholder="e.g., 93.778 - Medical Assistance Program"
                filterType="Assistance Listings"
                handleTextInputChange={handleTextInputChange}
                onSearchClear={handleSearchClear}
                onClearAll={handleClearAll}
                searchString={cfdaSearchString}
                filters={autocompleteCFDA}
                selectedFilters={selectedCFDA}
                toggleSingleFilter={toggleCFDA}
                toggleAll={toggleAll}
                noResults={noResults}
                errorMessage={errorMessage}
                isLoading={isLoading}
                limit={1000} />
        </div>
    );
};

export default CFDASearchContainer;
