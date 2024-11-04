/**
 * RecipientResults.jsx
 * Created by Brian Petway 10/01/2024
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import * as SearchHelper from 'helpers/searchHelper';
import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

const propTypes = {
    selectedRecipients: PropTypes.object,
    toggleRecipient: PropTypes.func
};

const RecipientResults = ({ toggleRecipient }) => {
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
        <div className="filter-item-wrap recipient-container">
            <div className="checkbox-type-filter">
                { recipients.toSorted((a, b) => (a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1)).map((recipient, index) => (
                    <div className="recipient-label__container">
                        <PrimaryCheckboxType
                            name={(<div className="recipient-checkbox__uei"> <span>UEI:</span> {recipient.uei ? recipient.uei : 'Not provided'}</div>)}
                            value={`primary-checkbox-${index}`}
                            key={recipient.uei}
                            toggleCheckboxType={toggleRecipient} />
                        <div className="recipient-label__lower-container">
                            <div className="recipient-label__legacy-duns">Legacy DUNS: {recipient.duns}</div>
                            <div className="recipient-label__name-container">
                                <span className="recipient-label__recipient-name">{recipient.name}</span>
                                <span className="recipient-label__recipient-level">{levelMapping[recipient.recipient_level]}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

RecipientResults.propTypes = propTypes;
export default RecipientResults;
