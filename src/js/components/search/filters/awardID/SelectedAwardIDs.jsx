/**
 * SelectedAwardIDs.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ShownValue from "../otherFilters/ShownValue";

const propTypes = {
    toggleAwardID: PropTypes.func,
    selectedAwardIDs: PropTypes.object
};

const SelectedAwardIDs = (props) => {
    const { selectedAwardIDs, toggleAwardID } = props;

    const shownAwardIDs = [];
    selectedAwardIDs.entrySeq().forEach((entry) => {
        const key = entry[0];
        const awardID = entry[1];
        const removeValue = () => toggleAwardID(awardID);

        const value = (<ShownValue label={awardID} removeValue={removeValue} key={key} />);

        shownAwardIDs.push(value);
    });

    return (
        <div
            className="selected-filters"
            role="status">
            {shownAwardIDs}
        </div>
    );
};

SelectedAwardIDs.propTypes = propTypes;
export default SelectedAwardIDs;
