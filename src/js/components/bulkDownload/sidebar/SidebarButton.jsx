/**
 * SidebarButton.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.string,
    url: PropTypes.string,
    newTab: PropTypes.bool,
    disabled: PropTypes.bool
};

export default class SidebarButton extends React.Component {
    constructor(props) {
        super(props);

        this.logExternalLink = this.logExternalLink.bind(this);
    }

    logExternalLink() {
        Analytics.event({
            category: 'Download Center - Link',
            action: this.props.url
        });
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
            <a
                href={this.props.url}>
                {this.props.label}
            </a>
        );
        if (this.props.disabled) {
            button = (
                <div>
                    {this.props.label}
                </div>
            );
        }
        else if (this.props.url !== '' && this.props.newTab) {
            button = (
                <a
                    href={this.props.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={this.logExternalLink}>
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
