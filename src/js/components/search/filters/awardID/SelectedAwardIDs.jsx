/**
 * SelectedAwardIDs.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as AwardIDFormatter from 'helpers/awardIDFormatter';
import ShownAwardID from './ShownAwardID';

const propTypes = {
    toggleAwardID: PropTypes.func,
    selectedAwardIDs: PropTypes.object
};

export default class SelectedAwardIDs extends React.Component {
    render() {
        const shownAwardIDs = [];
        this.props.selectedAwardIDs.entrySeq().forEach((entry) => {
            const key = entry[0];
            const awardID = entry[1];
            const value = (<ShownAwardID
                awardID={awardID}
                label={`${AwardIDFormatter.formatAwardID(awardID, awardID.awardIDType)}
                    | ${awardID.awardIDType}`}
                key={key}
                toggleAwardID={this.props.toggleAwardID.bind(null, awardID)} />);
            shownAwardIDs.push(value);
        });

        return (
            <div className="selected-filters">
                {shownAwardIDs}
            </div>
        );
    }
}

SelectedAwardIDs.propTypes = propTypes;
