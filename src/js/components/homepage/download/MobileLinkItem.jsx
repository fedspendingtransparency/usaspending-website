/**
 * MobileLinkItem.jsx
 * Created by Kevin Li 1/25/18
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as redirectHelper from 'helpers/redirectHelper';
import Analytics from 'helpers/analytics/Analytics';

const clickedHomepageLink = (route) => {
    Analytics.event({
        category: 'Homepage - Link',
        action: route
    });
};

const propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    newTab: PropTypes.bool,
    enabled: PropTypes.bool,
    externalLink: PropTypes.bool
};

export default class MobileLinkItem extends React.Component {
    constructor(props) {
        super(props);

        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        redirectHelper.showRedirectModal(this.props.url);
        clickedHomepageLink(this.props.url);
    }

    render() {
        const linkParams = {};
        if (this.props.newTab) {
            linkParams.target = '_blank';
            linkParams.rel = 'noopener noreferrer';
        }

        let disabledLink = '';
        if (!this.props.enabled) {
            disabledLink = 'mobile-download__link_disabled';
        }

        let link = (
            <Link
                className={`mobile-download__link ${disabledLink}`}
                to={this.props.url}
                {...linkParams}
                onClick={clickedHomepageLink.bind(null, this.props.url.replace('#', ''))}>
                <div className="mobile-download__link-icon">
                    <div className={`homepage-download__icon homepage-download__icon_type_${this.props.code}`} />
                </div>
                <div className="mobile-download__link-label">
                    {this.props.label}
                </div>
            </Link>
        );

        if (this.props.externalLink) {
            link = (
                <button
                    className={`mobile-download__link ${disabledLink}`}
                    onClick={this.redirect}>
                    <div className="mobile-download__link-icon">
                        <div className={`homepage-download__icon homepage-download__icon_type_${this.props.code}`} />
                    </div>
                    <div className="mobile-download__link-label">
                        {this.props.label}
                    </div>
                </button>
            );
        }

        return (
            <li
                className="mobile-download__list-item">
                {link}
            </li>
        );
    }
}

MobileLinkItem.propTypes = propTypes;
