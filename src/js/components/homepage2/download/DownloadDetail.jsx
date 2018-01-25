/**
 * DownloadDetail.jsx
 * Created by Kevin Li 1/25/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    callToAction: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    newTab: PropTypes.bool
};

const DownloadDetail = (props) => {
    const linkProps = {};
    if (props.newTab) {
        linkProps.target = '_blank';
        linkProps.rel = 'noopener noreferrer';
    }
    return (
        <div className="download-detail">
            <div className="download-detail__wrapper">
                <h2
                    className="download-detail__title"
                    tabIndex={-1}>
                    {props.label}
                </h2>
                <p className="download-detail__description">
                    {props.description}
                </p>
                <a
                    className="download-detail__link"
                    href={props.url}
                    {...linkProps}>
                    {props.callToAction}
                </a>
            </div>
        </div>
    );
};

DownloadDetail.propTypes = propTypes;
export default DownloadDetail;
