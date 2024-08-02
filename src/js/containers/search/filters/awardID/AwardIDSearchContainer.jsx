/**
 * AwardIDSearchContainer.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { is } from 'immutable';
import { updateGenericFilter } from 'redux/actions/search/searchFilterActions';
import AwardIDSearch from 'components/search/filters/awardID/AwardIDSearch';


const AwardIDSearchContainer = () => {
    const dispatch = useDispatch();
    const { selectedAwardIDs } = useSelector((state) => state.filters);
    const { appliedAwardIDs } = useSelector((state) => state.appliedFilters.filters);

    const addAwardID = (id) => {
        const awardId = selectedAwardIDs.set(id, id);

        dispatch(updateGenericFilter({
            type: 'selectedAwardIDs',
            value: awardId
        }));
    };

    const removeAwardID = (id) => {
        const awardId = selectedAwardIDs.delete(id);
        dispatch(updateGenericFilter({
            type: 'selectedAwardIDs',
            value: awardId
        }));
    };

    const toggleAwardID = (awardID) => {
        if (selectedAwardIDs.has(awardID)) {
            removeAwardID(awardID);
        }
        else {
            addAwardID(awardID);
        }
    };

    const dirtyFilters = () => {
        if (is(selectedAwardIDs, appliedAwardIDs)) {
            return null;
        }
        return Symbol('dirty award ID');
    };


    return (
        <AwardIDSearch
            dirtyFilters={dirtyFilters()}
            selectedAwardIDs={selectedAwardIDs}
            toggleAwardID={toggleAwardID} />
    );
};

export default AwardIDSearchContainer;
