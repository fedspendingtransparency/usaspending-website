/**
 * FooterExternalLink.jsx
 * Created by Kevin Li 7/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    link: PropTypes.string,
    title: PropTypes.string
};

const clickedFooterLink = (route) => {
    Analytics.event({
        event: 'footer-external-links',
        category: 'Footer - Link',
        action: route
    });
};

const FooterExternalLink = (props) => (
    <a
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        title={props.title}
        aria-label={props.title}
        onClick={clickedFooterLink.bind(null, props.link)}>
        {props.title}
    </a>
);

FooterExternalLink.propTypes = propTypes;

export default FooterExternalLink;
