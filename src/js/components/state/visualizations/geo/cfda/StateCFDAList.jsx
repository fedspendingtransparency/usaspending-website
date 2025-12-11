/**
* StateCFDAList.jsx
* Created by Nick Torres 8/13/2024
**/

import React, { useEffect, useState } from 'react';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';

import * as SearchHelper from 'helpers/searchHelper';

// import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';
import AutocompleteWithCheckboxList from '../../../../sharedComponents/autocomplete/AutocompleteWithCheckboxList';
import replaceString from '../../../../../helpers/replaceString';

const propTypes = {
    selectCFDA: PropTypes.func,
    selectedCFDA: PropTypes.object
};

const StateCFDAList = (props) => {
    const [cfdaTitleString, setCfdaTitleString] = useState('');
    const [cfdaSearchString, setCfdaSearchString] = useState('');
    const [autocompleteCFDA, setAutocompleteCFDA] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [searchData, setSearchData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // const selectedCFDA = useSelector((state) => state.filters.selectedCFDA);

    const highlightText = (text) => replaceString(text, cfdaSearchString, 'bold-highlight');

    let apiRequest = null;

    const selectCFDA = (cfda) => {
        setCfdaTitleString(`${cfda.program_number} - ${cfda.program_title}`);
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

        if (apiRequest) {
            // A request is currently in-flight, cancel it
            apiRequest.cancel();
        }

        const cfdaSearchParams = {
            search_text: cfdaSearchString,
            limit: 1000
        };

        setIsLoading(true);
        apiRequest = SearchHelper.fetchCFDA(cfdaSearchParams);

        apiRequest.promise
            .then((res) => {
                const autocompleteData = res.data.results;
                setNoResults(autocompleteData.length === 0);

                // Add search results to Redux
                parseAutocompleteCFDA(autocompleteData);
                setIsLoading(false);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    setNoResults(true);
                    setIsLoading(false);
                }
            });
    };

    const handleTextInputChange = (e) => {
        setCfdaSearchString(e.target.value);
    };

    const handleClearCFDAs = () => {
        // selectedCFDA.forEach((cfda) => {
        //     dispatch(updateSelectedCFDA({ cfda }));
        // });

        setCfdaSearchString(''); // clean up if previously set
        setAutocompleteCFDA([]);
    };

    const toggleAll = (selectAll) => {
        // const selectedArray = props.selectedCFDA.toArray();

        if (selectAll) {
            // let filteredList = autocompleteCFDA;
            // if (selectedArray?.length) {
            //     filteredList = autocompleteCFDA.filter((cfda) => !selectedArray.some((c) => c.program_number === cfda.data.program_number));
            // }

            // filteredList.forEach((fcfda) => {
            //     dispatch(updateSelectedCFDA({ cfda: fcfda.data }));
            // });
        }
        else {
            setCfdaSearchString(''); // clean up if previously set
            setAutocompleteCFDA([]);
        }
    };


    useEffect(() => {
        if (cfdaSearchString?.length >= 3) {
            queryAutocompleteCFDA();
        }

        if (cfdaSearchString === '') {
            handleClearCFDAs();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cfdaSearchString]);

    useEffect(() => {
        if (Object.keys(searchData).length > 0) {
            props.changeScope(searchData, "program_number", cfdaTitleString);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData]);

    // useEffect(() => {
    //     const el = document.getElementById("state__cfda-id");
    //     el.addEventListener("focus", (e) => {
    //         if (e.target.value !== "") {
    //             el.select();
    //         }
    //     });
    //     el.addEventListener("blur", (e) => {
    //         if (e.target.value === "") {
    //             handleClearCFDAs();
    //             props.clearSearchFilters("program_number");
    //             setCfdaTitleString('');
    //         }
    //     });
    //     return () => {
    //         el.removeEventListener("focus", (e) => {
    //             if (e.target.value !== "") {
    //                 el.select();
    //             }
    //         });
    //         el.removeEventListener("blur", (e) => {
    //             if (e.target.value === "") {
    //                 handleClearCFDAs();
    //                 props.clearSearchFilters("agency");
    //                 setCfdaTitleString('');
    //             }
    //         });
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <div className="cfda-filter">
            <AutocompleteWithCheckboxList
                id="state__cfda-id"
                placeholder="e.g., 93.778 - Medical Assistance Program"
                filterType="CFDA"
                handleTextInputChange={handleTextInputChange}
                onSearchClear={handleClearCFDAs}
                searchString={cfdaSearchString}
                filters={autocompleteCFDA}
                selectedFilters={props.selectedCFDA}
                toggleSingleFilter={selectCFDA}
                toggleAll={toggleAll}
                noResults={noResults}
                isLoading={isLoading}
                limit={1000} />
        </div>
        // <Autocomplete
        //     {...props}
        //     id="state__cfda-id"
        //     label="Assistance Listing"
        //     values={autocompleteCFDA}
        //     handleTextInput={handleTextInput}
        //     onSelect={selectCFDA}
        //     type="program_number"
        //     clearAutocompleteSuggestions={clearAutocompleteSuggestions}
        //     noResults={noResults}
        //     retainValue />
    );
};

StateCFDAList.propTypes = propTypes;
export default StateCFDAList;
