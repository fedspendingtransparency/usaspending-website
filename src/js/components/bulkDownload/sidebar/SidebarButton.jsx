/**
 * SidebarButton.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.string,
    url: PropTypes.string,
    changeDataType: PropTypes.func,
    disabled: PropTypes.bool
};

export default class SidebarButton extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.changeDataType(this.props.type);
    }

    render() {
        let active = '';
        if (this.props.active === this.props.type) {
            active = 'active';
        }

        let disabled = '';
        if (this.props.disabled) {
            disabled = 'disabled';
        }

        let button = (
            <button
                onClick={this.clickedButton}>
                {this.props.label}
            </button>
        );
        if (this.props.disabled) {
            button = (
                <div>
                    {this.props.label}
                </div>
            );
        }
        else if (this.props.url !== '') {
            button = (
                <a
                    href={this.props.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    {this.props.label}
                </a>
            );
        }

        return (
            <div
                className={`sidebar-link ${active} ${disabled}`}>
                {button}
            </div>
        );
    }
}

SidebarButton.propTypes = propTypes;
