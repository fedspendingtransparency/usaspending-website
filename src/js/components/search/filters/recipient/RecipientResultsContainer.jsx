/**
 * RecipientResultsContainer.jsx
 * Created by Brian Petway 10/01/2024
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import * as SearchHelper from 'helpers/searchHelper';
import { EntityDropdownAutocomplete } from "../location/EntityDropdownAutocomplete";
import PrimaryCheckboxType from "../../../sharedComponents/checkbox/PrimaryCheckboxType";

const propTypes = {
    selectedRecipients: PropTypes.object,
    toggleRecipient: PropTypes.func
};

const RecipientResultsContainer = ({ selectedRecipients, toggleRecipient }) => {
    const [recipients, setRecipients] = useState([]);
    const [searchString, setSearchString] = useState('');

    let recipientRequest;

    const levelMapping = {
        P: 'Parent',
        R: 'Recipient',
        C: 'Child'
    };

    const getAllRecipients = () => {
        if (recipientRequest) {
            recipientRequest.cancel();
        }

        recipientRequest = SearchHelper.fetchRecipients();

        recipientRequest.promise
            .then((res) => {
                setRecipients(res.data.results);
            });
    };

    const getRecipientsFromSearchString = (term) => {
        if (recipientRequest) {
            recipientRequest.cancel();
        }

        const paramObj = {
            search_text: term,
            limit: 50
        };

        recipientRequest = SearchHelper.fetchRecipientsAutocomplete(paramObj);

        recipientRequest.promise
            .then((res) => {
                console.log('res', res);
                setRecipients(res.data.results);
            });
    };

    const handleTextInputChange = (e) => {
        if (e.target.value.length >= 3) {
            setSearchString(e.target.value);
        }
    };

    useEffect(() => {
        if (searchString) {
            getRecipientsFromSearchString(searchString);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);

    useEffect(() => {
        getAllRecipients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <EntityDropdownAutocomplete
                placeholder="Search filters..."
                enabled
                handleTextInputChange={handleTextInputChange}
                context={{}}
                loading={false}
                searchIcon />
            <div className="recipient-results__container">
                <div className="checkbox-type-filter">
                    { recipients.toSorted((a, b) => (a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1)).map((recipient) => (
                        <div className="recipient-label__container">
                            <PrimaryCheckboxType
                                name={(<div className="recipient-checkbox__uei"> <span>UEI:</span> {recipient.uei ? recipient.uei : 'Not provided'}</div>)}
                                value={recipient.name}
                                key={recipient.uei}
                                toggleCheckboxType={toggleRecipient}
                                selectedCheckboxes={selectedRecipients} />
                            <div className="recipient-label__lower-container">
                                <div className="recipient-label__legacy-duns">Legacy DUNS: {recipient.duns ? recipient.duns : 'Not provided'}</div>
                                <div className="recipient-label__name-container">
                                    <span className="recipient-label__recipient-name">{recipient.name || recipient.recipient_name}</span>
                                    <span className="recipient-label__recipient-level">{levelMapping[recipient.recipient_level]}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

RecipientResultsContainer.propTypes = propTypes;
export default RecipientResultsContainer;
