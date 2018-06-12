/**
 * ShownKeyword.jsx
 * Created by David Trinh on 5/2/18.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    toggleKeyword: PropTypes.func,
    label: PropTypes.string
};

export default class ShownKeyword extends React.Component {
    render() {
        return (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.toggleKeyword}
                title="Click to remove filter."
                aria-label={`Applied keyword filter: ${this.props.label}`}>
                <span className="close">
                    <Close className="usa-da-icon-close" alt="Close icon" />
                </span>
                {this.props.label}
            </button>
        );
    }
}

ShownKeyword.propTypes = propTypes;
