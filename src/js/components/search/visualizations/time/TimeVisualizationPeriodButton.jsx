/**
 * TimeVisualizationPeriodButton.jsx
 * Created by Kevin Li 12/29/16
 */

import React from 'react';

const propTypes = {
    active: React.PropTypes.bool,
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    changePeriod: React.PropTypes.func
};

export default class TimeVisualizationPeriodButton extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.changePeriod(this.props.value);
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

        const disabledStatus = this.props.label === 'Quarters' ||
            this.props.label === 'Months';

        return (
            <button
                className={`period-button${activeClass}`}
                value={this.props.value}
                title={description}
                aria-label={description}
                disabled={disabledStatus}>
                {this.props.label}
            </button>
        );
    }
}

TimeVisualizationPeriodButton.propTypes = propTypes;
