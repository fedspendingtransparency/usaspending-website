/**
 * DownloadDetail.jsx
 * Created by Kevin Li 1/25/18
 */

import React from 'react';
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
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    callToAction: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    newTab: PropTypes.bool,
    externalLink: PropTypes.bool
};

export default class DownloadDetail extends React.Component {
    constructor(props) {
        super(props);

        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        redirectHelper.showRedirectModal(this.props.url);
        clickedHomepageLink(this.props.url);
    }

    render() {
        const linkProps = {};
        if (this.props.newTab) {
            linkProps.target = '_blank';
            linkProps.rel = 'noopener noreferrer';
        }
        let link = (
            <a
                className="download-detail__link"
                href={this.props.url}
                {...linkProps}
                onClick={clickedHomepageLink.bind(null, this.props.url.replace('#', ''))}>
                {this.props.callToAction}
            </a>
        );
        if (this.props.externalLink) {
            link = (
                <button
                    className="download-detail__link"
                    onClick={this.redirect}>
                    {this.props.callToAction}
                </button>
            );
        }

        return (
            <div className="download-detail">
                <div className="download-detail__wrapper">
                    <h2
                        className="download-detail__title"
                        tabIndex={-1}>
                        {this.props.label}
                    </h2>
                    <p className="download-detail__description">
                        {this.props.description}
                    </p>
                    {link}
                </div>
            </div>
        );
    }
};

DownloadDetail.propTypes = propTypes;
