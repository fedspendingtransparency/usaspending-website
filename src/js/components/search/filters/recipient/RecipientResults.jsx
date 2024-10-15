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

const RecipientResults = (selectedRecipients, toggleRecipient) => {
    const [recipients, setRecipients] = useState([]);

    const levelMapping = {
        P: 'Parent',
        R: 'Recipient',
        C: 'Child'
    };

    useEffect(() => {
        if (recipients.length === 0) {
            const request = SearchHelper.fetchRecipients();

            request.promise
                .then((res) => {
                    setRecipients(res.data.results);
                });
        }
    }, [recipients.length]);

    return (
        <div className="filter-item-wrap recipient-container">
            <div className="checkbox-type-filter">
                { recipients.toSorted((a, b) => (a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1)).map((recipient, index) => (
                    <div className="recipient-label__container">
                        <PrimaryCheckboxType
                            name={(<div className="recipient-checkbox__uei"> <span>UEI:</span> {recipient.uei}</div>)}
                            value={`primary-checkbox-${index}`}
                            key={recipient.uei}
                            toggleCheckboxType={() => toggleRecipient(recipient.name)} />
                        <div className="recipient-label__bottom-section">
                            <div className="recipient-label__legacy-duns">Legacy DUNS: {recipient.duns}</div>
                            <div>
                                <span className="recipient-label__recipient-name">{recipient.name}</span>
                                <span className="recipient-label__legacy-duns">{levelMapping[recipient.recipient_level]}</span>
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
