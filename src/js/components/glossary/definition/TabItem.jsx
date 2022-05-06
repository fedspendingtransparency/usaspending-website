/**
 * TabItem.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    active: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
    clickedTab: PropTypes.func
};

export default class TabItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.clickedTab(this.props.type);
    }

    render() {
        let active = '';
        if (this.props.active) {
            active = 'active';
        }

        return (
            <li>
                <button
                    className={`definition-tab ${active}`}
                    aria-label={this.props.label}
                    title={this.props.label}
                    onClick={this.clickedButton}>
                    {this.props.label}
                </button>
            </li>
        );
    }
}

TabItem.propTypes = propTypes;
