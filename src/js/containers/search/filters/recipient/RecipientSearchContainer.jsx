/**
 * RecipientSearchContainer.jsx
 * Created by michaelbray on 2/16/17.
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import * as SearchHelper from 'helpers/searchHelper';
import SubmitHint from "../../../../components/sharedComponents/filterSidebar/SubmitHint";
import { EntityDropdownAutocomplete } from "../../../../components/search/filters/location/EntityDropdownAutocomplete";
import PrimaryCheckboxType from "../../../../components/sharedComponents/checkbox/PrimaryCheckboxType";

const propTypes = {
    updateSelectedRecipients: PropTypes.func,
    selectedRecipients: PropTypes.object
};

const RecipientSearchContainer = ({ updateSelectedRecipients, selectedRecipients }) => {
    const [recipients, setRecipients] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [newSearch, setNewSearch] = useState(true);

    const recipientRequest = useRef();

    const toggleRecipient = ({ value }) => {
        if (value.name.includes(searchString.toUpperCase()) || searchString === '') {
            updateSelectedRecipients(value.name);
        }
        else if (value.uei.includes(searchString.toUpperCase())) {
            updateSelectedRecipients(value.uei);
        }
        else if (value.duns.includes(searchString)) {
            updateSelectedRecipients(value.duns);
        }
    };

    const levelMapping = {
        P: 'Parent',
        R: 'Recipient',
        C: 'Child'
    };

    const getAllRecipients = () => {
        if (recipientRequest.current) {
            recipientRequest.current.cancel();
        }

        recipientRequest.current = SearchHelper.fetchRecipients();

        recipientRequest.current.promise
            .then((res) => {
                setRecipients(res.data.results);
            });
    };

    const getRecipientsFromSearchString = (term) => {
        if (recipientRequest.current) {
            recipientRequest.current.cancel();
        }

        const paramObj = {
            search_text: term,
            limit: 50
        };

        recipientRequest.current = SearchHelper.fetchRecipientsAutocomplete(paramObj);

        recipientRequest.current.promise
            .then((res) => {
                setRecipients(res.data.results);
            });
    };

    const handleTextInputChange = (e) => {
        setSearchString(e.target.value);
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
                <div className="recipient-results__container">
                    <div className={`checkbox-type-filter ${newSearch ? 'bottom-fade' : ''}`}>
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
                    {newSearch &&
                        <>
                            <div className="find-recipients-text label">
                                Use the search bar to find recipients
                            </div>
                            <div className="find-recipients-text content">
                                The first 100 recipients are displayed by default.
                                Please use the search bar to find additional recipients.
                            </div>
                        </>
                    }
                </div>
                <SubmitHint selectedFilters={selectedRecipients} />
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
