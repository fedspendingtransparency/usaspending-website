/**
 * SelectedAwardAmountBound.jsx
 * Created by Jonathan Hill on 09/13/19.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const propTypes = {
    label: PropTypes.string,
    removeFilter: PropTypes.func,
    name: PropTypes.string
};

export default class SelectedAwardAmountBound extends React.Component {
    constructor(props) {
        super(props);
        this.removeFilter = this.removeFilter.bind(this);
    }

    removeFilter() {
        const { removeFilter, name } = this.props;
        removeFilter(name);
    }

    render() {
        const { label } = this.props;
        return (
            <button
                className="shown-filter-button"
                value={label}
                onClick={this.removeFilter}
                title="Click to remove."
                aria-label={`Applied filter: ${label}`}>
                {label}
                <span className="close">
                    <FontAwesomeIcon icon="times" />
                </span>
            </button>
        );
    }
}

SelectedAwardAmountBound.propTypes = propTypes;
