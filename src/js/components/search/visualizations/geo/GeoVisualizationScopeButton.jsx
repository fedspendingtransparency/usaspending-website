/**
 * GeoVisualizationScopeButton.jsx
 * Created by Kevin Li 2/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    active: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    changeScope: PropTypes.func
};

export default class GeoVisualizationScopeButton extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.changeScope(this.props.value);
    }

    render() {
        let activeClass = '';
        if (this.props.active) {
            activeClass = ' active';
        }

        let description = `Show spending by ${this.props.label.toLowerCase()}`;
        if (this.props.active) {
            description += ' (currently selected)';
        }

        return (
            <button
                className={`scope-button${activeClass}`}
                value={this.props.value}
                title={description}
                aria-label={description}
                onClick={this.clickedButton}>
                {this.props.label}
            </button>
        );
    }
}

GeoVisualizationScopeButton.propTypes = propTypes;
