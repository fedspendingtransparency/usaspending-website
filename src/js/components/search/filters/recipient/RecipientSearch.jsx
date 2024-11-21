/**
 * Created by michaelbray on 2/16/17.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipientNameDUNSContainer from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import GlobalConstants from 'GlobalConstants';
import SelectedRecipients from './SelectedRecipients';
import { usePrevious } from '../../../../helpers';

import RecipientResultsContainer from "./RecipientResultsContainer";

const propTypes = {
    toggleRecipient: PropTypes.func,
    selectedRecipients: PropTypes.object,
    dirtyFilters: PropTypes.symbol,
    updateSelectedRecipients: PropTypes.func
};

const RecipientSearch = ({
    toggleRecipient, selectedRecipients, dirtyFilters, updateSelectedRecipients
}) => {
    const [hint, setHint] = useState(null);
    const [newSearch, setNewSearch] = useState(true);
    const prevDirtyFilters = usePrevious(dirtyFilters);

    let localSelectedRecipients = null;

    if (selectedRecipients.size > 0) {
        localSelectedRecipients = (<SelectedRecipients
            selectedRecipients={selectedRecipients}
            toggleRecipient={toggleRecipient} />);
    }

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
                {GlobalConstants.QAT ?
                    <RecipientResultsContainer
                        selectedRecipients={selectedRecipients}
                        updateSelectedRecipients={updateSelectedRecipients}
                        newSearch={newSearch}
                        setNewSearch={setNewSearch} />
                    :
                    <>
                        <RecipientNameDUNSContainer
                            selectedRecipients={selectedRecipients}
                            toggleRecipient={toggleRecipient} />
                        {localSelectedRecipients}
                        <SubmitHint
                            ref={(component) => {
                                setHint(component);
                            }} />
                    </>
                }
                {newSearch &&
                    <>
                        <div className="find-recipients-text label">
                            Use the search bar to find recipients
                        </div>
                        <div className="find-recipients-text content">
                            The first 100 recipients are displayed by default. Please use the search bar to find
                            additional recipients.
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

RecipientSearch.propTypes = propTypes;
export default RecipientSearch;
