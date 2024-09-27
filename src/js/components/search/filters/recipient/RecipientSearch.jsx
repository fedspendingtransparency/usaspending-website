/**
 * Created by michaelbray on 2/16/17.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipientNameDUNSContainer from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SelectedRecipients from './SelectedRecipients';
import { usePrevious } from '../../../../helpers';
import * as RecipientHelper from '../../../../helpers/recipientHelper';

const propTypes = {
    toggleRecipient: PropTypes.func,
    selectedRecipients: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

const RecipientSearch = ({ toggleRecipient, selectedRecipients, dirtyFilters }) => {
    const [hint, setHint] = useState(null);
    const prevDirtyFilters = usePrevious(dirtyFilters);
    const [recipients, setRecipients] = useState([]);

    let localSelectedRecipients = null;
    console.log(selectedRecipients);

    if (selectedRecipients.size > 0) {
        localSelectedRecipients = (<SelectedRecipients
            selectedRecipients={selectedRecipients}
            toggleRecipient={toggleRecipient} />);
    }

    const levelMapping = {
        P: 'Parent',
        R: 'Recipient',
        C: 'Child'
    };

    useEffect(() => {
        if (recipients.length === 0) {
            const request = RecipientHelper.fetchXRecipients();

            request.promise
                .then((res) => {
                    setRecipients(res.data.results);
                    console.log(res.data.results);
                });
        }
    }, [recipients.length]);

    useEffect(() => {
        if (dirtyFilters && prevDirtyFilters !== dirtyFilters) {
            if (hint) {
                hint.showHint();
            }
        }
    }, [dirtyFilters, hint, prevDirtyFilters]);

    return (
        <div className="recipient-filter">
            <div className="filter-item-wrap">
                <RecipientNameDUNSContainer
                    selectedRecipients={selectedRecipients}
                    toggleRecipient={toggleRecipient} />
                {localSelectedRecipients}
                <SubmitHint
                    ref={(component) => {
                        setHint(component);
                    }} />
                <div className="filter-item-wrap" style={{ height: '400px', overflowY: 'scroll' }}>
                    <div className="checkbox-type-filter">
                        { recipients.toSorted((a, b) => (a.name?.toUpperCase() < b.name?.toUpperCase() ? -1 : 1)).map((recipient, index) => (
                            <div style={{ display: 'flex' }}>
                                <div className="col" style={{ marginRight: '4px', marginTop: '2px' }}>
                                    <input
                                        type="checkbox"
                                        id={`primary-checkbox-${index}`}
                                        style={{ height: '16px', width: '16px' }}
                                        onClick={() => toggleRecipient(recipient.name)} />
                                </div>
                                <div className="col">
                                    <div className="uei"> <b>UEI:</b> {recipient.uei}</div>
                                    <div className="legacy-duns">Legacy DUNS: {recipient.duns}</div>
                                    <div><span className="recipient-name"><b>{recipient.name}</b></span> <span className="legacy-duns">{levelMapping[recipient.recipient_level]}</span> </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

RecipientSearch.propTypes = propTypes;
export default RecipientSearch;
