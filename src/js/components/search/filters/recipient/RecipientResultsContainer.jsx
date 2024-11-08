/**
 * RecipientResultsContainer.jsx
 * Created by Brian Petway 10/01/2024
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import * as SearchHelper from 'helpers/searchHelper';
import StackedCheckbox from "../../../sharedComponents/checkbox/StackedCheckbox";
import PrimaryStackedCheckbox from "../../../sharedComponents/checkbox/PrimaryStackedCheckbox";
import { EntityDropdownAutocomplete } from "../location/EntityDropdownAutocomplete";

const propTypes = {
    selectedRecipients: PropTypes.object,
    toggleRecipient: PropTypes.func
};

const RecipientResultsContainer = ({ toggleRecipient }) => {
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

    // if you end up using two common components here
    // you'll need to send the recipients array to the SecondaryCheckbox cmpnt
    // and the toggle fn prop
    // and the labels for the UEi and DUNS fields
    // and the itemLabelAfterName, which will require a loop through the data, ugh
    // or we ask the backend to change the field for us, to the string we'll use

    console.log('recipients', recipients);

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
                    { recipients.toSorted((a, b) => (a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1)).map((recipient, index) => (
                        <PrimaryStackedCheckbox
                            index={index}
                            checkboxLabel="UEI: "
                            checkboxLabelContent={recipient.uei ? recipient.uei : 'Not provided'}
                            subheadingLabel="Legacy DUNS: "
                            subheadingLabelContent={recipient.duns ? recipient.duns : 'Not provided'}
                            itemName={recipient.name || recipient.recipient_name}
                            itemLabelAfterName={levelMapping[recipient.recipient_level]}
                            toggleRecipient={toggleRecipient}
                            getRecipientsFromSearchString={getRecipientsFromSearchString} />
                    ))}
                </div>
            </div>
        </>
    );
};

RecipientResultsContainer.propTypes = propTypes;
export default RecipientResultsContainer;
