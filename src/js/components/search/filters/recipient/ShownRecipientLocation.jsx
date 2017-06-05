/**
 * ShownRecipientLocation.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    toggleLocation: React.PropTypes.func,
    label: React.PropTypes.string
};

export default class ShownRecipientLocation extends React.Component {

    render() {
        return (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.toggleLocation}>
                <span className="close">
                    <Icons.Close className="usa-da-icon-close" />
                </span> {this.props.label}
            </button>
        );
    }
}

ShownRecipientLocation.propTypes = propTypes;
