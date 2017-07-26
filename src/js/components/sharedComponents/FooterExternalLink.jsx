/**
 * FooterExternalLink.jsx
 * Created by Kevin Li 7/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    link: PropTypes.string,
    title: PropTypes.string
};

const FooterExternalLink = (props) => (
    <a
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        title={props.title}
        aria-label={props.title}>
        {props.title}
    </a>
);

FooterExternalLink.propTypes = propTypes;

export default FooterExternalLink;
