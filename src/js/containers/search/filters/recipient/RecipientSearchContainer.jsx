/**
 * RecipientSearchContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import * as SearchHelper from 'helpers/searchHelper';
import SubmitHint from "../../../../components/sharedComponents/filterSidebar/SubmitHint";
import EntityDropdownAutocomplete from "../../../../components/search/filters/location/EntityDropdownAutocomplete";
import PrimaryCheckboxType from "../../../../components/sharedComponents/checkbox/PrimaryCheckboxType";
import SelectedRecipients from "../../../../components/search/filters/recipient/SelectedRecipients";

const propTypes = {
    updateSelectedRecipients: PropTypes.func,
    selectedRecipients: PropTypes.object,
    searchV2: PropTypes.bool
};

const RecipientSearchContainer = ({ updateSelectedRecipients, selectedRecipients, searchV2 }) => {
    const [recipients, setRecipients] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [newSearch, setNewSearch] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [maxRecipients, setMaxRecipients] = useState(true);

    const recipientRequest = useRef();
    const maxRecipientsAllowed = 500;
    let localSelectedRecipients = null;
    let maxRecipientTitle = '';
    let maxRecipientText = '';

    if (newSearch) {
        maxRecipientTitle = 'Use the search bar to find recipients';
        maxRecipientText = `The first ${maxRecipientsAllowed} recipients are displayed by default. Please use the search bar to find additional recipients.`;
    }

    else {
        maxRecipientTitle = `Only ${maxRecipientsAllowed} recipients can be displayed at once`;
        maxRecipientText = 'Please use the search bar to narrow your search and find additional recipients.';
    }

    const toggleRecipient = ({ value }) => {
        if (value.uei && searchString.length > 2 && value.uei?.includes(searchString.toUpperCase())) {
            updateSelectedRecipients(value.uei);
        }
        else if (value.duns && searchString.length > 2 && value?.duns.includes(searchString)) {
            updateSelectedRecipients(value.duns);
        }
        else {
            updateSelectedRecipients(value.name);
        }
    };

    const removeRecipient = (recipient) => {
        updateSelectedRecipients(recipient);
    };

    const levelMapping = {
        P: 'Parent',
        R: 'Recipient',
        C: 'Child'
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

    const getAllRecipients = () => {
        if (recipientRequest.current) {
            recipientRequest.current.cancel();
        }

        const paramObj = {
            limit: maxRecipientsAllowed
        };

        recipientRequest.current = SearchHelper.fetchRecipients(paramObj);

        setIsLoading(true);

        recipientRequest.current.promise
            .then((res) => {
                setRecipients(res.data.results);
                setIsLoading(false);
                sortResults(res.data.results);
                setMaxRecipients(true);
            });
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
            });
    };

    const handleTextInputChange = (e) => {
        setSearchString(e.target.value);
    };

    const loadingIndicator = (
        <div className="recipient-filter-message-container">
            <FontAwesomeIcon icon="spinner" spin />
            <div className="recipient-filter-message-container__text">Loading your data...</div>
        </div>
    );

    if (selectedRecipients.size > 0) {
        localSelectedRecipients = (
            <SelectedRecipients
                selectedRecipients={selectedRecipients}
                toggleRecipient={removeRecipient} />
        );
    }

    const handleClearRecipients = () => {
        const currentRecipients = selectedRecipients;

        currentRecipients.forEach((recipient) => {
            updateSelectedRecipients(recipient);
        });
    };

    useEffect(() => {
        if (searchString.length >= 3) {
            setNewSearch(false);
            getRecipientsFromSearchString(searchString);
        }
        else {
            setNewSearch(true);
            getAllRecipients();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);

    useEffect(() => {
        if (selectedRecipients.size > 0) {
            const first = [...selectedRecipients][0];
            setSearchString(first);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="recipient-filter">
            <div className="filter-item-wrap">
                <EntityDropdownAutocomplete
                    placeholder="Search filters..."
                    enabled
                    handleTextInputChange={handleTextInputChange}
                    context={{}}
                    loading={false}
                    searchIcon />
                <div className="clear-all__container">
                    <button
                        type="button"
                        aria-label="Clear all Recipient filters"
                        className="clear-all__button"
                        tabIndex="0"
                        onClick={handleClearRecipients} >
                        Clear all Recipient filters
                    </button>
                </div>
                {isLoading ? loadingIndicator :
                    <div className="recipient-results__container">
                        <div className={`checkbox-type-filter ${maxRecipients ? 'bottom-fade' : ''}`}>
                            {recipients.toSorted((a, b) => (a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1))
                                .map((recipient) => (
                                    <div className="recipient-label__container">
                                        <PrimaryCheckboxType
                                            name={(
                                                <div className="recipient-checkbox__uei">
                                                    <span>UEI:</span> {recipient.uei ? recipient.uei : 'Not provided'}
                                                </div>
                                            )}
                                            value={{
                                                name: recipient.name ? recipient.name : recipient.recipient_name,
                                                uei: recipient.uei,
                                                duns: recipient.duns ? recipient.duns : null
                                            }}
                                            key={recipient.uei}
                                            toggleCheckboxType={toggleRecipient}
                                            selectedCheckboxes={selectedRecipients} />
                                        <div className="recipient-label__lower-container">
                                            <div className="recipient-label__legacy-duns">Legacy
                                                DUNS: {recipient.duns ? recipient.duns : 'Not provided'}
                                            </div>
                                            <div className="recipient-label__name-container">
                                                <span className="recipient-label__recipient-name">
                                                    {recipient.name || recipient.recipient_name}
                                                </span>
                                                <span className="recipient-label__recipient-level">
                                                    {levelMapping[recipient.recipient_level]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {maxRecipients &&
                            <>
                                <div className="find-recipients-text label">
                                    {maxRecipientTitle}
                                </div>
                                <div className="find-recipients-text content">
                                    {maxRecipientText}
                                </div>
                            </>
                        }
                    </div>
                }
                {localSelectedRecipients}
                { !searchV2 && <SubmitHint selectedFilters={selectedRecipients} /> }
            </div>
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
