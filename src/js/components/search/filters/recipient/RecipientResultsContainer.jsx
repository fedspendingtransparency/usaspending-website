/**
 * RecipientResultsContainer.jsx
 * Created by Brian Petway 10/01/2024
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import * as SearchHelper from 'helpers/searchHelper';
import StackedCheckbox from "../../../sharedComponents/checkbox/StackedCheckbox";
import { fetchRecipientsAutocomplete } from "../../../../helpers/searchHelper";

const propTypes = {
    selectedRecipients: PropTypes.object,
    toggleRecipient: PropTypes.func
};

const RecipientResultsContainer = ({ toggleRecipient }) => {
    const [recipients, setRecipients] = useState([]);
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

    const getRecipientsFromSearchString = (searchString) => {
        if (recipientRequest) {
            recipientRequest.cancel();
        }

        recipientRequest = SearchHelper.fetchRecipientsAutocomplete(searchString);

        recipientRequest.promise
            .then((res) => {
                console.log('res', res);
                setRecipients(res.data.results);
            });
    };

    useEffect(() => {
        getAllRecipients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="recipient-results__container">
            <div className="checkbox-type-filter">
                { recipients.toSorted((a, b) => (a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1)).map((recipient, index) => (
                    <StackedCheckbox
                        index={index}
                        checkboxLabel="UEI: "
                        checkboxLabelContent={recipient.uei ? recipient.uei : 'Not provided'}
                        subheadingLabel="Legacy DUNS: "
                        subheadingLabelContent={recipient.duns ? recipient.duns : 'Not provided'}
                        itemName={recipient.name}
                        itemLabelAfterName={levelMapping[recipient.recipient_level]}
                        toggleRecipient={toggleRecipient}
                        getRecipientsFromSearchString={getRecipientsFromSearchString} />
                ))}
            </div>
        </div>
    );
};

RecipientResultsContainer.propTypes = propTypes;
export default RecipientResultsContainer;
