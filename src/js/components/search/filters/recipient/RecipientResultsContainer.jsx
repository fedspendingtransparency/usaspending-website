/**
 * RecipientResultsContainer.jsx
 * Created by Brian Petway 10/01/2024
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import * as SearchHelper from 'helpers/searchHelper';
import StackedCheckboxList from "../../../sharedComponents/checkbox/StackedCheckboxList";

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

    const getRecipients = () => {
        if (recipientRequest) {
            recipientRequest.cancel();
        }

        recipientRequest = SearchHelper.fetchRecipients();

        recipientRequest.promise
            .then((res) => {
                setRecipients(res.data.results);
            });
    };

    useEffect(() => {
        getRecipients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="recipient-results__container">
            <div className="checkbox-type-filter">
                { recipients.toSorted((a, b) => (a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1)).map((recipient, index) => (
                    <StackedCheckboxList
                        index={index}
                        checkboxLabel="UEI: "
                        checkboxLabelContent={recipient.uei ? recipient.uei : 'Not provided'}
                        subheadingLabel="Legacy DUNS: "
                        subheadingLabelContent={recipient.duns ? recipient.duns : 'Not provided'}
                        itemName={recipient.name}
                        itemLabelAfterName={levelMapping[recipient.recipient_level]}
                        toggleRecipient={toggleRecipient} />
                ))}
            </div>
        </div>
    );
};

RecipientResultsContainer.propTypes = propTypes;
export default RecipientResultsContainer;
