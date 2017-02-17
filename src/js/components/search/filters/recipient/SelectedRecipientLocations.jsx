/**
 * SelectedRecipientLocations.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import _ from 'lodash';
import ShownRecipientLocation from './ShownRecipientLocation';

const propTypes = {
    selectedRecipientLocations: React.PropTypes.object,
    toggleRecipientLocation: React.PropTypes.func
};

export default class SelectedRecipientLocations extends React.Component {
    constructor(props) {
        super(props);

        this.formatLocation = this.formatLocation.bind(this);
    }

    formatLocation(loc) {
        const location = loc;
        let displayValue = '';

        if (location.place_type !== null) {
            displayValue = `${_.startCase(_.toLower(location.place_type))} | `;
        }

        displayValue += `${location.place}`;

        if (location.parent !== null) {
            displayValue += `, ${location.parent}`;
        }

        return displayValue;
    }

    render() {
        const shownLocations = [];
        this.props.selectedRecipientLocations.entrySeq().forEach((entry) => {
            const key = entry[0];
            const location = entry[1];
            const value = (<ShownRecipientLocation
                location={location}
                label={this.formatLocation(location)}
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
