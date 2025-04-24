/**
 * SmartLink.jsx
 * Created by Kevin Li 5/17/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { usePrevious } from "../../../helpers";

const propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.object
};

const SmartLink = (props) => {
    const [href, setHref] = useState('');
    const [isLocal, setIsLocal] = useState(false);
    const location = useLocation();
    const prevProps = usePrevious(props);

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

        setHref(tempHref);
        setIsLocal(tempIsLocal);
    };

    useEffect(() => {
        if (prevProps !== props) {
            transformLink(props.href);
        }
    });

    if (isLocal) {
        return (
            <Link
                to={href}>
                {props.children}
            </Link>
        );
    }

    // external links should open in a new window
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer">
            {props.children}
        </a>
    );
};

SmartLink.propTypes = propTypes;
export default SmartLink;
