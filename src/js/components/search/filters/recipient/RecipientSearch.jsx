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
    toggleRecipient, selectedRecipients, dirtyFilters, updateSelectedRecipients, v2Search
}) => {
    const [hint, setHint] = useState(null);
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
            <div className={`filter-item-wrap ${v2Search ? 'v2Search' : ''}`}>
                {GlobalConstants.QAT ?
                    <RecipientResultsContainer
                        selectedRecipients={selectedRecipients}
                        updateSelectedRecipients={updateSelectedRecipients} />
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
            </div>
        </div>
    );
};

RecipientSearch.propTypes = propTypes;
export default RecipientSearch;
