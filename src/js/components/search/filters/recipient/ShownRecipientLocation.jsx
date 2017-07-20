/**
 * ShownRecipientLocation.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    toggleLocation: PropTypes.func,
    label: PropTypes.string
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
