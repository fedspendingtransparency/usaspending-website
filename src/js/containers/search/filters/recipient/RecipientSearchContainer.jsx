/**
 * RecipientSearchContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from "axios";

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import * as SearchHelper from 'helpers/searchHelper';
import replaceString from '../../../../helpers/replaceString';
import AutocompleteWithCheckboxList from '../../../../components/sharedComponents/autocomplete/AutocompleteWithCheckboxList';

const propTypes = {
    updateSelectedRecipients: PropTypes.func,
    selectedRecipients: PropTypes.object
};

const RecipientSearchContainer = ({ updateSelectedRecipients, selectedRecipients }) => {
    const [recipients, setRecipients] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [maxRecipients, setMaxRecipients] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const recipientRequest = useRef();
    const maxRecipientsAllowed = 500;
    const maxRecipientTitle = `Only ${maxRecipientsAllowed} recipients can be displayed at once`;
    const maxRecipientText = 'Please use the search bar to narrow your search and find additional recipients.';
    const highlightText = (text) => replaceString(text, searchString, 'bold-highlight');

    const toggleRecipient = ({ value }) => {
        if (value.uei && searchString.length > 2 && value.uei?.includes(searchString.toUpperCase())) {
            updateSelectedRecipients(value.uei);
        }
        else {
            updateSelectedRecipients(value.name);
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

        const paramObj = {
            search_text: term,
            limit: maxRecipientsAllowed
        };

        recipientRequest.current = SearchHelper.fetchRecipientsAutocomplete(paramObj);

        setIsLoading(true);

        recipientRequest.current.promise
            .then((res) => {
                sortResults(res.data.results);
                setRecipients(res.data.results);
                setIsLoading(false);
                setMaxRecipients(res.data.count === maxRecipientsAllowed);
                setNoResults(!res.data.count);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(`Recipient Request Error: ${err}`);
                }
            });
    };

    const handleTextInputChange = (e) => {
        setSearchString(e.target.value);
    };

    const handleClearRecipients = () => {
        const currentRecipients = selectedRecipients;

        currentRecipients.forEach((recipient) => {
            updateSelectedRecipients(recipient);
        });

        setSearchString('');
        setMaxRecipients(false); // clean up if previously set
        setRecipients([]);
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
        if (recipient.uei) {
            return ({
                name: <div className="recipient-checkbox__uei">
                    <span>UEI: </span>{highlightText(recipient.uei)}
                    <div className="secondary-label__name-container">
                        <span>{recipient.name ? recipient.name : recipient.recipient_name}</span>
                    </div>
                </div>,
                value: {
                    name: recipient.name ? recipient.name : recipient.recipient_name,
                    uei: recipient.uei
                },
                key: recipient.uei,
                secondaryLabel: recipient.name ? recipient.name : recipient.recipient_name
            });
        }

        return ({
            name: highlightText(recipient.name ? recipient.name : recipient.recipient_name),
            value: {
                name: recipient.name ? recipient.name : recipient.recipient_name,
                uei: recipient.uei
            },
            key: recipient.id
        });
    };

    const formatedRecipientFilters = () => {
        let formatedRecipients = [];
        if (recipients) {
            formatedRecipients = recipients.toSorted((a, b) => (
                a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1))
                .map((recipient) => (getFormatedName(recipient)));
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
                    updateSelectedRecipients(rep.recipient_name);
                    currentlyChecked.push(rep.recipient_name);
                }
            });
        }
        else {
            selectedRecipients.forEach((rep) => {
                updateSelectedRecipients(rep);
            });
        }
    };

    useEffect(() => {
        if (searchString?.length >= 3) {
            getRecipientsFromSearchString(searchString);
        }

        if (searchString === '') {
            handleClearRecipients();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);

    return (
        <div className="recipient-filter">
            <AutocompleteWithCheckboxList
                limit={maxRecipientsAllowed}
                filterType="Recipient"
                handleTextInputChange={handleTextInputChange}
                onSearchClear={handleClearRecipients}
                searchString={searchString}
                filters={formatedRecipientFilters()}
                selectedFilters={selectedRecipients}
                toggleSingleFilter={toggleRecipient}
                toggleAll={toggleAll}
                noResults={noResults}
                additionalText={getMaxRecipientsText()}
                isLoading={isLoading} />
        </div>
    );
};

RecipientSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedRecipients: state.filters.selectedRecipients
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RecipientSearchContainer);
