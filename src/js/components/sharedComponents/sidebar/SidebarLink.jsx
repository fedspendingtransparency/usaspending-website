/**
 * SidebarLink.jsx
 * Created by Kevin Li 6/8/17
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const propTypes = {
    section: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.string,
    onClick: PropTypes.func,
    overLine: PropTypes.string
};

const SidebarLink = (props) => {
    const [url, setUrl] = useState('');
    const location = useLocation();
    const prepareLink = () => {
    // the URL base should be the current route
        const currentRoute = location.pathname;
        // append the section as a query param
        const tempUrl = `${currentRoute}?section=${props.section}`;
        setUrl(tempUrl);
    };

    useEffect(() => {
        prepareLink();
    }, [prepareLink]);

    const clickedLink = (e) => {
        e.preventDefault();
        props.onClick(props.section);
    };

    let active = '';
    if (props.active === props.section) {
        active = 'active';
    }

    return (
        <Link
            className={`sidebar-link ${active}`}
            to={url}
            onClick={(e) => clickedLink(e)}>
            {props.overLine ? (
                <div className="sidebar-link__overline">{props.overLine}</div>
            ) : ''}
            {props.label}
        </Link>
    );
};

SidebarLink.propTypes = propTypes;
export default SidebarLink;
