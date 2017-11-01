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

        let button = (
            <button
                className={`sidebar-link ${active}`}
                onClick={this.clickedButton}>
                {this.props.label}
            </button>
        );
        if (this.props.disabled) {
            button = (
                <div
                    className="sidebar-link disabled">
                    {this.props.label}
                </div>
            );
        }

        return (
            <div>
                {button}
            </div>
        );
    }
}

SidebarButton.propTypes = propTypes;
