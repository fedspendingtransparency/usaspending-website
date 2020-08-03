/**
 * DropdownItem.jsx
 * Created by Kevin Li 10/18/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';
import * as redirectHelper from 'helpers/redirectHelper';

import DropdownComingSoon from './DropdownComingSoon';

const propTypes = {
    url: PropTypes.string,
    label: PropTypes.node,
    enabled: PropTypes.bool,
    newTab: PropTypes.bool,
    isFirst: PropTypes.bool,
    externalLink: PropTypes.bool
};

const clickedHeaderLink = (route) => {
    Analytics.event({
        category: 'Header - Link',
        action: route
    });
};

export default class DropdownItem extends React.Component {
    constructor(props) {
        super(props);

        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        redirectHelper.showRedirectModal(this.props.url);
        clickedHeaderLink(`${this.props.url.replace('#', '')}`);
    }

    render() {
        let className = 'nav-children__link_disabled';
        let comingSoon = (
            <div className="nav-children__coming-soon">
                <DropdownComingSoon />
            </div>
        );

        if (this.props.enabled) {
            className = '';
            comingSoon = null;
        }

        const newTabProps = {};
        if (this.props.newTab) {
            newTabProps.target = '_blank';
            newTabProps.rel = 'noopener noreferrer';
        }

        let link = (
            <a
                className={`nav-children__link ${className}`}
                href={this.props.url}
                onClick={clickedHeaderLink.bind(null, `${this.props.url.replace('#', '')}`)}
                {...newTabProps}>
                {this.props.label}
                {comingSoon}
            </a>
        );

        if (this.props.enabled && this.props.externalLink) {
            // Trigger the redirect modal
            link = (
                <button
                    onClick={this.redirect}
                    className="nav-children__link">
                    {this.props.label}
                </button>
            );
        }

        let firstClass = '';
        if (this.props.isFirst) {
            firstClass = 'nav-children__list-separator_hidden';
        }

        return (
            <li className="nav-children__list-item">
                <hr className={`nav-children__list-separator ${firstClass}`} />
                {link}
            </li>
        );
    }
}

DropdownItem.propTypes = propTypes;
