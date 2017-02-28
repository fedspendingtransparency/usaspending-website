/**
 * RankVisualizationScopeButton.jsx
 * Created by Kevin Li 12/29/16
 */

import React from 'react';

const propTypes = {
    active: React.PropTypes.bool,
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    changeScope: React.PropTypes.func
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

        let clickEvent = '';
        if (this.props.label === 'Offices') {
            clickEvent = null;
        } else {
            clickEvent = this.clickedButton;
        }

        return (
            <button
                className={`scope-button${activeClass}`}
                value={this.props.value}
                title={description}
                aria-label={description}
                onClick={clickEvent}>
                {this.props.label}
            </button>
        );
    }
}

RankVisualizationScopeButton.propTypes = propTypes;
