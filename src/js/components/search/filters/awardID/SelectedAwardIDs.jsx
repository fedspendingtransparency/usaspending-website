/**
 * SelectedAwardIDs.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import ShownAwardID from './ShownAwardID';

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
        const value = (
            <ShownAwardID
                awardID={awardID}
                label={`${awardID} | Award ID `}
                key={key}
                toggleAwardID={() => toggleAwardID(awardID)} />);
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
