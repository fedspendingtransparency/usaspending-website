/**
 * DownloadDetail.jsx
 * Created by Kevin Li 1/25/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as redirectHelper from 'helpers/redirectHelper';

const propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    callToAction: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    newTab: PropTypes.bool,
    enabled: PropTypes.bool,
    externalLink: PropTypes.bool
};

export default class DownloadDetail extends React.Component {
    constructor(props) {
        super(props);

        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        redirectHelper.showRedirectModal(this.props.url);
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
                {...linkProps}>
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
        else if (!this.props.enabled) {
            link = (
                <button
                    className="download-detail__link download-detail__link_disabled">
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
