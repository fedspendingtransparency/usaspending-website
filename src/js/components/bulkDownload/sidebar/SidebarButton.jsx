/**
 * SidebarButton.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Analytics from 'helpers/analytics/Analytics';
import * as redirectHelper from 'helpers/redirectHelper';

import { ExclamationCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.string,
    url: PropTypes.string,
    shouldOpenNewTab: PropTypes.bool,
    disabled: PropTypes.bool,
    externalLink: PropTypes.bool,
    internalDomain: PropTypes.bool
};

export default class SidebarButton extends React.Component {
    constructor(props) {
        super(props);

        this.logExternalLink = this.logExternalLink.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    logExternalLink() {
        Analytics.event({
            category: 'Download Center - Link',
            action: this.props.url
        });
    }

    redirect() {
        this.logExternalLink();
        redirectHelper.showRedirectModal(this.props.url);
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
            <Link
                to={this.props.url}>
                {this.props.label}
            </Link>
        );
        if (this.props.disabled) {
            button = (
                <div>
                    <div className="sidebar-link-disabled">
                        {this.props.label}
                    </div>
                    <div className="coming-soon">
                        <div className="coming-soon__icon">
                            <ExclamationCircle alt="Coming soon" />
                        </div>
                        <div className="coming-soon__label">
                            Coming Soon
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.props.url && this.props.shouldOpenNewTab && (!this.props.externalLink || this.props.internalDomain)) {
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
        else if (this.props.url && this.props.externalLink) {
            button = (
                <button
                    onClick={this.redirect}>
                    {this.props.label}
                </button>
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
