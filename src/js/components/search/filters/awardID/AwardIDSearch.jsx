/**
 * AwardIDSearch.jsx
 * Created by michaelbray on 3/2/17.
 */

import React, { useEffect, useState } from 'react';
import IndividualSubmit from 'components/search/filters/IndividualSubmit';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import PropTypes from 'prop-types';
import { usePrevious } from '../../../../helpers';
import SelectedAwardIDs from './SelectedAwardIDs';

const propTypes = {
    toggleAwardID: PropTypes.func,
    selectedAwardIDs: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

const AwardIDSearch = (props) => {
    const { toggleAwardID, selectedAwardIDs, dirtyFilters } = props;

    const [awardID, setAwardID] = useState('');
    const [hint, setHint] = useState(null);
    const prevDirtyFilters = usePrevious(dirtyFilters);

    useEffect(() => {
        if (dirtyFilters && prevDirtyFilters !== dirtyFilters) {
            if (hint) {
                hint.showHint();
            }
        }
    }, [dirtyFilters, prevDirtyFilters, hint]);

    const inputChangeHandler = (e) => {
        setAwardID(e.target.value);
    };

    const applyAwardID = (e) => {
        e.preventDefault();
        toggleAwardID(awardID.toUpperCase());
        setAwardID('');
    };

    const renderSelectedAwardIDs = () => {
        if (selectedAwardIDs.size > 0) {
            return (
                <SelectedAwardIDs
                    selectedAwardIDs={selectedAwardIDs}
                    toggleAwardID={toggleAwardID} />);
        }
        return null;
    };

    return (
        <div className="award-id-filter">
            <div className="filter-item-wrap">
                <form
                    className="award-id-filter-item-wrap"
                    onSubmit={applyAwardID}>
                    <input
                        id="search"
                        type="text"
                        className="award-id-input"
                        placeholder="PIID, FAIN, or URI"
                        value={awardID}
                        onChange={inputChangeHandler} />
                    <IndividualSubmit
                        className="award-id-submit"
                        onClick={applyAwardID}
                        label="Filter by award ID" />
                </form>

                {renderSelectedAwardIDs()}

                <SubmitHint
                    ref={(component) => {
                        setHint(component);
                    }} />
            </div>
        </div>
    );
};

AwardIDSearch.propTypes = propTypes;
export default AwardIDSearch;
