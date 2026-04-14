/**
 * BreadcrumbNav.jsx
 * Created by JD House 04/13/2026
 **/

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router';

const propTypes = {
};

const BreadcrumbNav = ({ title, type }) => {
    const { pathname } = useLocation();
    const [crumbs, setCrumbs] = useState([]);


    useEffect(() => {
        if (pathname) {
            const splitCrumbs = pathname.split('/');
            const formattedCrumbs = splitCrumbs
                .filter((crumb) => crumb !== "")
                .map((fc) => {
                    // format pathname crumb label
                    const modfc = fc.replaceAll("-", " ");
                    let label = modfc.toLowerCase().replace(/\b[a-z]/g, (letter) => (
                        letter.toUpperCase()
                    ));

                    if (label === type) {
                        label = `${label} Profile`;
                    }
                    // split pathname up to specific crumb
                    const url = `${pathname.split(fc)[0]}${fc}`;
                    return ({
                        label,
                        url
                    });
                });
            setCrumbs(formattedCrumbs);
        }
    }, [pathname]);

    return (
        <div className="usa-breadcrumb-nav__container">
            <ul className="usa-breadcrumb-nav__list">
                <li className="usa-breadcrumb-nav-home">
                    <Link
                        className="usa-breadcrumb__item"
                        to="/"
                        title="USAspending.gov Home"
                        aria-label="USAspending.gov Home" >
                        Home
                        <FontAwesomeIcon icon="chevron-right" alt="Forward" />
                    </Link>
                </li>
                {crumbs.length && crumbs.map((crumb, i) => {
                    if (i === crumbs.length - 1) {
                        return (
                            <li className="usa-breadcrumb__item main">
                                {title}
                            </li>
                        );
                    }
                    return (
                        <li>
                            <Link
                                to={crumb.url}
                                className="usa-breadcrumb__item" >
                                {crumb.label}
                                <FontAwesomeIcon icon="chevron-right" alt="Forward" />
                            </Link>

                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

BreadcrumbNav.propTypes = propTypes;
export default BreadcrumbNav;
