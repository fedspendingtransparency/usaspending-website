/**
 * SelectedRecipientLocations.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';

import * as LocationFormatter from 'helpers/locationFormatter';
import ShownRecipientLocation from './ShownRecipientLocation';

const propTypes = {
    selectedRecipientLocations: React.PropTypes.object,
    toggleRecipientLocation: React.PropTypes.func
};

export default class SelectedRecipientLocations extends React.Component {
    render() {
        const shownLocations = [];
        this.props.selectedRecipientLocations.entrySeq().forEach((entry) => {
            const key = entry[0];
            const location = entry[1];
            const value = (<ShownRecipientLocation
                location={location}
                label={LocationFormatter.formatLocation(location)}
                key={key}
                toggleLocation={this.props.toggleRecipientLocation.bind(null, location)} />);
            shownLocations.push(value);
        });

        return (
            <div className="selected-recipient-locations">
                {shownLocations}
            </div>
        );
    }
}

SelectedRecipientLocations.propTypes = propTypes;
