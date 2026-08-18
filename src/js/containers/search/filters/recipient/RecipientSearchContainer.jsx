/**
 * RecipientSearchContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCancel } from "axios";

import { updateSelectedRecipients } from 'redux/actions/search/searchFilterActions';
import { fetchRecipientsAutocomplete } from 'helpers/searchHelper';
import replaceString from 'helpers/replaceString';
import AutocompleteWithCheckboxList from
    'components/sharedComponents/autocomplete/AutocompleteWithCheckboxList';
import ShownValue from 'components/search/filters/ShownValue';

const RecipientSearchContainer = () => {
    const [recipients, setRecipients] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [maxRecipients, setMaxRecipients] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const selectedRecipients = useSelector((state) => state.filters.selectedRecipients);
    const dispatch = useDispatch();

    const recipientRequest = useRef(null);
    const timeoutRef = useRef(null);

    const maxRecipientsAllowed = 500;
    const maxRecipientTitle = `Only ${maxRecipientsAllowed} recipients can be displayed at once`;
    const maxRecipientText = 'Please use the search bar to narrow your search and find additional recipients.';
    const highlightText = (text) => replaceString(text, searchString, 'bold-highlight');

    const toggleRecipient = ({ value }) => {
        let isUei = false;
        if (
            value.uei && searchString.length > 2 &&
            value.uei?.includes(searchString.toUpperCase())
        ) {
            dispatch(updateSelectedRecipients(value.uei));
            isUei = true;
        }
        else {
            dispatch(updateSelectedRecipients(value.name));
        }

        const updatedSelected = selectedRecipients.toArray();
        if (
            selectedRecipients?.size > 0 &&
            selectedRecipients.includes(isUei ? value.uei : value.name)
        ) {
            updatedSelected.filter((rep) => rep === (isUei ? value.uei : value.name));
        }
        else {
            updatedSelected.push(isUei ? value.uei : value.name);
        }
    };


    const sortResults = (data) => {
        // sort alphabetically
        data.sort((a, b) => {
            const nameA = a.name ? a.name : a.recipient_name;
            const nameB = b.name ? b.name : b.recipient_name;
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });

        // sort by selected recipients
        if (selectedRecipients.size > 0) {
            const recipientsArray = selectedRecipients.toArray();

            recipientsArray.sort((a, b) => {
                if (a > b) {
                    return -1;
                }
                if (a < b) {
                    return 1;
                }

                return 0;
            });

            recipientsArray.forEach((recipient) => {
                data.sort((a, b) => {
                    const aValues = Object.values(a);
                    const bValues = Object.values(b);

                    if (aValues.includes(recipient) && !bValues.includes(recipient)) {
                        return -1;
                    }
                    if (!aValues.includes(recipient) && bValues.includes(recipient)) {
                        return 1;
                    }

                    return 0;
                });
            });
        }
    };


    const getRecipientsFromSearchString = (term) => {
        if (recipientRequest.current) {
            recipientRequest.current.cancel();
        }

        if (term.length >= 3) {
            const paramObj = {
                search_text: term,
                limit: maxRecipientsAllowed
            };

            recipientRequest.current = fetchRecipientsAutocomplete(paramObj);

            setIsLoading(true);

            recipientRequest.current.promise
                .then((res) => {
                    sortResults(res.data.results);
                    setRecipients(res.data.results);
                    setErrorMessage('');
                    setMaxRecipients(res.data.count === maxRecipientsAllowed);
                    setNoResults(!res.data.count);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        console.log(`Recipient Request Error: ${err}`);
                        setErrorMessage(err.message);
                    }
                });
        }

        setIsLoading(false);
    };

    const handleTextInputChange = (e) => {
        window.clearTimeout(timeoutRef.current);
        setSearchString(e.target.value);
        timeoutRef.current = window.setTimeout(() => {
            getRecipientsFromSearchString(e.target.value);
        }, 1000);
    };

    const handleSearchClear = () => {
        setSearchString('');
        setMaxRecipients(false); // clean up if previously set
        setRecipients([]);
    };


    const handleClearAll = () => {
        selectedRecipients.forEach((recipient) => {
            dispatch(updateSelectedRecipients(recipient));
        });

        handleSearchClear();
    };

    const getMaxRecipientsText = () => {
        if (maxRecipients) {
            return (
                <div className="recipient-filter-message-container">
                    <div className="find-recipients-text label">
                        {maxRecipientTitle}
                    </div>
                    <div className="find-recipients-text content">
                        {maxRecipientText}
                    </div>
                </div>
            );
        }

        return null;
    };

    const getFormatedName = (recipient) => {
        if (recipient.uei && recipient.uei?.includes(searchString.toUpperCase())) {
            return (
                <div className="recipient-checkbox__uei">
                    <span>UEI: </span>{highlightText(recipient.uei)}
                    <div className="secondary-label__name-container">
                        {highlightText(recipient.name ? recipient.name : recipient.recipient_name)}
                    </div>
                </div>
            );
        }

        return highlightText(recipient.name ? recipient.name : recipient.recipient_name);
    };

    const formatedRecipientFilters = () => {
        let formatedRecipients = [];
        if (recipients) {
            formatedRecipients = recipients.toSorted((a, b) => (
                a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1))
                .map((recipient) => ({
                    name: getFormatedName(recipient),
                    value: {
                        name: recipient.name ? recipient.name : recipient.recipient_name,
                        uei: recipient.uei
                    },
                    key: recipient.uei ? `UEI-${recipient.uei}` : `Name-${recipient.id}`
                }));
        }
        return formatedRecipients;
    };

    const toggleAll = (selectAll) => {
        const selectedList = selectedRecipients.toArray();
        if (selectAll) {
            const currentlyChecked = selectedList;
            recipients.forEach((rep) => {
                if (!currentlyChecked.includes(rep.recipient_name)) {
                    // do not update currently checked
                    // only new checked.
                    dispatch(updateSelectedRecipients(rep.recipient_name));
                    currentlyChecked.push(rep.recipient_name);
                }
            });
        }
        else {
            selectedRecipients.forEach((rep) => {
                dispatch(updateSelectedRecipients(rep));
            });
        }
    };

    return (
        <div className="recipient-filter">
            <AutocompleteWithCheckboxList
                filterType="Recipients"
                limit={maxRecipientsAllowed}
                handleTextInputChange={handleTextInputChange}
                onSearchClear={handleSearchClear}
                onClearAll={handleClearAll}
                searchString={searchString}
                filters={formatedRecipientFilters()}
                selectedFilters={selectedRecipients}
                toggleSingleFilter={toggleRecipient}
                toggleAll={toggleAll}
                noResults={noResults}
                additionalText={getMaxRecipientsText()}
                isLoading={isLoading}
                errorMessage={errorMessage}
                searchId="recipient-autocomplete-input" />

            <div className="selected-filters" role="status">
                {selectedRecipients.map((rec) => (
                    <ShownValue
                        label={rec}
                        key={rec}
                        removeValue={() => dispatch(updateSelectedRecipients(rec))} />
                ))}
            </div>
        </div>
    );
};

export default RecipientSearchContainer;
