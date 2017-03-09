/**
 * ShownAwardID.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';

const propTypes = {
    toggleAwardID: React.PropTypes.func,
    label: React.PropTypes.string
};

export default class ShownAwardID extends React.Component {

    render() {
        return (
            <button
                className="shown-award-id-button"
                value={this.props.label}
                onClick={this.props.toggleAwardID}>
                <span className="close">x</span> {this.props.label}
            </button>
        );
    }
}

ShownAwardID.propTypes = propTypes;
