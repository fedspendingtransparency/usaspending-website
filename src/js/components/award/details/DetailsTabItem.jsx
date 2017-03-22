/**
 * DetailsTabItem.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';

const propTypes = {
    label: React.PropTypes.string,
    code: React.PropTypes.string,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    clickTab: React.PropTypes.func
};

export default class DetailsTabItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.clickTab(this.props.code);
    }

    render() {
        let activeClass = '';
        if (this.props.active) {
            activeClass = 'active';
        }

        return (
            <button
                className={`table-tab-toggle ${activeClass}`}
                title={this.props.label}
                aria-label={this.props.label}
                onClick={this.clickedButton}
                disabled={this.props.disabled}>
                {this.props.label}
            </button>
        );
    }
}

DetailsTabItem.propTypes = propTypes;
