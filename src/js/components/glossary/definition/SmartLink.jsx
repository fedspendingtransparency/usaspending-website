/**
 * SmartLink.jsx
 * Created by Kevin Li 5/17/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router';

const propTypes = {
    href: PropTypes.string,
    children: PropTypes.node
};

const SmartLink = ({ href, children }) => {
    const [localHref, setLocalHref] = useState('');
    const [isLocal, setIsLocal] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const transformLink = (url) => {
            let tempHref = url;
            let tempIsLocal = false;

            // check if the link is a local glossary reference
            if (url.indexOf('?glossary=') > -1) {
            // it is a local glossary reference, get the current URL
                const currentPath = location.pathname;
                tempHref = `${currentPath}${url}`;
                tempIsLocal = true;
            }
            else if (url.indexOf('/') === 0) {
            // link internal to the web site but not a glossary reference
            // don't open these in a new window, but keep the URL as provided
                tempIsLocal = true;
            }

            setLocalHref(tempHref);
            setIsLocal(tempIsLocal);
        };
        transformLink(href);
    }, [href, location.pathname]);

    if (isLocal) {
        return (
            <Link
                to={localHref}>
                {children}
            </Link>
        );
    }

    // external links should open in a new window
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer">
            {children}
        </a>
    );
};

SmartLink.propTypes = propTypes;
export default SmartLink;
