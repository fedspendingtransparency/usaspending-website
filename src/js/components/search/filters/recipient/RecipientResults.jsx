/**
 * RecipientResults.jsx
 * Created by Brian Petway 10/01/2024
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import * as SearchHelper from 'helpers/searchHelper';


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

                    console.log('fetchRecipients res', res);
                });
        }
    }, [recipients.length]);

    return (
        <div className="filter-item-wrap recipient-container">
            <div className="checkbox-type-filter">
                { recipients.toSorted((a, b) => (a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1)).map((recipient, index) => (
                    <div className="container">
                        <div className="col recipient-checkbox">
                            <input
                                type="checkbox"
                                id={`primary-checkbox-${index}`}
                                className="primary-checkbox-type"
                                onClick={() => toggleRecipient(recipient.name)} />
                        </div>
                        <div className="col">
                            <div className="uei"> <span>UEI:</span> {recipient.uei}</div>
                            <div className="legacy-duns">Legacy DUNS: {recipient.duns}</div>
                            <div><span className="recipient-name">{recipient.name}</span><span className="legacy-duns">{levelMapping[recipient.recipient_level]}</span> </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

RecipientResults.propTypes = propTypes;
export default RecipientResults;
