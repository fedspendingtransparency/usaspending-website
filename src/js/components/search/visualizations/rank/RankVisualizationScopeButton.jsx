/**
 * RankVisualizationScopeButton.jsx
 * Created by Kevin Li 12/29/16
 */

import React from 'react';

const propTypes = {
    active: React.PropTypes.bool,
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    changeScope: React.PropTypes.func
};

const defaultProps = {
    disabled: false
};

export default class RankVisualizationScopeButton extends React.Component {
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

        let description = `Rank results by ${this.props.label.toLowerCase()}`;
        if (this.props.active) {
            description += ' (currently selected)';
        }

        return (
            <button
                className={`scope-button${activeClass}`}
                value={this.props.value}
                title={description}
                aria-label={description}
                onClick={this.clickedButton}
                disabled={this.props.disabled}>
                {this.props.label}
            </button>
        );
    }
}

RankVisualizationScopeButton.propTypes = propTypes;
RankVisualizationScopeButton.defaultProps = defaultProps;
