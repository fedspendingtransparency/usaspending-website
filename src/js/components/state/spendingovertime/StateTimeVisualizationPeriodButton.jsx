import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    active: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    updateVisualizationPeriod: PropTypes.func
};

export default class StateTimeVisualizationPeriodButton extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.updateVisualizationPeriod(this.props.value);
    }

    render() {
        let activeClass = '';
        if (this.props.active) {
            activeClass = ' active';
        }

        let description = `Show results by ${this.props.label.toLowerCase()}`;
        if (this.props.active) {
            description += ' (currently selected)';
        }

        return (
            <button
                className={`period-button${activeClass}`}
                value={this.props.value}
                title={description}
                aria-label={description}
                onClick={this.clickedButton}>
                {this.props.label}
            </button>
        );
    }
}

StateTimeVisualizationPeriodButton.propTypes = propTypes;
